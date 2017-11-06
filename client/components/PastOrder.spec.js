/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {PastOrder} from './PastOrder'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('PastOrder', () => {
  let pastOrder

  beforeEach(() => {
    pastOrder = shallow(<pastOrder order={[{id:1, status:'Processing', orderDetails: [{
      quantity: 2,
      price: 45
    }]}, {id:2, status:'Created'}, {id:2, status:'Processing'}]}/>)
  })

  xit('renders all orders in the List', () => {
    expect(pastOrder.find('List')).to.have.length(2)
  })

  xit('calculate correct total cost', () => {
    expect(pastOrder.contains('Total Cost: $90')).to.equal(true)
  })
})
