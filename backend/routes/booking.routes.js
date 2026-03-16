import express from 'express';
import { createBooking, updateBookingStatus, getAllBookings } from '../controllers/booking.controller.js';

const router = express.Router();

router.post('/', createBooking);
router.patch('/:id/status', updateBookingStatus);
router.get('/', getAllBookings);

export default router;
