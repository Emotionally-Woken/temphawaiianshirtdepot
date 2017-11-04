import { expect } from 'chai'
import React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Collections } from './Collections'

//npm test to run the tests
//this is f/collections branch
const adapter = new Adapter()
enzyme.configure({ adapter })

describe('Collections', () => {
  let collections, collections1, collectionsFail

  let products = [{ description: "hawaiian", image: "this.url", category: ['Performance'] }, { description: "lawaiian", image: "lhis.url", category: ['Performance'] }]

  let products1 = [{ description: "hawaiian", image: "this.url", category: ['Performance'] }]

  let productsFail = [{ description: "hawaiian", image: "this.url", category: ['Performance'] }]

  beforeEach(() => {
    collections = shallow(<Collections products={products} collectionType={"Performance"} />)
    collections1 = shallow(<Collections products={products1} collectionType={"Performance"} />)
    collectionsFail = shallow(<Collections products={productsFail} collectionType={"Performance"} />)
  })

  xit('renders a collection', () => {
    expect(collections.find('GridTile')).to.have.length(2)
  })
  xit('renders a collection', () => {
    expect(collections1.find('GridTile')).to.not.have.length(1)
  })
  xit('renders a collection', () => {
    expect(collectionsFail.find('GridTile')).to.not.have.length(2)
  })

})
