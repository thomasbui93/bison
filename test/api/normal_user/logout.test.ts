import request from 'supertest'
import dataSync from '../../../src/bootstrap/data_sync'
import setupServer from '../../../src/bootstrap/server'
import { passwordCheck } from '../../../src/features/regular/authenticate'
import createUser from '../../../src/features/regular/create_user'

describe('logout action', () => {
  beforeAll(async () => {
    await dataSync()
    await createUser(
      'khoa@bui.com',
      '123456'
    )
  })

  describe('remove all related tokens', () => {
    it('should return number of tokens', async () => {
      await passwordCheck('khoa@bui.com', '123456')
      const app = setupServer()
      const res = await request(app)
        .post('/api/normal-user/logout')
        .send({
          email: 'khoa@bui.com'
        })
      expect(res.status).toEqual(200)
      expect(res.body).toHaveProperty('tokens')
      expect(res.body.tokens).toMatchObject({
        'removed': 1
      })
    })
  })
})
