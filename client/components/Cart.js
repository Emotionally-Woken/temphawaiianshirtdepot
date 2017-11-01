import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { changeQuantityAction, removeFromCartAction } from '../store' //deleted cart import, wasn't sure why it was there before
import Divider from 'material-ui/Divider'

function Cart(props) {
  const { cart, products, handleAmountChange, handleRemoveFromCart } = props;
  console.log(cart)
  if(cart.length && products.length) {
    return (
      <div>
        {cart.map(orderDetail => {
          const item = products.find(item => item.id === orderDetail.productId)
          let canDecrement = orderDetail.quantity !== 1;
          let canIncrement = item.quantity !== orderDetail.quantity
          return (<div  key={item.id} className='container'>
                <div className='shoppingcart'>
                  <img src={item.image} />
                  <Link to={`/item/${item.id}`}>{item.title}</Link>
                  <p>{orderDetail.quantity}</p>
                  <p>Price: '$'{item.price * orderDetail.quantity}</p>
                  <i className="fa fa-plus-square" aria-hidden="true"
                  onClick={() => {canIncrement && handleAmountChange(orderDetail, 'increment')}} />
                  <i className="fa fa-minus-square"
                    aria-hidden="true"
                    onClick={() => {canDecrement && handleAmountChange(orderDetail, 'decrement')}} />
                  <i className="fa fa-times-circle"
                    aria-hidden="true"
                    onClick={()=>{handleRemoveFromCart(orderDetail)}}/>
                  </div>
                <Divider className='dividerShoppingCart' inset={true} />
              </div>
        )
        })}
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
  products: state.products
})

const mapDispatchToProps = (dispatch) => ({
  handleAmountChange: (orderDetail, delta) => {
    dispatch(changeQuantityAction(orderDetail, delta))
  },
  handleRemoveFromCart: (itemToRemove) => {
    dispatch(removeFromCartAction(itemToRemove))
  }
})

const CartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart)
export default CartContainer
