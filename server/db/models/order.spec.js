const {expect} = require('chai')
const db = require('../db')
const Order = db.model('order')

describe('Ordermodel', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Initial tests', () => {
    describe('initial status', () => {
      let testOrder

      beforeEach(() => {
        return Order.create({status: 'Created'}).then(order => {
          testOrder = order
        })
      })

      it('will have status of created', () => {
        expect(testOrder.getDataValue('status')).to.be.equal('Created')
      })
    })
  })
})
