const Request = require('../models/requestModel');

// Posting A request.
const postRequest = async (req, res) => {
  const { category, description, location } = req.body;
  try {
    const request = await Request.create({ category, description, location });
    res.status(200).json(request);
  }
  catch (err) {
    console.log(err);
  }
}



//Updating a request
const updateRequest = (req, res) => {
  const id = req.params.id;
  Request.findByIdAndUpdate(id, req.body, { userFindAndModify: false })
    .then((data) => res.status(200).json(data))
    .catch((err) => { res.status(500).json(err) });

};


//Deleting a Request.
const deleteRequest = (req, res) => {

  const id = req.params.id;
  Request.findByIdAndDelete(id)
    .then((data) => { res.send({ message: 'Request deleted' }) })
    .catch((err) => { res.status(500).json(err) });
};


module.exports = {
  postRequest,
  updateRequest,
  deleteRequest,
};