const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Review = db.model('review')
import supertest from 'supertest';

describe('User routes', () => {
  let agent;
  beforeEach(() => {
    agent = supertest(app);
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const review = 'awesome shirt'

    beforeEach(() => {
      return Review.create({
        reviewContent: review,
        stars: 3,
        userId: 2,
        productId: 5
      })
    })

    it('GET /api/reviews', () => {
      return request(app)
        .get('/api/reviews')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].reviewContent).to.be.equal(review)
        })
    })

    it('POST /api/reviews', () => {
      return agent
        .post('/api/reviews')
        .send({
          id: 10,
          reviewContent: 'feeling hawaiian',
          stars: 5,
          userId: 2,
          productId: 5
        })
        .expect(201)
        .then(res => {
          const createdReview = res.body;
          return Review.findById(createdReview.id)
        })
        .then(foundReview => {
          expect(foundReview.reviewContent).to.be.equal('feeling hawaiian');
        })
    })
  })
})
