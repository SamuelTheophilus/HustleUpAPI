/*
Tests Subcategories for the Hustleup API
*/

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const app = require('../index.js')

chai.use(chaiHttp)


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

})