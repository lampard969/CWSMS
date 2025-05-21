const express = require('express');
const mongoose = require('mongoose');


const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://hakizimanalampard8:6y50Mq45WD9E9bya@cluster0.akimel5.mongodb.net/cwsms?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Successfully connected to MongoDB');
  // Log the current database name
  console.log('Connected to DB:', mongoose.connection.name);
  app.listen(PORT, () => {
    console.log(`Server is running and connected to MongoDB on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});

const app = express();
const PORT = process.env.PORT || 3001;

const carRoutes = require('./routes/carRoutes');
const packageRoutes = require('./routes/packageRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const servicePackageRoutes = require('./routes/servicePackageRoutes');

app.use(express.json());
app.use('/api/cars', carRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/servicepackages', servicePackageRoutes);

app.get('/', (req, res) => {
  res.send('Hello World from Express backend!');
});
