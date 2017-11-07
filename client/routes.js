import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'

import { Main, Login, Signup, UserHome, AllProducts, Collections, SingleProduct, Cart, ReviewForm, Checkout, SingleOrder, AddNewProduct, EditProduct, AdminOrders, AddNewCollection, AdminProducts} from './components'
import { me, fetchAllProducts, fetchAllReviews, fetchSelectOrders, fetchAllCategories } from './store'
//this is f/collections branch
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props
    console.log('isLoggedIn', isLoggedIn )
    console.log('isLoggedIn', isAdmin )
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

                  {
                    isAdmin &&
                    <Switch>
                      <Route path="/admin/orders" component={AdminOrders} />
                      <Route path="/admin/products" component={AdminProducts} />
                      <Route path="/createProduct" component={AddNewProduct} />
                      <Route path="/editProduct/:productId" component={EditProduct} />
                      <Route path="/createCollection" component={AddNewCollection} />
                    </Switch>
                  }
                </Switch>
              }
              <Route component={AllProducts} />
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
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(fetchAllProducts())
      dispatch(fetchAllReviews())
      dispatch(fetchAllCategories())
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
