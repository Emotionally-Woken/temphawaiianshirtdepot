/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AdminOrders} from './AdminOrders'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AdminOrders', () => {
  let adminOrders

    adminOrders = shallow(<AdminOrders products={[{id:1},{id:2}]} />)

  it('renders the email in an h3', () => {
    expect(adminOrders.find('<TableBody>').children()).to.be.length(2)
  })
})
