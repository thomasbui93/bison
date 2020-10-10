import request from 'supertest'
import dataSync from '../../../src/bootstrap/data_sync'
import setupServer from '../../../src/bootstrap/server'

describe('create normal user', () => {
  beforeAll(async () => {
    await dataSync()
  })

  describe('valid credential', () => {
    it('should create a new user', async () => {
      const app = setupServer()
      const res = await request(app)
        .post('/api/normal-user')
        .send({
          email: 'k@bui.com',
          password: '123456xx'
        })
      expect(res.status).toEqual(201)
      expect(res.body).toHaveProperty('user')
      expect(res.body.user).toMatchObject({
        email: 'k@bui.com'
      })
      expect(res.body.user).not.toHaveProperty('password')
    })
  })

  describe('invalid email', () => {
    it('should not create user', async () => {
      const app = setupServer()
      const res = await request(app)
        .post('/api/normal-user')
        .send({
          email: 'k.com',
          password: '123456xx'
        })
      expect(res.status).toEqual(400)
    })
  })

  describe('invalid password', () => {
    it('should not create user', async () => {
      const app = setupServer()
      const res = await request(app)
        .post('/api/normal-user')
        .send({
          email: 'k@bui.com',
          password: '11'
        })
      expect(res.status).toEqual(400)
    })
  })
})
