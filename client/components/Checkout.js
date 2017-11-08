import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeQuantityThunk, createOrderThunk, createCartThunk } from '../store/';//fetchItems
import Cart from './Cart'
import RaisedButton from 'material-ui/RaisedButton';


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
      <div className='useraddress'>
        <p>{`${user.shippingAddress}, ${user.city}, ${user.state} ${user.zip}`}</p>
      </div>)
  }

  renderLoginOrSignUp() {
    return (
      <div id='checkoutShippingField'>
        <RaisedButton label='guest checkout' secondary={true} />
      </div>)
  }
  render() {
    const { cart, user, history, handleClickPay } = this.props

    return (
      <div>
        <h1>
          Mahalo, {user.firstName || 'Surfer Dude!'}
        </h1>
        <div>
        <Cart history={history} />
        </div>
        <div className='checkoutbuttons'>
        <RaisedButton
          label='pay'
          primary={true}
          disabled={!cart.orderDetails.length} 
          onClick={(event) => {
            event.preventDefault()
            cart.status = 'Created'
            handleClickPay(cart)
          }} />
        {(user.id && this.renderUserAddress()) || this.renderLoginOrSignUp()}
        </div>

      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
  cart: state.cart
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleClickPay: (cart, user) => {
    dispatch(createOrderThunk(cart))
    dispatch(createCartThunk(user))
    ownProps.history.push('/home')
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);

