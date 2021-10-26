const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize

beforeAll((done) => {
  queryInterface
    .bulkDelete("Transactions")
    .then((response) => done())
    .catch((err) => done(err))
  queryInterface
    .bulkDelete("Hisses")
    .then((response) => done())
    .catch((err) => done(err))
  queryInterface
    .bulkDelete("Users")
    .then((response) => done())
    .catch((err) => done(err))
})

let idUser
let token
let hissId

describe('POST user/register', () => {
  it('Success test with valid email and password inputted, returning user data',
    (done) => {
      request(app).post('/user/register')
        .send({
          email: "user@mail.com",
          username: 'user',
          password: "123456789",
          avatar: `https://avatars.dicebear.com/api/bottts/anon-100.svg`,
          wallet: 0
        })
        .then(({ body, status }) => {
          idUser = body.id
          expect(status).toBe(201)
          expect(body).toEqual(
            expect.objectContaining({
              id: expect.any(Number),
              username: expect.any(String),
              email: expect.any(String),
              avatar: expect.any(String),
              wallet: expect.any(Number),
            }),
          )
          done()
        })
    })
  it('fail with register with incorrect password and email',
    (done) => {
      request(app).post('/user/register')
        .send({
          email: "usermail.com",
          username: 'user',
          password: "1234",
        })
        .then(({ body, status }) => {
          expect(status).toBe(400)
          expect(body).toHaveProperty("error", expect.any(Array))
          done()
        })
    })
})

describe('POST/login', () => {
  it('Success test with valid email and password inputted, returning data and access_token',
    (done) => {
      request(app).post('/user/login')
        .send({
          username: 'user',
          password: '123456789',
        })
        .then(({ body, status }) => {
          token = body.access_token
          expect(status).toBe(200)
          expect(body).toEqual({
            id: expect.any(Number),
            username: expect.any(String),
            email: expect.any(String),
            avatar: expect.any(String),
            access_token: expect.any(String),
            wallet: expect.any(Number),
          })
          done()
        })
    })

  it('fail with login with incorrect username',
    (done) => {
      request(app).post('/user/login')
        .send({
          username: 'user99',
          password: "123456789",
        })
        .then(({ body, status }) => {
          expect(status).toBe(401)
          expect(body.error[0]).toContain("User not found")
          done()
        })
    })

  it('fail with login with incorrect password',
    (done) => {
      request(app).post('/user/login')
        .send({
          username: 'user',
          password: "123456",
        })
        .then(({ body, status }) => {
          expect(status).toBe(400)
          expect(body.error[0]).toContain("Email or Password Incorrect")
          done()
        })
    })
})

describe(`PATCH/user/:id`, () => {
  it('success change avatar of user, return data User',
    (done) => {
      request(app).patch(`/user/${idUser}`)
        .set({ access_token: token })
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
            wallet: expect.any(Number)
          })
          done()
        })
    })

  it('failed change avatar of user, return error',
    (done) => {
      request(app).patch(`/user/9999999`)
        .set({ access_token: token })
        .send({
          avatar: 'https://avatars.dicebear.com/api/bottts/anon-168.svg',
        })
        .then(({ body, status }) => {
          expect(status).toBe(404)
          expect(body).toEqual({ error: expect.any(Array) })
          done()
        })
    })

  it('failed change avatar of user, no access token return error',
    (done) => {
      request(app).patch(`/user/9999999`)
        .send({
          avatar: 'https://avatars.dicebear.com/api/bottts/anon-168.svg',
        })
        .then(({ body, status }) => {
          expect(status).toBe(401)
          expect(body).toEqual(expect.any(Object))
          done()
        })
    })
})

describe(`PATCH/user/buy-item/:id`, () => {
  it('success buying item, return data User',
    (done) => {
      request(app).patch(`/user/buy-item/${idUser}`)
        .set({ access_token: token })
        .send({
          price: 5000,
        })
        .then(({ body, status }) => {
          expect(status).toBe(200)
          expect(body).toEqual({
            id: expect.any(Number),
            username: expect.any(String),
            email: expect.any(String),
            wallet: expect.any(Number)
          })
          done()
        })
    })

  it('failed added wallet with invalid access_token id, return error',
    (done) => {
      request(app).patch(`/user/buy-item/${idUser}`)
        .set({ access_token: "HADhasmdnelalkddsmadas" })
        .send({
          price: 5000,
        })
        .then(({ body, status }) => {
          expect(status).toBe(401)
          expect(body.error).toContain("acces token not found or invalid token")
          done()
        })
    })
})


describe('POST /hisses', () => {
  it('Success make hiss with all body inputted, returning data hiss',
    (done) => {
      request(app).post('/hisses')
        .set({ access_token: token })
        .send({
          content: "lalalala",
          image_url: 'https://avatars.dicebear.com/api/bottts/anon-168.svg',
          like: 0,
          UserId: idUser,
        })
        .then(({ body, status }) => {
          hissId = body.id
          expect(status).toBe(201)
          expect(body).toEqual(expect.any(Object))
          done()
        })
    })

  it('fail make hiss with empty content, returning error',
    (done) => {
      request(app).post('/hisses')
        .set({ access_token: token })
        .send({
          content: "",
          image_url: "",
          UserId: idUser
        })
        .then(({ body, status }) => {
          expect(status).toBe(400)
          expect(body.error).toEqual(expect.any(Array))
          done()
        })
    })
})

describe('GET /hisses', () => {
  it('Success getting all hiss, returning data hiss',
    (done) => {
      request(app).get('/hisses')
        .set({ access_token: token })
        .then(({ body, status }) => {
          expect(status).toBe(200)
          expect(body).toEqual(expect.any(Array))
          done()
        })
    })

  it('fail getting hiss with no access token, returning error',
    (done) => {
      request(app).get('/hisses')
        .then(({ body, status }) => {
          expect(status).toBe(401)
          expect(body.error).toContain('acces token not found or invalid token')
          done()
        })
    })
})

describe('GET /hisses/:id', () => {
  it('Success getting all user hiss, returning data hiss',
    (done) => {
      request(app).get(`/hisses/${hissId}`)
        .set({ access_token: token })
        .then(({ body, status }) => {
          expect(status).toBe(200)
          expect(body).toEqual(expect.any(Array))
          done()
        })
    })

  it('fail getting hiss with invalid id, returning error',
    (done) => {
      request(app).get('/hisses/9999')
        .set({ access_token: token })
        .then(({ body, status }) => {
          expect(status).toBe(404)
          expect(body.error).toContain('Data not found')
          done()
        })
    })
})

describe('PUT /hisses/:id', () => {
  it('Success make hiss with all body inputted, returning data hiss',
    (done) => {
      request(app).put(`/hisses/${hissId}`)
        .set({ access_token: token })
        .send({
          content: "lalalala",
          image_url: 'https://avatars.dicebear.com/api/bottts/anon-168.svg',
          UserId: idUser,
        })
        .then(({ body, status }) => {
          hissId = body.id
          expect(status).toBe(200)
          expect(body).toEqual(expect.any(Object))
          done()
        })
    })

  it('fail make hiss with empty content, returning error',
    (done) => {
      request(app).put(`/hisses/${hissId}`)
        .set({ access_token: token })
        .send({
          content: "",
          image_url: "",
          UserId: idUser
        })
        .then(({ body, status }) => {
          expect(status).toBe(400)
          expect(body.error[0]).toContain('Content input cannot be empty')
          done()
        })
    })
})

describe('Patch /hisses/:id', () => {
  it('Success update like hiss, returning data hiss',
    (done) => {
      request(app).patch(`/hisses/${hissId}`)
        .set({ access_token: token })
        .send({
          like: 1
        })
        .then(({ body, status }) => {
          hissId = body.id
          expect(status).toBe(200)
          expect(body).toEqual(expect.any(Object))
          done()
        })
    })

  it('fail update like hiss with id not found, returning error',
    (done) => {
      request(app).patch(`/hisses/900`)
        .set({ access_token: token })
        .send({
          like: 1
        })
        .then(({ body, status }) => {
          expect(status).toBe(404)
          expect(body.error).toContain('Data not found')
          done()
        })
    })
})


describe('Delete /hisses/:id', () => {
  it('Success delete hiss by id, returning success message',
    (done) => {
      request(app).delete(`/hisses/${hissId}`)
        .set({ access_token: token })
        .send({
          like: 1
        })
        .then(({ body, status }) => {
          hissId = body.id
          expect(status).toBe(200)
          expect(body).toEqual(expect.any(Object))
          done()
        })
    })

  it('fail delete hiss with id not found, returning error',
    (done) => {
      request(app).delete(`/hisses/900`)
        .set({ access_token: token })
        .send({
          like: 1
        })
        .then(({ body, status }) => {
          expect(status).toBe(404)
          expect(body.error).toContain('Data not found')
          done()
        })
    })
})


describe('POST /transaction', () => {
  it('Success make transaction, returning token and URL',
    (done) => {
      request(app).post('/transaction')
        .send({
          order_id: `TOP5000TOPBUG1995-12-16T20:24:00.000ZAnonUser${idUser}`,
          transaction_status: "pending",
          gross_amount: 5000,

        })
        .then(({ body, status }) => {
          expect(status).toBe(201)
          expect(body).toEqual(expect.any(Object))
          done()
        })
    })

  it('Success update transaction, returning token and URL',
    (done) => {
      request(app).post('/transaction')
        .send({
          order_id: `TOP5000TOPBUG1995-12-16T20:24:00.000ZAnonUser${idUser}`,
          transaction_status: "settlement",
          gross_amount: 5000,

        })
        .then(({ body, status }) => {
          expect(status).toBe(200)
          expect(body).toEqual(expect.any(Object))
          done()
        })
    })

  it('fail update transaction, returning error',
    (done) => {
      request(app).post('/transaction')
        .send({
          order_id: `TOP5000TOPBUG1995-12-16T20:24:00.000ZAnonUser${idUser}`,
        })
        .then(({ body, status }) => {
          console.log(status, body ,"staus");
          expect(status).toBe(404)
          expect(body.error).toContain("Data Transaction not found, input transaction status")
          done()
        })
    })

  it('fail make transaction with no gross_amount, returning error',
    (done) => {
      request(app).post('/transaction')
        .send({
          order_id: `TOP5000TOPBUG1995-12-16T20:24:00.000ZAnonUser${idUser}`,
          transaction_status: "",
        })
        .then(({ body, status }) => {
          expect(status).toBe(400)
          expect(body.error).toContain("please check your input, make sure you have inputted them all")
          done()
        })
    })
})

describe('GET /transaction', () => {
  it('Success view transaction, returning token and URL',
    (done) => {
      request(app).get('/transaction')
        .set({ access_token: token })
        .then(({ body, status }) => {
          expect(status).toBe(200)
          expect(body).toEqual(expect.any(Object))
          done()
        })
    })

  it('fail view transaction with no access_token, returning error',
    (done) => {
      request(app).get('/transaction')
        .then(({ body, status }) => {
          expect(status).toBe(401)
          expect(body.error).toContain('acces token not found or invalid token')
          done()
        })
    })
})
