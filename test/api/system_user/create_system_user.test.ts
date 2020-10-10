import request from 'supertest'
import dataSync from '../../../src/bootstrap/data_sync'
import setupServer from '../../../src/bootstrap/server'
const secret = 12345

describe('create system user', () => {
  beforeAll(async () => {
    await dataSync()
  })

  it('should create a new system user', async () => {
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

  it('should not create a new system user with empty name', async () => {
    const app = setupServer()
    const res = await request(app)
      .post('/api/system-user')
      .set({
        secret 
      })
      .send({
        name: ''
      })
    expect(res.status).toEqual(400)
  })

  it('should not create a new system user with the same name', async () => {
    const app = setupServer()
    const res = await request(app)
      .post('/api/system-user')
      .set({
        secret 
      })
      .send({
        name: 'bison'
      })
    expect(res.status).toEqual(201)
    const resDup = await request(app)
    .post('/api/system-user')
    .set({
      secret 
    })
    .send({
      name: 'bison'
    })
    expect(resDup.status).toEqual(400)
  })
})
