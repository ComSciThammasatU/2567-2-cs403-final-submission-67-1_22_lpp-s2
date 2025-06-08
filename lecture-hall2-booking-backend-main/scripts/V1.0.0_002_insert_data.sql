-- === User Roles ===
INSERT INTO user_roles (name, description)
VALUES 
  ('approval', 'Approver with full access'),
  ('user', 'Regular user for booking rooms');

-- === Users ===
-- Note: Use hashed passwords in real use; using dummy plain values here
INSERT INTO users (first_name, last_name, username, password, role_id)
VALUES 
  ('Approval', 'User', 'approval_user', 'hashed_approval_pass', 1),
  ('Normal', 'User', 'normal_user', 'hashed_user_pass', 2);

-- === Rooms ===
INSERT INTO rooms (type, capacity, floor)
VALUES 
  ('Lecture Hall', 100, 1),
  ('Seminar Room', 30, 2),
  ('Lab Room', 25, 3);

-- === Accessories ===
INSERT INTO accessories (name, type, amount, remaining_amount)
VALUES 
  ('Projector', 'Visual', 5, 5),
  ('Microphone', 'Audio', 10, 10),
  ('Whiteboard', 'Stationery', 8, 8);

-- === Room Accessories ===
INSERT INTO room_accessories (room_id, accessory_id, quantity)
VALUES 
  (1, 1, 1), -- Lecture Hall has 1 Projector
  (1, 2, 2), -- Lecture Hall has 2 Microphones
  (2, 3, 1), -- Seminar Room has 1 Whiteboard
  (3, 1, 1); -- Lab Room has 1 Projector

-- === Bookings ===
INSERT INTO bookings (
  user_id, room_id, date_start, date_end, start_time, end_time,
  people, activity,
  booking_status, booking_status_name, booking_note
) VALUES (
  2, -- Normal User
  1, -- Lecture Hall
  '2025-05-20', '2025-05-20',
  '09:00', '11:00',
  50, -- 50 people
  'Guest lecture on AI',
  'pending', 'Pending Approval',
  'Booking for guest lecture'
);

-- === Approvals ===
INSERT INTO approvals (
  booking_id, user_id, approval_status, rejected_note
) VALUES (
  1, -- booking_id
  1, -- approval user
  'approved',
  NULL
);
