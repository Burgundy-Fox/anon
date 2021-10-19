const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize

beforeAll((done) => {
  queryInterface
    .bulkDelete("Users")
    .then((response) => done())
    .catch((err) => done(err))
})

let idUser

describe('POST /register', () => {
  it('Success test with valid email and password inputted, returning user data',
    (done) => {
      request(app).post('/register')
        .send({
          email: "user@mail.com",
          username: 'user',
          password: "123456789",
        })
        .then(({ body, status }) => {
          idUser = body.id
          expect(status).toBe(201)
          expect(body).toEqual(
            expect.objectContaining({
              id: expect.any(Number),
              username: expect.any(String),
              email: expect.any(String),
              avatar: expect.any(String)
            }),
          )
          done()
        })
    })
  it('fail with register with incorrect password and email',
    (done) => {
      request(app).post('/register')
        .send({
          email: "usermail.com",
          username: 'user',
          password: "1234",
        })
        .then(({ body, status }) => {
          expect(status).toBe(500)
          expect(body.errors[0].type).toContain('Validation error')
          done()
        })
    })
})

describe('POST/login', () => {
  it('Success test with valid email and password inputted, returning data and access_token',
    (done) => {
      request(app).post('/login')
        .send({
          username: 'user',
          password: '123456789',
        })
        .then(({ body, status }) => {
          expect(status).toBe(200)
          expect(body).toEqual({
            id: expect.any(Number),
            username: expect.any(String),
            email: expect.any(String),
            avatar: expect.any(String),
            access_token: expect.any(String)
          })
          done()
        })
    })

  it('fail with login with incorrect password and email',
    (done) => {
      request(app).post('/login')
        .send({
          username: 'user',
          password: "1234",
        })
        .then(({ body, status }) => {
          expect(status).toBe(500)
          expect(body).toHaveProperty("error", expect.any(String))
          done()
        })
    })
})

describe(`PATCH/user/:id`, () => {
  it('success change avatar of user, return data User',
    (done) => {
      request(app).patch(`/user/${idUser}`)
        .send({
          avatar: 'https://avatars.dicebear.com/api/bottts/anon-168.svg',
        })
        .then(({ body, status }) => {
          expect(status).toBe(200)
          expect(body).toEqual({
            id: expect.any(Number),
            username: expect.any(String),
            email: expect.any(String),
            avatar: expect.any(String),
          })
          done()
        })
    })
  it('failed change avatar of user, return error',
    (done) => {
      request(app).patch(`/user/9999999`)
        .send({
          avatar: 'https://avatars.dicebear.com/api/bottts/anon-168.svg',
        })
        .then(({ body, status }) => {
          expect(status).toBe(500)
          expect(body).toEqual({error: expect.any(String)})
          done()
        })
    })

})
