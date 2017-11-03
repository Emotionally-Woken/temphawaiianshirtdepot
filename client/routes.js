import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Router} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'

import {Main, Login, Signup, UserHome, AllProducts, Collections, SingleProduct, Cart, ReviewForm, Checkout, SingleOrder} from './components'
import {me, fetchAllProducts, fetchAllReviews, fetchSelectOrders} from './store'
//this is f/collections branch
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    const {isLoggedIn, products} = this.props
    //console.log("thisisProducts: ", products)

    return (
      <Router history={history}>
        <Main history={history}>
        <div className='container'>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route exact path="/" component={AllProducts} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/collections" component={AllProducts} />
            <Route path="/collections/:category" component={Collections} />
            <Route path="/item/:productId" component={SingleProduct} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/cart" component={Cart} />
            {
              isLoggedIn &&
                <Switch>
                  <Route path="/home" component={UserHome} />
                  <Route path="/order/:orderId" component={SingleOrder} />
                  <Route path="/reviews" component={ReviewForm} />
                </Switch>
            }
            <Route component={AllProducts}/>
          </Switch>
        </div>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
      dispatch(fetchAllProducts())
      dispatch(fetchAllReviews())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
