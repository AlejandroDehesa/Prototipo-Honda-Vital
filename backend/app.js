import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import contactRoutes from './routes/contact.routes.js';
import roomRoutes from './routes/room.routes.js';
import bookingRoutes from './routes/booking.routes.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health check
app.get('/api/status', (req, res) => {
  res.json({
    status: 'success',
    message: 'Onda Vital Backend API is running',
    timestamp: new Date()
  });
});

// API Routes
app.use('/api', contactRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);


// AI Agent Endpoint Stub
app.post('/api/ai/query', (req, res) => {
  const { query } = req.body;
  
  // Stub for future AI Agent Logic
  console.log('Received AI query:', query);
  
  res.status(200).json({
    status: 'success',
    reply: 'Soy el asistente virtual de David. Actualmente estoy en desarrollo, pero pronto podré ayudarte a resolver tus dudas y agendar citas.'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
