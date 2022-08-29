const Request = require('../models/requestModel');
const Notification = require('../models/notificationModel');
const generalUser = require('../models/generalUserModel');
const Subcategory = require('../models/subCategoriesModel');
const Category = require('../models/categoriesModel')
const jwt = require('jsonwebtoken');



async function  returnUser (token) {
  
  const decodedToken = jwt.verify(token, 'HUSTLEUPAISECRET')
  const employerId = decodedToken.id;
  const user = await generalUser.findById(`${employerId}`)

  return user.name

}

async function returnCategoryId (name) {
  const subcategory = await Category.findOne({name: name})
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
  console.log(req.headers)
  const header_token = req.headers.jwt

  let username = ''
  let categoryid = ''
  let employeeList = []


  if(token){
    username = await returnUser(token)
    categoryid = await returnCategoryId (subcategoryName)
    employeeList = await generalUser.find({categoryId: categoryid})
    employeeList = employeeIdList(employeeList)
  } 
  
  if(header_token){
    username = await returnUser(header_token)
    categoryid = await returnCategoryId (subcategoryName)
    employeeList = await generalUser.find({categoryId: categoryid})
    employeeList = employeeIdList(employeeList)

  }

  try {
    const request = await Request.create({ categoryid, description, username, location, completed });
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