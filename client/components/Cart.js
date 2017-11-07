import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { changeQuantityThunk, removeFromCartThunk } from '../store' //deleted cart import, wasn't sure why it was there before
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider'

const style = {
  marginRight: 20,
}
//changed
function Cart({cart, products, user, handleAmountChange, handleRemoveFromCart, history}) {
  
  const isCartLocation = history.location.pathname === '/cart'
  let totalPrice = 0
  let stringifiedCart = JSON.stringify(cart)
  if(!user.id){
  localStorage.setItem('cart', stringifiedCart)
  }
  if (products.length && cart.orderDetails.length) { 
    return (
      <div>
        {cart.orderDetails.map(orderDetail => {
          const item = products.find(product => product.id === orderDetail.productId)
          let canDecrement = orderDetail.quantity !== 1;
          let canIncrement = item.quantity !== orderDetail.quantity
          let tooMany = item.quantity < orderDetail.quantity
          const itemPrice = item.price * orderDetail.quantity

          if (tooMany) orderDetail.quantity = item.quantity;
         
          totalPrice += itemPrice
         
          return (
            <div key={item.id} className="container">
              <div className="shoppingcart">
              <img style={style} className='thumbnail' src={item.image} />
                  <div style={style} className='cartinfo'>
                    <Link to={`/item/${item.id}`}>{item.title}</Link>
                    <p>This much aloha: {orderDetail.quantity}</p>
                    <p>The price of aloha: '$'{itemPrice.toFixed(2)}</p>
                  </div>
                  <div>
                    <FloatingActionButton mini={true} style={style}>
                      <FontIcon className="fa fa-plus-square" aria-hidden="true"
                        onClick={() => { 
                          canIncrement && handleAmountChange(orderDetail, 'increment') 
                        }} />
                    </FloatingActionButton>
                    <FloatingActionButton mini={true} style={style}>
                      <FontIcon className="fa fa-minus-square"
                        aria-hidden="true"
                        onClick={() => { 
                          canDecrement && handleAmountChange(orderDetail, 'decrement') 
                        }} />
                    </FloatingActionButton>
                    <FloatingActionButton mini={true}style={style}>
                      <FontIcon className="fa fa-times-circle"
                      aria-hidden="true"
                      onClick={() => { 
                        handleRemoveFromCart(orderDetail) 
                      }} />
                    </FloatingActionButton>
                  </div>
              </div>
              <Divider className="dividerShoppingCart" inset={true} />
          </div>
          )
        })}
        <h4>Total: {totalPrice.toFixed(2)}</h4>
        {isCartLocation && <Link to={'/checkout'}><button>checkout</button></Link>}
      </div>
    )
  } else {
    return (
      <div>
        <h2>Surf is definitely not up</h2>
        <h4>add something to cart</h4>
      </div>
    )
  }

}

const mapStateToProps = (state) => ({
  cart: state.cart,
  user: state.user,
  products: state.products
})

const mapDispatchToProps = (dispatch) => ({
  handleAmountChange: (orderDetail, delta) => {
    dispatch(changeQuantityThunk(orderDetail, delta))
  },
  handleRemoveFromCart: (itemToRemove) => {
    dispatch(removeFromCartThunk(itemToRemove))
  }
})

const CartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart)
export default CartContainer
