const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const app = require('../index.js')

chai.use(chaiHttp)



/*
Tests Subcategories for the Hustleup API
*/
describe('Testing Subcategory Routes', () => {
  // Testing the GET Subcategory routes
  describe('GET /subcategories/:id', () => {
    it('Should GET all the employees of a subcategory', (done) => {
      chai.request(app)
        .get('/subcategories/id?id=62efda3e64eb06680395b014')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done()
        })
    })


    it('Should NOT GET all the employees of a subcategory', (done) => {
      chai.request(app)
        .get('/subcategoriy/id?id=62ef4a3e64eb06680395b015')
        .end((err, res) => {
          res.should.have.status(404);
          done()
        })
    })

  })


  describe('GET /subcategories', () => {
    it('Should GET all the subcategories of a category', (done) => {
      chai.request(app)
        .get('/subcategories')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done()
        })
    })

    it('Should NOT GET all the subcategories of a category', (done) => {
      chai.request(app)
        .get('/subcategory')
        .end((err, res) => {
          res.should.have.status(404);
          done()
        })
    })

  })


  describe('POST /subcategories', () => {
    it('Should POST a new subcategory to the database', (done) => {
      let subcategory = {
        name: 'Nails'
      }
      chai.request(app)
        .post('/subcategories')
        .send(subcategory)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        })
    })

    it('Should  not POST a new subcategory to the database', (done) => {
      let subcategory = {
        name: 'Nails'
      }
      chai.request(app)
        .post('/subcategory')
        .send(subcategory)
        .end((err, res) => {
          res.should.have.status(404);
          done()
        })
    })
  })

})

/*
Tests Categories for the Hustleup API
*/
describe('Testing the Category Routes', () => {
  
  //Testing the GET route for single categories
  describe('GET /categories/:id', () => {
    it('Should GET a single category', (done) => {
      chai.request(app)
        .get('/categories/id?id=630a568c645af1505a5c9174')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done()
        })
    })

    it('Should NOT GET a single category', (done) => {
      chai.request(app)
        .get('/categorie0s/id?id=630a568c645af1505a5c9184')
        .end((err, res) => {
          res.should.have.status(404);
          // res.body.should.be.a('array');
          done()
        })
    })


  })

  describe('GET /categories', ()=>{
    it('Should GET all categories', (done) => {
      chai.request(app)
      .get('/categories')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.should.have.lengthOf(11);
        done()
      })
    })

    it('Should NOT GET all categories', (done) => {
      chai.request(app)
      .get('/category')
      .end((err, res) => {
        res.should.have.status(404);
        done()
      })
    })
  })

  describe('POST /categories', ()=>{
    it('Should POST a new category', (done) => {
      let category = {
        name: 'New Category'
      }
      chai.request(app)
      .post('/categories')
      .send(category)
      .end((err, res)=>{
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name')
        // res.body.should.have.property('employee')
        done()
      })
    })

    it('Should NOT POST a new category', (done) => {
      let category = {
        name: 'New Category'
      }
      chai.request(app)
      .post('/category')
      .send(category)
      .end((err, res)=>{
        res.should.have.status(404);
        // res.body.should.be.a('object');
        // res.body.should.have.property('name')
        // res.body.should.have.property('employee')
        done()
      })
    })
  })

  describe('DELETE /categories', ()=>{
    it('Should DELETE a category', (done) => {
      let name = {
        name: 'New Category'
      }
      chai.request(app)
      .delete('/categories')
      .send(name)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message').eql('Category deleted successfully');
        done()
      })
    })


    it('Should NOT DELETE a category', (done) => {
      let name = {
        name: ''
      }
      chai.request(app)
      .delete('/categories')
      .send(name)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message').eql('No Name Found');
        done()
      })
    })
  })

})


/*
Tests Notification Routes for the Hustleup API
*/
describe('Testing the Notification Routes', ()=>{

  describe('GET /notifications', ()=>{
    it('should GET all notifications of a particular user', (done)=>{
      chai.request(app)
      .get('/notifications/id?id=62f50b785b769e11f72abde8')
      .end((err, res)=>{
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.should.have.lengthOf(3);
        done()
      })
    })

    it('should NOT GET all notifications of a particular user', (done)=>{
      chai.request(app)
      .get('/notification/id?id=62f50b785b769e11f72abde8')
      .end((err, res)=>{
        res.should.have.status(404);
        done()
      })
    })
  })

  describe('POST /notifications', ()=>{
    // it('should POST a notification', (done)=>{
    //   let notification = {
    //     description: "I need someone to paint my room",
    //     username: "June Gray",
    //     location: "Brunei"
    //   }
    //   chai.request(app)
    //   .post('/notifications')
    //   .send(notification)
    //   .end((err, res)=>{
    //     res.should.have.status(200);
    //     res.body.should.be.a('object');
    //     res.body.should.have.property('notification');
    //     done()
    //   })
    // })


    it('should NOT POST a notification', (done)=>{
      let notification = {
        description: "I need someone to paint my room",
        username: "June Gray",
        location: "Brunei"
      }
      chai.request(app)
      .post('/notification')
      .send(notification)
      .end((err, res)=>{
        res.should.have.status(404);
        done();
      })
    })
  })

})