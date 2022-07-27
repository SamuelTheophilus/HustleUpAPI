const express = require('express');
const app = express();
const dotenv = require('dotenv');
const HomePageRouter = require('./routes/homepageRoutes');
const NotificationRouter = require('./routes/notificationRoutes');
const PaymentRouter = require('./routes/paymentRoutes');
const ProfileRouter = require('./routes/profileRoutes');

dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`)
});


// Home
app.use('/', HomePageRouter);
app.use('/', NotificationRouter);
app.use('/', PaymentRouter);
app.use('/', ProfileRouter);


