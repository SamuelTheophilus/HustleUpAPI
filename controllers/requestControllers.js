const Request = require('../models/requestModel');
const Notification = require('../models/notificationModel');
const generalUser = require('../models/generalUserModel');
const jwt = require('jsonwebtoken');



async function  returnUser (token) {
  
  const decodedToken = jwt.verify(token, 'HUSTLEUPAISECRET')
  const employerId = decodedToken.id;
  const user = await generalUser.findById(`${employerId}`)

  return user.name

}



// Making a Service Request together with a notification request.
const postRequest = async (req, res) => {
  const { categoryId, description, location, completed } = req.body;
  const token = req.cookies.jwt;

  const username = await returnUser(token)

  try {
    const request = await Request.create({ categoryId, description, username, location, completed });
    const notification = await Notification.create({ description, username, location });
    res.status(200).json({ request, notification });
  }
  catch (err) {
    console.log(err);
  }
}
//TODO: think about the request details.


//Updating a request
const updateRequest = (req, res) => {
  const id = req.query.id;
  Request.findByIdAndUpdate(id, req.body, { userFindAndModify: false })
    .then((data) => res.status(200).json(data))
    .catch((err) => { res.status(500).json(err) });

};


//Deleting a Request.
const deleteRequest = (req, res) => {

  const id = req.query.id;
  Request.findByIdAndDelete(id)
    .then((data) => { res.send({ message: 'Request deleted' }) })
    .catch((err) => { res.status(500).json(err) });
};


module.exports = {
  postRequest,
  updateRequest,
  deleteRequest,
};