/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Review = db.model('review')

describe('Review model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('review content length validation', () => {
    let review

    beforeEach(() => {
      review = Review.build({
        reviewContent: 'short review that is less than 10 words'
      })
    })

    xit('throw an validation error when review is less than 10 words', () => {
      return review.validate()
        .then(() => {
          throw new Error('validation should fail when content is less than 10 words')
        }, (result) => {
          expect(result).to.be.an.instanceOf(Error);
        })
    })
  })
})
