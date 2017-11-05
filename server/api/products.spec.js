/* global describe beforeEach it */

const {expect} = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Product = db.model('product');

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
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
    })

    xit('GET /api/products', () => {
      return request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].title).to.be.equal(title)
          expect(res.body[0].description).to.be.equal(description)
          expect(res.body[0].image).to.be.equal(image)
          expect(res.body[0].price).to.be.equal(price)
          expect(res.body[0].quantity).to.be.equal(quantity)
        })
    })
  }) // end describe('/api/prodcuts')
}) // end describe('Products routes')
