const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const HomePageRoutes = require('./routes/homepageRoutes');
const NotificationRoutes = require('./routes/notificationRoutes');
const PaymentRoutes = require('./routes/paymentRoutes');
const ProfileRoutes = require('./routes/profileRoutes');
const authRoutes = require('./routes/authRoutes')
const {checkUser} = require('./middleware/authMiddleware')

// variables from .env file
dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 4000;
const dbURI = process.env.dbURI

//middleware
app.use(express.json());


// connect to database.
mongoose
  .connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => app.listen(PORT, ()=>{console.log(`Backend server is running on port ${PORT}`)}))
  .catch(err => {console.log(err)});


// routes.
app.get('*', checkUser);
app.use(HomePageRoutes);
app.use(NotificationRoutes);
app.use(PaymentRoutes);
app.use(ProfileRoutes);
app.use(authRoutes);


