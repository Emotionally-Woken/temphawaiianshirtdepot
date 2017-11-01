/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('sale', () => {
      let shirt;

      const title = 'Marvelous Maui';
      const description = 'This shirt is as marvelous as Maui, it as if your in Maui.';
      const image = 'http://fishwolfeboro.com/wp-content/uploads/2017/10/men-hawaiian-shirts-5xl-with-regard-to-christmas-aloha-shirt-150x150.gif';
      const price = 100;
      const quantity = 10;

      beforeEach(() => {
        return Product.create({
          title,
          description,
          image,
          price,
          quantity
        })
          .then(product => {
            shirt = product;
          })
      })

      it('returns 50% off sale price', () => {
        expect(shirt.sale(0.5)).to.be.equal(50)
      })

      it('returns 25% off sale price', () => {
        expect(shirt.sale(0.25)).to.be.equal(75)
      })
    }) // end describe('sale')
  }) // end describe('instanceMethods')
}) // end describe('Product model')
