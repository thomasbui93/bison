import request from 'supertest'
import dataSync from '../../../src/bootstrap/data_sync'
import setupServer from '../../../src/bootstrap/server'
const secret = 12345

describe('secret authentication', () => {
  beforeAll(async () => {
    await dataSync()
  })

  describe('correct secret', () => {
    it('should return correct status', async () => {
      const app = setupServer()
      const res = await request(app)
        .post('/api/system-user')
        .set({
          secret 
        })
        .send({
          name: 'bison_app'
        })
      expect(res.status).toEqual(201)
      expect(res.body).toMatchObject({
        name: 'bison_app'
      })
    })
  })

  describe('incorrect secret', () => {
    it('should return 401 status on missing secret', async () => {
      const app = setupServer()
      const res = await request(app)
        .post('/api/system-user')
        .send({
          name: 'app1'
        })
      expect(res.status).toEqual(401)
    })

    it('should return 401 status on incorrect secret', async () => {
      const app = setupServer()
      const res = await request(app)
        .post('/api/system-user')
        .set({
          secret: '1' 
        })
        .send({
          name: 'app2'
        })
      expect(res.status).toEqual(401)
    })
  })
})
