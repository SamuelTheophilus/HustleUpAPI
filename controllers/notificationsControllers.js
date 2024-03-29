const Notification = require('../models/notificationModel');
const Request = require('../models/requestModel');


const getAllNotfications = async (req, res) => {

  const id = req.query.id;


  try {
    const results = await Notification.find({matchedEmployees: id});
    res.status(200).json(results);
  }
  catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
}


const postNotfications = async (req, res) => {

  const { description, username, location } = req.body;

  try {
    const notification = await Notification.create({ description, username, location });
    res.status(200).json({notification: notification});
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
}

const deleteNotfications = async (req, res) => {
  const id = req.query.id;

  try {
    Notification.findByIdAndDelete(id)
      .then((result) => {
        res.status(200).json({ message: 'Notification deleted successfully' })
      })
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
}

// Module exporting

module.exports = {
  getAllNotfications,
  postNotfications,
  deleteNotfications
}