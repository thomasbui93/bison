import request from 'supertest'
import dataSync from '../../../src/bootstrap/data_sync'
import setupServer from '../../../src/bootstrap/server'
import createUser from '../../../src/features/regular/create_user'
const secret = 12345


describe('user_deactivation', () => {
  beforeAll(async () => {
    await dataSync()
  })

  describe('single deactivation', () => {
    beforeAll(async () => {
      await createUser(
        'k@bui.com',
        '123456'
      )
    })

    describe('valid email', () => {
      it('should return ok status', async () => {
        const app = setupServer()
        const res = await request(app)
          .post('/internal/normal-user/deactivate')
          .set({
            secret 
          })
          .send({
            email: 'k@bui.com'
          })
        expect(res.status).toBe(201)
      })
    })

    describe('not existing email', () => {
      it('should return bad request status', async () => {
        const app = setupServer()
        const res = await request(app)
          .post('/internal/normal-user/deactivate')
          .set({
            secret 
          })
          .send({
            email: 'k1@bui.com'
          })
        expect(res.status).toBe(400)
      })
    })

    describe('invalid email', () => {
      it('should return bad request status', async () => {
        const app = setupServer()
        const res = await request(app)
          .post('/internal/normal-user/deactivate')
          .set({
            secret 
          })
          .send({
            email: 'xxx'
          })
        expect(res.status).toBe(400)
      })
    })
  })

  describe('single deactivation', () => {
    beforeAll(async () => {
      await createUser(
        'k1@bui.com',
        '123456'
      )
      await createUser(
        'k2@bui.com',
        '123456'
      )
      await createUser(
        'k3@bui.com',
        '123456'
      )
      await createUser(
        'k4@bui.com',
        '123456'
      )
      await createUser(
        'k5@bui.com',
        '123456'
      )
    })

    describe('single valid email', () => {
      it('should return ok status', async () => {
        const app = setupServer()
        const res = await request(app)
          .post('/internal/normal-user/bulk/deactivate')
          .set({
            secret 
          })
          .send({
            emails: 'k1@bui.com'
          })
        expect(res.status).toBe(201)
        expect(res.body).toMatchObject({
          affected: 1
        })
      })
    })

    describe('multiple valid emails', () => {
      it('should return ok status', async () => {
        const app = setupServer()
        const res = await request(app)
          .post('/internal/normal-user/bulk/deactivate')
          .set({
            secret 
          })
          .send({
            emails: 'k2@bui.com k3@bui.com'
          })
        expect(res.status).toBe(201)
        expect(res.body).toMatchObject({
          affected: 2
        })
      })
    })

    describe('mixed emails', () => {
      it('should return ok status', async () => {
        const app = setupServer()
        const res = await request(app)
          .post('/internal/normal-user/bulk/deactivate')
          .set({
            secret 
          })
          .send({
            emails: 'k4@bui.com k5@bui.com xxx'
          })
        expect(res.status).toBe(201)
        expect(res.body).toMatchObject({
          affected: 2
        })
      })
    })
  })
})
