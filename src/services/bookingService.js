const pool = require("../db/db");
const { camelCaseKeys } = require("../utils/utils.js");

exports.createBooking = async (user, data) => {
  const {
    dateStart,
    dateEnd,
    startTime,
    endTime,
    people,
    activity,
    bookingNote,
    roomRequirements,
    accessories = [],
  } = data;

  // 1. Check room availability and pick the one with the smallest possible capacity that fits
  const roomResult = await pool.query(
    `
    SELECT * FROM rooms 
    WHERE capacity >= $1
    AND id NOT IN (
      SELECT room_id FROM bookings 
      WHERE booking_status = 'approved'
      AND date_start <= $3 AND date_end >= $2 
      AND start_time::time(0) < $5::time(0) AND end_time::time(0) > $4::time(0)
    )
    ORDER BY capacity ASC
    LIMIT 1;
  `,
    [people, dateStart, dateStart, startTime, endTime]
  );

  if (roomResult.rows.length === 0) {
    throw new Error("No available room matches the requirements");
  }

  const room = roomResult.rows[0];

  // 2. Check accessory availability
  for (const acc of accessories) {
    const result = await pool.query(
      "SELECT remaining_amount FROM accessories WHERE id = $1",
      [acc.id]
    );
    if (!result.rows.length || result.rows[0].remaining_amount < acc.amount) {
      throw new Error(`Accessory ID ${acc.id} not available`);
    }
  }

  // 3. Create booking
  const result = await pool.query(
    `
    INSERT INTO bookings (user_id, room_id, date_start, date_end, start_time, end_time, booking_status, booking_status_name, modified_date, booking_note, people, activity)
    VALUES ($1, $2, $3, $4, $5, $6, 'pending', 'Pending Approval', NOW(), $7, $8, $9)
    RETURNING *
  `,
    [
      user.id,
      room.id,
      dateStart,
      dateStart,
      startTime,
      endTime,
      bookingNote,
      people,
      activity,
    ]
  );

  return camelCaseKeys(result.rows[0]);
};

exports.cancelBooking = async (user, bookingId) => {
  const result = await pool.query(
    "SELECT * FROM bookings WHERE booking_id = $1",
    [bookingId]
  );
  const booking = result.rows[0];

  if (!booking || booking.user_id !== user.id) {
    throw new Error("Unauthorized or booking not found");
  }

  await pool.query(
    "UPDATE bookings SET booking_status = 'rejected', modified_date = NOW() WHERE booking_id = $1",
    [bookingId]
  );
};

exports.viewBooking = async (user, bookingId) => {
  const result = await pool.query(
    "SELECT * FROM bookings WHERE booking_id = $1",
    [bookingId]
  );
  const booking = result.rows[0];

  if (!booking || (booking.user_id !== user.id && user.role_id !== 1)) {
    throw new Error("Unauthorized access");
  }

  return camelCaseKeys(booking);
};

exports.viewAllBookings = async (user) => {
  if (user.role_id === 1) {
    const result = await pool.query(
      "SELECT b.*, u.*, ur.*, r.*, a.rejected_note, a.approval_date FROM bookings b INNER JOIN users u ON u.id = b.user_id INNER JOIN user_roles ur ON u.role_id = ur.id INNER JOIN rooms r ON r.id = b.room_id LEFT JOIN approvals a ON b.booking_id = a.booking_id;"
    );
    return camelCaseKeys(result.rows);
  } else {
    const result = await pool.query(
      "SELECT *, bookings.booking_id, bookings.user_id FROM bookings INNER JOIN users on users.id = bookings.user_id INNER JOIN user_roles on users.role_id = user_roles.id INNER JOIN rooms r on r.id = bookings.room_id LEFT JOIN approvals a on bookings.booking_id = a.booking_id WHERE bookings.user_id = $1",
      [user.id]
    );
    return camelCaseKeys(result.rows);
  }
};

exports.editBooking = async (bookingId, updates) => {
  const fields = [];
  const values = [];
  let i = 1;

  for (const [key, value] of Object.entries(updates)) {
    fields.push(`${key} = $${i++}`);
    values.push(value);
  }

  values.push(bookingId);
  console.log("bookingId", bookingId);

  console.log("fields", fields);
  console.log("values", values);
  const result = await pool.query(
    `UPDATE bookings SET ${fields.join(
      ", "
    )}, modified_date = NOW() WHERE booking_id = $${i}`,
    values
  );
  console.log("Update booking result", result.rows);
};

exports.editBookings = async (updates) => {
  for (const update of updates) {
    const dateStart = update["start"].substring(0, 10);
    const dateEnd = update["end"].substring(0, 10);
    const startTime = update["start"].substring(11, 16);
    const endTime = update["end"].substring(11, 16);
    await pool.query(
      "UPDATE bookings SET date_start=$1, date_end=$2, start_time=$3, end_time=$4 WHERE booking_id=$5",
      [dateStart, dateEnd, startTime, endTime, update["id"]]
    );
  }
};

exports.autoRejectBookings = async () => {
  await pool.query(
    `UPDATE bookings
     SET booking_status = 'rejected',
         modified_date = NOW()
     WHERE date_start < CURRENT_DATE
       AND booking_status != 'rejected'`
  );
};
