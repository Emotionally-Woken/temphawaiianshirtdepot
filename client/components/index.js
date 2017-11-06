/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Main} from './Main'
export {default as UserHome} from './UserHome'
export {default as AllProducts} from './AllProducts'
export {default as Collections} from './Collections'
export {default as ProductItem} from './ProductItem'
export {default as SingleProduct} from './SingleProduct'
export {default as ReviewForm} from './ReviewForm'
export {default as AddNewProduct} from './AddNewProduct'
export {default as EditProduct} from './EditProduct'
export {Login, Signup} from './AuthForm'
export {default as Cart } from './Cart'
export { default as Checkout } from './Checkout'
export { default as SingleOrder } from './SingleOrder'
export { default as AdminOrders } from './AdminOrders'
