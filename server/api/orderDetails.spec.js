const { expect } = require('chai');
const db = require('../db');
const app = require('../index');
const OrderDetail = db.model('orderDetail');
const Product = db.model('product')
const Order = db.model('order')
const User = db.model('user')
import supertest from 'supertest';

describe('Order Details routes', () => {
  let agent;
  beforeEach(() => {
    agent = supertest(app)
    return db.sync({force: true})
  })

  describe('/api/orderDetail/', () => {

    beforeEach(() => {
      return Product.bulkCreate([{
        quantity: 3,
        price: 5.00,
        description: 'good shirt',
        title: 'Aloha',
        image: 'www.pic.com/1.jpg'
      }, {
        quantity: 3,
        price: 5.00,
        description: 'bad shirt',
        title: 'Blaloha',
        image: 'www.pic.com/2.jpg'
      }])
    })

    beforeEach(() => {
      return User.create({
        email: 'b@sample.com'
      })
    })

    beforeEach(() => {
      return Order.bulkCreate([{
          status: 'Active Cart',
          userId: 1
        }, {
          status: 'Active Cart',
          userId: 1
        }, {
          status: 'Active Cart',
          userId: 1
        }
      ])
    })

    beforeEach(() => {
      return OrderDetail.create({
        quantity: 1,
        productId: 1,
        orderId: 1,
        price: 90
      })
    })

    it('POST /api/orderDetail/', () => {
      return agent
      .post('/api/orderDetail')
      .send({
        quantity: 1,
        productId: 1,
        orderId: 2,
        price: 25
      })
      .expect(201)
      .then(() => {
        return OrderDetail.find({
          where: {
            productId: 1,
            $and: {
              orderId: 2
            }
          }
        })
        .then(foundOrderDetail => {
          expect(foundOrderDetail).to.be.an('object')
          expect(foundOrderDetail.price).to.equal('25.00')
        })
      })
    })

    it('POST /api/orderDetail/localCart', () => {
      const fakeCart = {
          id: 3, orderDetails: [{
                  quantity: 1,
                  productId: 1,
                  orderId: 3,
                  price: 5
                }, {
                  quantity: 3,
                  productId: 2,
                  orderId: 3,
                  price: 5
                }
      ]}
      return agent
      .post('/api/orderDetail/localCart')
      .send(fakeCart)
      .expect(201)
      .then(() => {
        return OrderDetail.find({
          where: {
            productId: 2,
            $and: {
              orderId: 3
            }
          }
        })
        .then(foundOrderDetail => {
          expect(foundOrderDetail.quantity).to.equal(3)
        })
      })
    })

    it('PUT /api/orderDetail/', () => {
      return agent
      .put(`/api/orderDetail/${1}/${1}`)
      .send({
        quantity: 2
      })
      .expect(200)
      .then(() => {
        return OrderDetail.find({
          where: {
            productId: 1,
            $and: {
              orderId: 1
            }
          }
        })
        .then(foundOrderDetail => {
          expect(foundOrderDetail.quantity).to.equal(2)
        })
      })
    })


  })


})
