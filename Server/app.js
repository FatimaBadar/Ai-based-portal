import express from 'express'
import cors from 'cors'
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import requirementsRouter from './api/requirements.js';
import uiRouter from './api/ui.js';

dotenv.config();
const app = express();

// const corsOptions = {
//     origin: ['http://localhost:5173'], 
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], 
//     allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
// };

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//API Routes
app.use('/api/requirements', requirementsRouter);
app.use('/api/ui', uiRouter);

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

// MongoDB Setup
mongoose.connect(process.env.ATLAS_URL).then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
export default app;