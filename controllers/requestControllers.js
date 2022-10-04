const Request = require('../models/requestModel');
const Notification = require('../models/notificationModel');
const generalUser = require('../models/generalUserModel');
const Subcategory = require('../models/subcategoriesModel');
const Category = require('../models/categoriesModel');
const Order = require('../models/ordersModel');
const jwt = require('jsonwebtoken');


/*
Custom Function
 */

async function returnUser(token) {

  const decodedToken = jwt.verify(token, 'HUSTLEUPAISECRET')
  const employerId = decodedToken.id;
  const user = await generalUser.findById(`${employerId}`)

  return user.name

}

async function returnCategoryId(name) {
  const subcategory = await Category.findOne({ name: name })
  return subcategory._id.toString()
}

async function ordersList(name) {
  let finalArray = [];


  for (let i = 0; i < name.length; i++) {
    let employee = await generalUser.findById(name[i].employeeId)
    let employeeName = employee.name;
    let status = name[i].completed;
    let employeeSkill = employee.skills;
    let description = name[i].description
    let senderName = name[i].username
    let location = name[i].location;
    let senderPhoneNumber = name[i].phoneNumber
    let employeePhoneNumber = employee.phoneNumber
    let userStatus = false
    let price = employee.price


    const orders = await Order.create({ price, employeeName, status, employeeSkill, description, senderName, location, userStatus, senderPhoneNumber, employeePhoneNumber })
    if (orders) {
      finalArray.push(orders);
    }


  }

  return finalArray;
}


//builds the list of the employee IDs
function employeeIdList(obj) {
  let singleId = ''
  let finalArray = []
  obj.forEach(element => {
    singleId = element._id.toString()
    finalArray.push(singleId)
  });

  return finalArray

}



/**
 * Controllers
*/

// Making a Service Request together with a notification request.
const postRequest = async (req, res) => {
  const { userId, employeeId, description, location, completed } = req.body;
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDYzNjMzZjRhNDhiMTA1MTQ5NjAzZiIsImlhdCI6MTY2MjMyMDkxMiwiZXhwIjoxNjYyNTgwMTEyfQ.PdNnpSE9zxHAPwyAc-SggMPeDClY7RamSk1wd_gdyuI";
  console.log(token)
  console.log(req.headers)
  const header_token = req.headers.jwt

  let username = ''
  let employeeList = []


  if (token) {
    username = await returnUser(token)

    employeeList.push(employeeId);

  }

  // if (header_token) {
  //   username = await returnUser(header_token)

  //   employeeList.push(employeeId);


  // }

  try {
    const request = await Request.create({ userId, employeeId, description, username, location, completed });
    let tempArray = []
    tempArray.push(request)
    console.log(tempArray)
    let finalArray = await ordersList(tempArray);
    tempArray = [];
    console.log(tempArray)
    const notification = await Notification.create({ description, username, location, matchedEmployees: employeeList });
    if (finalArray) {
      res.status(200).json({ request, notification });
    }
  }
  catch (err) {
    console.log(err);
  }
}

//Making a Service Request together with a notification request to One employee
const postRequestEmployee = async (req, res) => {
  const { userId, employeeId, description, location, completed } = req.body;
  const header_token = req.headers.jwt

  let username = ''
  let employeeList = []

  employeeList.push(employeeId);

  username = await returnUser(header_token)

  try {
    let tempArray = [];
    const request = await Request.create({ userId, employeeId, description, username, location, completed });
    tempArray.push(request)
    let finalArray = await ordersList(tempArray);
    tempArray = [];
    const notification = await Notification.create({ description, username, location, matchedEmployees: employeeList });


    if (finalArray) {
      res.status(200).json({ request, notification });
    }
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


const userOrders = async (req, res) => {
  let id = req.query.id;

  try {
    let sender = await generalUser.findById(id)
    let userOrders = await Order.find({ senderName: sender.name })
    if (userOrders) {
      return res.status(200).send(userOrders)
    }

  } catch (err) {
    console.log(err)
  }

}

//get employee orders
const employeeOrders = async (req, res) => {
  let id = req.query.id;

  const orders = await generalUser.findById(id)
  let employeeName = orders.name;

  if (employeeName) {
    try {
      const employeeOrders = await Order.find({ employeeName: employeeName })
      res.status(200).send(employeeOrders)

    } catch (err) {
      res.status(500).send('Something went wrong')
    }
  }
}




module.exports = {
  postRequest,
  updateRequest,
  deleteRequest,
  postRequestEmployee,
  userOrders,
  employeeOrders
};
