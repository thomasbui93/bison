import { v4 as uuidv4 } from 'uuid'
import request from 'supertest'
import dataSync from '../../../src/bootstrap/data_sync'
import setupServer from '../../../src/bootstrap/server'
import SystemUser from '../../../src/features/system/SystemUser'

const secret = 12345

describe('verify user and token', () => {
  beforeAll(async () => {
    await dataSync()
  })

  describe('correct credential', () => {
    it('should return 200 status', async () => {
      const app = setupServer()
      const res = await request(app)
        .post('/api/system-user')
        .set({
          secret 
        })
        .send({
          name: 'bison-2'
        })
      const { name, token } = res.body
      const authentication = await request(app)
      .post('/api/system-user/verify')
      .set({
        secret 
      })
      .send({
        name,
        token
      })
      expect(authentication.status).toEqual(200)
    })
  })

  describe('incorrect credential', () => {
    it('should return 401 status when token is expired', async () => {
      const app = setupServer()
      const res = await request(app)
        .post('/api/system-user')
        .set({
          secret 
        })
        .send({
          name: 'bison-3'
        })
      const { name, token } = res.body
      const user = await SystemUser.findOne({
        where: {
          token,
        }
      })
      await user.update({
        expiry: new Date()
      })
      const authentication = await request(app)
      .post('/api/system-user/verify')
      .set({
        secret 
      })
      .send({
        name,
        token
      })
      expect(authentication.status).toEqual(401)
    })

    it('should return 400 status when token is invalid format', async () => {
      const app = setupServer()
      const authentication = await request(app)
      .post('/api/system-user/verify')
      .set({
        secret 
      })
      .send({
        name: 'xyz',
        token: 'xxx'
      })
      expect(authentication.status).toEqual(400)
    })

    it('should return 401 status when token is invalid value', async () => {
      const app = setupServer()
      const authentication = await request(app)
      .post('/api/system-user/verify')
      .set({
        secret 
      })
      .send({
        name: 'xyz',
        token: uuidv4()
      })
      expect(authentication.status).toEqual(401)
    })
  })
})
