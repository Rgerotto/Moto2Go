const express = require('express');
const mongoose = require('./db/connection');
const cors = require('cors');
const AdminRoutes = require('./routes/adminRouter')
const motorcycleRoutes = require('./routes/motorcycleRouter');
const reservationRoutes = require('./routes/reservationRouters');
/* const newTest = require('./routes/newrouterteste'); */

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected successfully');

  app.use('/api/motorcycles', motorcycleRoutes);
  app.use('/api/reservas', reservationRoutes);
  app.use('/api/admin', AdminRoutes);
 /*  app.use('/api/newdb', newTest); */

  app.listen(3000, () => {
    console.log(`Server running at http://localhost:3000`);
  });
});

mongoose.connection.on('error', (error) => {
  console.error('Errot to connected to MongoDB:', error);
});
