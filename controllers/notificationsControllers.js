const Notification = require('../models/notificationModel');
const Request = require('../models/requestModel');


const getAllNotfications = async (req, res) => {

  try {
    const results = await Notification.find();
    res.status(200).json(results);
  }
  catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
}


const postNotfications = async (req, res) => {

  const description = Request.description;
  const employerId = Request.employerId;
  const location = Request.location;

  try {
    const notification = await Notification.create({ description, employerId, location });
    res.status(200).json(notification);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
}

const deleteNotfications = async (req, res) => {
  const id = req.params.id;

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



module.exports = {
  getAllNotfications,
  postNotfications,
  deleteNotfications
}