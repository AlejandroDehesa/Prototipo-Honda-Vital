import db from '../config/database.js';

export const getAllRooms = (req, res) => {
  db.all("SELECT * FROM rooms", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ status: 'error', message: err.message });
    }
    res.json({ status: 'success', data: rows });
  });
};

export const getRoomAvailability = (req, res) => {
  const { id } = req.params;
  db.all("SELECT booking_date FROM bookings WHERE room_id = ? AND status IN ('pending', 'approved')", [id], (err, rows) => {
    if (err) {
      return res.status(500).json({ status: 'error', message: err.message });
    }
    const bookedDates = rows.map(row => row.booking_date);
    res.json({ status: 'success', data: bookedDates });
  });
};
