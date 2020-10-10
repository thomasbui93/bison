import request from 'supertest'
import dataSync from '../../../src/bootstrap/data_sync'
import setupServer from '../../../src/bootstrap/server'

describe('remove user', () => {
  beforeAll(async () => {
    await dataSync()
  })

  describe('correct user data', () => {
    it('should return 200 status', async () => {
      const app = setupServer()
      await request(app)
        .post('/api/system-user')
        .send({
          name: 'bison-2'
        })
      const removal = await request(app)
      .delete('/api/system-user/bison-2')
      .send()
      expect(removal.status).toEqual(200)
    })
  })

  describe('incorrect user data', () => {
    it('should return 400', async () => {
      const app = setupServer()
      const removal = await request(app)
      .delete('/api/system-user/random-john')
      .send()
      expect(removal.status).toEqual(400)
    })
  })
})
