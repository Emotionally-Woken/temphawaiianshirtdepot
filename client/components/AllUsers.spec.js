/* global describe beforeEach it */

import { expect } from 'chai'
import React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { AllUsers } from './AllUsers'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AllUsers', () => {
  let allUsers1, allUsers2, allUsersFail

  const fakeUsers2 = [{ id: 1, email: 'Barkley' }, { id: 3, email: 'Titan' }]

  const fakeUsers1 = [{ id: 1, email: 'Barkley' }]

  const me = { id: 3, email: 'Titan' }

  beforeEach(() => {
    allUsers2 = shallow(<AllUsers users={fakeUsers2} me={me} />)

    allUsers1 = shallow(<AllUsers users={fakeUsers2} me={me} />)

    allUsersFail = shallow(<AllUsers users={fakeUsers1} me={me} />)
  })

  it('renders each user in a list', () => {
    expect(allUsers2.find('ListItem')).to.have.length(2)
  })

  it('renders each user in a list', () => {
    expect(allUsers1.find('ListItem')).to.not.have.length(1)
  })

  it('renders each user in a list', () => {
    expect(allUsersFail.find('ListItem')).to.not.have.length(2)
  })
})
