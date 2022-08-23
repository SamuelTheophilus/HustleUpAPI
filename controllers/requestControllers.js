const Request = require('../models/requestModel');
const Notification = require('../models/notificationModel');
const generalUser = require('../models/generalUserModel');
const Subcategory = require('../models/subCategoriesModel');
const jwt = require('jsonwebtoken');



async function  returnUser (token) {
  
  const decodedToken = jwt.verify(token, 'HUSTLEUPAISECRET')
  const employerId = decodedToken.id;
  const user = await generalUser.findById(`${employerId}`)

  return user.name

}

async function returnSubcategoryId (name) {
  const subcategory = await Subcategory.findOne({name: name})
  return subcategory._id.toString()
}


//builds the list of the employee IDs
function employeeIdList(obj){
  let singleId = ''
  let finalArray = []
  obj.forEach(element => {
    singleId = element._id.toString()
    finalArray.push(singleId)
  });

  return finalArray

}



// Making a Service Request together with a notification request.
const postRequest = async (req, res) => {
  const { subcategoryName, description, location, completed } = req.body;
  const token = req.cookies.jwt;

  const username = await returnUser(token)
  let subcategoryid = await returnSubcategoryId (subcategoryName)


  let employeeList = await generalUser.find({subcategoryId: subcategoryid})
  employeeList = employeeIdList(employeeList)


  try {
    const request = await Request.create({ subcategoryid, description, username, location, completed });
    const notification = await Notification.create({ description, username, location, matchedEmployees: employeeList });
    res.status(200).json({ request, notification });
  }
  catch (err) {
    console.log(err);
  }
}



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