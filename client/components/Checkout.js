import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeQuantityThunk, createOrderThunk } from '../store/';//fetchItems
import Cart from './Cart'
//----------------------------
// user signup-component 
//changed
//-------------------------
class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPrice: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderUserAddress = this.renderUserAddress.bind(this)
    this.renderLoginOrSignUp = this.renderLoginOrSignUp.bind(this)

  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({
      [event.target.price]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.history.push(`/order/${id}`);

  }

  renderUserAddress() {
    const { user } = this.props
    return (
      <div>
        <p>{user.shippingAddress}</p>
        <p>{`${user.city}, ${user.state} ${user.zip}`}</p>
      </div>)
  }

  renderLoginOrSignUp() {
    return (
      <div id='checkoutShippingField'>
        <h4>Login</h4>
        <h4>Or Sign up</h4>
        <button>No mahalo, guest check out</button>
      </div>)
  }
  render() {
    const { cart, user, history, handleClickPay } = this.props

    return (
      <div>
        {(user.id && this.renderUserAddress()) || this.renderLoginOrSignUp()}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="checkoutInputCoupon">Coupon</label>
            <input
              name="coupon"
              type="text"
              className="form-control"
              value={this.state.coupon}
              onChange={this.handleChange} />
          </div>
        </form>
        <h1>
          Mahalo, {user.firstName || 'Surfer Dude!'}
        </h1>
        <Cart history={history} />
        <button 
          disabled={!cart.orderDetails.length} 
          onClick={(e) => {
            e.preventDefault()
            cart.status = 'Created'
            handleClickPay(cart)
          }} >Pay!</button>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
  cart: state.cart
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleClickPay: (cart) => {
    dispatch(createOrderThunk(cart))
    ownProps.history.push('/home')
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);

//