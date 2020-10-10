import request from 'supertest'
import dataSync from '../../../src/bootstrap/data_sync'
import setupServer from '../../../src/bootstrap/server'

describe('health check', () => {
  beforeAll(async () => {
    await dataSync()
  })

  it('should fetch health check', async () => {
    const app = setupServer()
    const res = await request(app)
      .get('/z/ping')
      .send()
    expect(res.status).toEqual(200)
    expect(res.body.length).toEqual(2)
    expect(res.body[0]).toMatchObject({
      name: 'sql',
      status: true
    })
    expect(res.body[1]).toMatchObject({
      name: 'redis',
      status: true
    })
  })
})
