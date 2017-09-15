// chai
const chai = require('chai')
const expect = chai.expect

// mocha and supertest
const mocha = require('mocha')
const supertest = require('supertest')

// koa app
const app = require('../server')
const request = supertest.agent(app.listen())

chai.should()

let token = ""
let user = {}

// tests
mocha.describe('POST api/auth/', () => {
    mocha.it('should create a token', (done) => {
      request
        .post('/api/auth/')
        .set('Accept', 'application/json')
        .send({})
        .expect(200, (err, res) => {
            token = "Bearer " + res.body.token
            done()
        })
    })
})

mocha.describe('POST api/user/create', () => {
    mocha.it('should create a users', (done) => {
      request
        .post('/api/user/create/')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .send({
            email: "test@test.com"
        })
        .expect(200, (err, res) => {
            user = res.body.result
            done()
        })
    })
})

mocha.describe('POST api/user', () => {
    mocha.it('should get all users', (done) => {
      request
        .post('/api/user/')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .send({
        })
        .expect(200, (err, res) => {
            done()
        })
    })
})

mocha.describe('GET api/user/:id', () => {
    mocha.it('should get a user', (done) => {
      request
        .get('/api/user/' + user._id)
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .expect(200, (err, res) => {
            done()
        })
    })
})

mocha.describe('PATCH api/user/:id', () => {
    mocha.it('should get a user', (done) => {
      request
        .patch('/api/user/' + user._id)
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .send({
            email: "trocouemail@test.com"
        })
        .expect(200, (err, res) => {
            done()
        })
    })
})

mocha.describe('DELETE api/user/:id', () => {
    mocha.it('should get a user', (done) => {
      request
        .delete('/api/user/' + user._id)
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .send({
        })
        .expect(200, (err, res) => {
            done()
        })
    })
})