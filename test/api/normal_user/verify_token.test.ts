import request from 'supertest'
import dataSync from '../../../src/bootstrap/data_sync'
import setupServer from '../../../src/bootstrap/server'
import { passwordCheck } from '../../../src/features/regular/authenticate'
import createUser from '../../../src/features/regular/create_user'

describe('verify token', () => {
  beforeAll(async () => {
    await dataSync()
    await createUser(
      'k@bui.com',
      '123456'
    )
  })

  describe('valid token', () => {
    it('should return ok', async () => {
      const token = await passwordCheck('k@bui.com', '123456')
      const app = setupServer()
      const res = await request(app)
        .post('/api/normal-user/verify')
        .send({
          token
        })
      expect(res.status).toEqual(200)
    })
  })

  describe('invalid token', () => {
    it('should return error', async () => {
      const app = setupServer()
      const res = await request(app)
        .post('/api/normal-user/verify')
        .send({
          token: 'xxx'
        })
      expect(res.status).toEqual(400)
    })
  })
})
