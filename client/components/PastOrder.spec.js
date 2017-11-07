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
    pastOrder = shallow(<PastOrder order={[{id:1, status:'Processing', orderDetails: [{
      quantity: 2,
      price: 45
    }]}, {id:2, status:'Created'}, {id:2, status:'Processing'}]}/>)
  })

  it('renders all orders in the List', () => {
    expect(pastOrder.find('Subheader')).to.have.length(1)
  })

})
