const request = require('supertest')
const app = require('../../server/index')
const axios = require('axios')

describe('GET /', () => {
  it('serves the index/html', (done) => {
    request(app)
      .get('/')
      .expect('Content-Type', /text\/html/)
      .expect('Content-Length', '627')
      .expect(200, done)
  })
})

describe('POST /api/data', () => {
  it('responds with 400 if no request body is attached', (done) => {
    request(app)
      .post('/api/data')
      .expect(400, done)
  })

  it('responds with 406 if an invalid type is requested', (done) => {
    request(app)
      .post('/api/data')
      .send({test: 'test'})
      .set('Accept', 'application/ogg')
      .expect(406, done)
  })

  it('responds with 400 if bad json data is passed', (done) => {
    request(app)
      .post('/api/data')
      .send({test: 'test'})
      .set('Accept', 'application/json')
      .expect(400, done)
  })

  it('responds with text if Accept is set to text', (done) => {
    axios.get('https://randomuser.me/api/?results=50')
      .then(res => res.data)
      .then(data => {
        request(app)
          .post('/api/data')
          .send(data)
          .set('Accept', 'text/plain')
          .expect('Content-Type', /text/)
          .expect(200, done)
      })
      .catch(err => {
        throw new Error('couldnt get user data')
      })

  })
  it('responds with xml if Accept is set to xml', (done) => {
    axios.get('https://randomuser.me/api/?results=50')
      .then(res => res.data)
      .then(data => {
        request(app)
          .post('/api/data')
          .send(data)
          .set('Accept', 'application/xml')
          .expect('Content-Type', /xml/)
          .expect(200, done)
      })
      .catch(err => {
        throw new Error('couldnt get user data')
      })
  })
  it('responds with json if Accept is set to json', (done) => {
    axios.get('https://randomuser.me/api/?results=50')
      .then(res => res.data)
      .then(data => {
        request(app)
          .post('/api/data')
          .send(data)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, done)
      })
      .catch(err => {
        throw new Error('couldnt get user data')
      })
  })
})

