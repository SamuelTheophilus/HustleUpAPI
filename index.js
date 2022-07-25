const express = require('express');
const app = express();
const dotenv = require('dotenv');
const { routeStrings } = require('./constants/constants')

dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 4000;



app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`)
});

app.get('/' + routeStrings.Hompage, (req, res) => {
  res.send('This is the home page')
});


app.get('/' + routeStrings.Notification, (req, res) => {
  res.send('This is the notification page')
});

app.get('/' + routeStrings.Profile, (req, res) => {
  res.send('This is the profile page')
})

app.get('/' + routeStrings.Payments, (req, res)=>{
  res.send('This is the payment section')
})