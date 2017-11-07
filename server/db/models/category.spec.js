const {expect} = require('chai')
const db = require('../index')
const Category = db.model('category')

describe('Category model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Model', () => {
    describe('title', () => {
      let collection;
      const title = 'Beachwear'

      beforeEach(() => {
        return Category.create({title})

        .then(category => {
          collection = category
        })
      })

      it('tests model type', () => {
        expect(collection.title).to.be.equal('Beachwear')
      })
    })
  })
})
