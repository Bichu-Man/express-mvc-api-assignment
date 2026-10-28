const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// 1. Load environment variables from .env file
dotenv.config();

// 2. Initialize the Express application
const app = express();

// 3. Middleware: Parse incoming JSON requests
app.use(express.json());

// 4. Import Routes
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const courseRoutes = require('./routes/courseRoutes');

// 5. Mount Routes 
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/courses', courseRoutes);

// 6. Global 404 Handler (Required for Postman Screenshot 5)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route Not Found' });
});

// 7. Connect to MongoDB and Start Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully.');
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1); 
  });