import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeQuantityThunk } from '../store/cart';//fetchItems
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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderUserAddress = this.renderUserAddress.bind(this)
    this.renderLoginOrSignUp = this.renderLoginOrSignUp.bind(this)

  }

  // componentWillMount() {
  //    // this.props.fetchItems();
  // }

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
  handlePay() {

  }

  renderUserAddress() {
    const { user } = this.props
    return (
      <div>
        <h3>user.name</h3>
        <p>user.shippingAddress</p>
        <p>`${user.city}, ${user.state} ${user.zip}`</p>
      </div>)
  }

  renderLoginOrSignUp() {
    return (
      <div id='checkoutShippingField'>
        <button>Login</button>
        <button>Sign Up</button>
        <button>Guest Check Out</button>
      </div>)
  }
  render() {
    const { cart, user, history } = this.props
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
          <button
            type="submit">
            Enter a coupon
                    </button>
        </form>
        <h1>
          Mahalo, {user.name || 'Surfer Dude!'}
        </h1>
        <Cart history={history}/>
        <button onClick={() => {/*stripe */ }} >Pay!</button>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
  //   products: state.products
});

const mapDispatchToProps = (dispatch) => ({
  // fetchItems: () => dispatch(fetchItems())
});
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);

//