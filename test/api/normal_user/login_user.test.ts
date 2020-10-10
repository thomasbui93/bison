import request from 'supertest'
import dataSync from '../../../src/bootstrap/data_sync'
import setupServer from '../../../src/bootstrap/server'
import createUser from '../../../src/features/regular/create_user'

describe('login user', () => {
  beforeAll(async () => {
    await dataSync()
    await createUser(
      'k@bui.com',
      '123456'
    )
  })

  describe('valid credential', () => {
    it('should return a token', async () => {
      const app = setupServer()
      const res = await request(app)
        .post('/api/normal-user/login')
        .send({
          email: 'k@bui.com',
          password: '123456'
        })
      expect(res.status).toEqual(200)
      expect(res.body).toHaveProperty('token')
    })
  })

  describe('invalid credential', () => {
    it('should not return token', async () => {
      const app = setupServer()
      const res = await request(app)
        .post('/api/normal-user/login')
        .send({
          email: 'k@bui.com',
          password: '123456x'
        })
      expect(res.status).toEqual(401)
    })
  })
})
