import React, { Component } from 'react'

const isEmpty = (prop) => (
  prop === null ||
  prop === undefined ||
  (prop.hasOwnProperty('length') && prop.length === 0) ||
  (prop.constructor === Object && Object.keys(prop).length === 0)
);

const LoaderHOC = (propName) => (WrappedComponent) => {
  return class Loader extends Component {
    render() {
      return isEmpty(this.props[propName]) ? <div className='loader'>loading...</div> : <WrappedComponent {...this.props} />
    }
  }

}

export default LoaderHOC
