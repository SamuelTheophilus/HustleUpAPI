const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');



// custom Routes 
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const profileRoutes = require('./routes/userRoutes');
const requestRoutes = require('./routes/requestRoutes');
const subcategory = require('./routes/subcategoryRoutes');


// Other Dependencies
const { checkUser } = require('./middleware/authMiddleware');
const cookieParser = require('cookie-parser');
const app = express();

// variables from .env file
dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 4000;
const dbURI = process.env.dbURI

//middleware
app.use(express.json());
app.use(cookieParser());


// connect to database.
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(PORT, () => { console.log(`Backend server is running on port ${PORT}`) }))
  .catch(err => { console.log(err) });


// Using Routes
app.use(authRoutes);
app.use(checkUser);
app.use(categoryRoutes);
app.use(notificationRoutes);
app.use(profileRoutes);
app.use(requestRoutes);
app.use(subcategory);


