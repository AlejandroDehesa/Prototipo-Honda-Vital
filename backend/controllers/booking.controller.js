import { v4 as uuidv4 } from 'uuid';
import db from '../config/database.js';

export const createBooking = (req, res) => {
  const { room_id, user_name, user_email, user_phone, booking_date } = req.body;
  
  if (!room_id || !user_name || !user_email || !booking_date) {
    return res.status(400).json({ status: 'error', message: 'Missing required fields' });
  }

  const id = uuidv4();
  const query = `INSERT INTO bookings (id, room_id, user_name, user_email, user_phone, booking_date, status) VALUES (?, ?, ?, ?, ?, ?, 'pending')`;
  
  db.run(query, [id, room_id, user_name, user_email, user_phone, booking_date], function(err) {
    if (err) {
      return res.status(500).json({ status: 'error', message: err.message });
    }
    res.status(201).json({ 
      status: 'success', 
      data: { id, room_id, user_name, booking_date, status: 'pending' },
      message: 'Reserva solicitada. David revisará tu solicitud y te contactará para confirmar.'
    });
  });
};

export const updateBookingStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // 'approved' or 'rejected'

  if (!['approved', 'rejected', 'pending'].includes(status)) {
    return res.status(400).json({ status: 'error', message: 'Invalid status' });
  }

  const query = `UPDATE bookings SET status = ? WHERE id = ?`;
  
  db.run(query, [status, id], function(err) {
    if (err) {
      return res.status(500).json({ status: 'error', message: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ status: 'error', message: 'Booking not found' });
    }
    res.json({ status: 'success', message: `Booking status updated to ${status}` });
  });
};

export const getAllBookings = (req, res) => {
  db.all("SELECT b.*, r.name as room_name FROM bookings b JOIN rooms r ON b.room_id = r.id ORDER BY b.created_at DESC", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ status: 'error', message: err.message });
    }
    res.json({ status: 'success', data: rows });
  });
};
