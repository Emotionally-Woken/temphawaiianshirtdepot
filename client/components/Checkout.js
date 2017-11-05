import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cart from './Cart'
//----------------------------
// user signup-component 
//changed
//-------------------------
class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coupon: '',
      productId: 1,
      price: 3.0,
      title: "wonderful title"
    };
    this.handleChange = this.handleChange.bind(this);
    this.couponSubmit = this.couponSubmit.bind(this);
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

  couponSubmit(event) {
    event.preventDefault()
    const guest = !this.props.isLoggedIn
    let checkList = {
      email: (guest ? event.target.email.value : this.props.currentUser.email),
      address: event.target.address.value,
      city: event.target.city.value,
      state: event.target.state.value,
      zipCode: event.target.zipcode.value,
      userId: (!guest ? this.props.currentUser.id : null),
      status: 'CREATED',
      total: this.props.cart.total
    }
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
    const { currentUser, isLoggedIn } = this.props
    return (
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <div>
              <span>Checkout {
                isLoggedIn ? currentUser.username : 'Guest'}</span>
            </div>
            <Cart history={history} />
          </div>
        </div>
        {this.checkoutForm()}
      </div>
    )
  }

  checkoutForm() {
    const { cart, user } = this.props
    console.log(this.props)
    return (
      <div>
        {(user.id && this.renderUserAddress()) || this.renderLoginOrSignUp()}
        <form onSubmit={this.couponSubmit}>

          <div className="form-group">
            <label htmlFor="checkoutInputCoupon">Coupon</label>
            <input
              name="coupon"
              type="text"
              className="form-control"
              value={this.state.coupon}
              onChange={this.handleChange} />
          </div>
          <button
            type="submit">
            Enter a coupon
          </button>
        </form>

        <form onSubmit={this.handleSubmit}>
          {
            !this.props.isLoggedIn && (<label>
              Email:
            <input type="text" name="email" required />
            </label>)
          }
          <label>
            Street Address:
          <input type="text" name="address" required />
          </label>
          <label>
            City:
          <input type="text" name="city" required />
          </label>
          <label>
            State:
          <input type="text" name="state" required />
          </label>
          <label>
            zipCode:
          <input type="text" name="zipcode" required />
          </label>
          <input type="submit" value="Submit" required />
        </form>
        <h1>
          Mahalo, {user.firstName || 'Surfer Dude!'}
        </h1>
        <button disabled={!cart.length} onClick={() => {/*stripe */ }} >Pay!</button>
      </div>
    );
  }

}
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    cart: state.cart,
    isLoggedIn: !!currentUser.id
    //   products: state.products
  }

}
const mapDispatchToProps = (dispatch) => ({
  // fetchItems: () => dispatch(fetchItems())
});
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);

//