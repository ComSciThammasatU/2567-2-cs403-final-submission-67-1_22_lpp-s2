-- Drop tables in reverse dependency order (optional for reset)
DROP TABLE IF EXISTS approvals CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS room_accessories CASCADE;
DROP TABLE IF EXISTS accessories CASCADE;
DROP TABLE IF EXISTS rooms CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS user_roles CASCADE;

-- User roles
CREATE TABLE user_roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  description TEXT
);

-- Users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role_id INTEGER REFERENCES user_roles(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Rooms
CREATE TABLE rooms (
  id SERIAL PRIMARY KEY,
  type VARCHAR(100) NOT NULL,
  capacity INTEGER NOT NULL CHECK (capacity > 0),
  floor INTEGER NOT NULL
);

-- Accessories
CREATE TABLE accessories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(100),
  amount INTEGER NOT NULL CHECK (amount >= 0),
  remaining_amount INTEGER NOT NULL CHECK (remaining_amount >= 0)
);

-- Room Accessories (many-to-many)
CREATE TABLE room_accessories (
  id SERIAL PRIMARY KEY,
  room_id INTEGER REFERENCES rooms(id) ON DELETE CASCADE,
  accessory_id INTEGER REFERENCES accessories(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL
);

-- Bookings
CREATE TABLE bookings (
  booking_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  room_id INTEGER NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  date_start DATE NOT NULL,
  date_end DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  people INTEGER NOT NULL CHECK (people > 0),
  activity TEXT NOT NULL,
  booking_status VARCHAR(50) NOT NULL,
  booking_status_name TEXT,
  modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  booking_note TEXT
);

-- Approvals
CREATE TABLE approvals (
  approval_id SERIAL PRIMARY KEY,
  booking_id INTEGER NOT NULL REFERENCES bookings(booking_id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  approval_status VARCHAR(50) NOT NULL,
  rejected_note TEXT,
  approval_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
