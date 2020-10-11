import request from 'supertest'
import dataSync from '../../../src/bootstrap/data_sync'
import setupServer from '../../../src/bootstrap/server'
import createUser from '../../../src/features/regular/create_user'

describe('change password', () => {
  const app = setupServer()
  beforeAll(async () => {
    await dataSync()
    await createUser(
      'k@bui.com',
      '123456'
    )
  })

  describe('valid email and password', () => {
    it('should update new password', async () => {
      const res = await request(app)
        .post('/api/normal-user/change-password')
        .send({
          email: 'k@bui.com',
          oldPassword: '123456',
          newPassword: '1234567'
        })
      expect(res.status).toEqual(200)
      const loginRes = await request(app)
        .post('/api/normal-user/login')
        .send({
          email: 'k@bui.com',
          password: '1234567'
        })
      expect(loginRes.status).toEqual(200)
    })
  })

  describe('wrong email and password', () => {
    it('should throw 401 error with wrong password', async () => {
      const res = await request(app)
        .post('/api/normal-user/change-password')
        .send({
          email: 'k@bui.com',
          oldPassword: 'xxxxxx',
          newPassword: '1234567'
        })
      expect(res.status).toEqual(401)
    })

    it('should throw 401 error with wrong email', async () => {
      const res = await request(app)
        .post('/api/normal-user/change-password')
        .send({
          email: 'kxxx@bui.com',
          oldPassword: 'xxxxxx',
          newPassword: '1234567'
        })
      expect(res.status).toEqual(401)
    })

    it('should throw 400 error with validation of input is thrown', async () => {
      const res = await request(app)
        .post('/api/normal-user/change-password')
        .send({
          email: 'kxxx',
          oldPassword: 'xxxxxx'
        })
      expect(res.status).toEqual(400)
    })
  })
})
