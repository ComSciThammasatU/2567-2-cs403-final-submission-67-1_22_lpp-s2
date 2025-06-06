// services/approvalService.js
const pool = require("../db/db");
const { camelCaseKeys } = require("../utils/utils.js");

exports.approveBooking = async (booking_id, user_id) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Set booking status to approved
    await client.query(
      "UPDATE bookings SET booking_status = 'approved' WHERE booking_id = $1",
      [booking_id]
    );

    // Add approval entry
    const approval = await client.query(
      `INSERT INTO approvals (booking_id, user_id, approval_status, approval_date)
       VALUES ($1, $2, 'approved', NOW()) RETURNING *`,
      [booking_id, user_id]
    );

    await client.query("COMMIT");
    return camelCaseKeys(approval.rows[0]);
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

exports.rejectBooking = async (booking_id, user_id, rejected_note) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await client.query(
      "UPDATE bookings SET booking_status = 'rejected' WHERE booking_id = $1",
      [booking_id]
    );

    const rejection = await client.query(
      `INSERT INTO approvals (booking_id, user_id, approval_status, rejected_note, approval_date)
       VALUES ($1, $2, 'rejected', $3, NOW()) RETURNING *`,
      [booking_id, user_id, rejected_note]
    );

    await client.query("COMMIT");
    return camelCaseKeys(rejection.rows[0]);
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

exports.getApprovalByBookingId = async (booking_id) => {
  const result = await pool.query(
    "SELECT * FROM approvals WHERE booking_id = $1",
    [booking_id]
  );
  return camelCaseKeys(result.rows);
};

exports.getAllApprovals = async () => {
  const result = await pool.query(
    "SELECT * FROM approvals INNER JOIN bookings on bookings.booking_id = approvals.booking_id INNER JOIN users on users.id = bookings.user_id INNER JOIN user_roles on users.role_id = user_roles.id INNER JOIN rooms r on r.id = bookings.room_id"
  );
  return camelCaseKeys(result.rows);
};

exports.editBooking = async (user_id, events) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    for (const event of events) {
      await client.query(
        "UPDATE bookings SET booking_status = $1 WHERE booking_id = $1",
        [booking_id]
      );

      const rejection = await client.query(
        `INSERT INTO approvals (booking_id, user_id, approval_status, rejected_note, approval_date)
         VALUES ($1, $2, 'rejected', $3, NOW()) RETURNING *`,
        [booking_id, user_id, rejected_note]
      );
    }

    await client.query("COMMIT");
    return camelCaseKeys(rejection.rows[0]);
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};
