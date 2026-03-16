import express from 'express';
import { getAllRooms, getRoomAvailability } from '../controllers/room.controller.js';

const router = express.Router();

router.get('/', getAllRooms);
router.get('/:id/availability', getRoomAvailability);

export default router;
