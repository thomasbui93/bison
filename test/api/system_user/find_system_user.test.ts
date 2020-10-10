import request from 'supertest'
import dataSync from '../../../src/bootstrap/data_sync'
import setupServer from '../../../src/bootstrap/server'
import createUser from '../../../src/features/system/create_user'
const secret = 12345

describe('create system user', () => {
  beforeAll(async () => {
    await dataSync()
    await createUser('bison1')
    await createUser('bison2')
  })

  describe('both params are omitted', () => {
    it('should fetch a system users', async () => {
      const app = setupServer()
      const res = await request(app)
        .get('/api/system-user')
        .set({
          secret 
        })
        .send()
      expect(res.status).toEqual(200)
      expect(res.body).toHaveProperty('users')
      expect(res.body).toHaveProperty('page')
      expect(res.body).toHaveProperty('size')
    })
  })

  describe('one of params is omitted', () => {
    it('should fetch a system users with only page parameter', async () => {
      const app = setupServer()
      const res = await request(app)
        .get('/api/system-user?page=1')
        .set({
          secret 
        })
        .send()
      expect(res.status).toEqual(200)
      expect(res.body).toHaveProperty('users')
      expect(res.body).toHaveProperty('page')
      expect(res.body).toHaveProperty('size')
    })

    it('should fetch a system users with only page parameter', async () => {
      const app = setupServer()
      const res = await request(app)
        .get('/api/system-user?size=10')
        .set({
          secret 
        })
        .send()
      expect(res.status).toEqual(200)
      expect(res.body).toHaveProperty('users')
      expect(res.body).toHaveProperty('page')
      expect(res.body).toHaveProperty('size')
    })
  })

  describe('wrong params are passed', () => {
    it('should fetch a system users with corrupted size parameter', async () => {
      const app = setupServer()
      const res = await request(app)
        .get('/api/system-user?page=0&size=-1')
        .set({
          secret 
        })
        .send()
      expect(res.status).toEqual(200)
      expect(res.body).toHaveProperty('users')
      expect(res.body).toHaveProperty('page')
      expect(res.body).toHaveProperty('size')
    })

    it('should fetch a system users with corrupted page parameter', async () => {
      const app = setupServer()
      const res = await request(app)
        .get('/api/system-user?page=-1&size=0')
        .set({
          secret 
        })
        .send()
      expect(res.status).toEqual(200)
      expect(res.body).toHaveProperty('users')
      expect(res.body).toHaveProperty('page')
      expect(res.body).toHaveProperty('size')
    })
  })
})
