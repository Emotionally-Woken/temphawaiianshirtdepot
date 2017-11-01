/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Main} from './main'
export {default as UserHome} from './User-home'
export {default as AllProducts} from './All-products'
export {default as ProductItem} from './Product-item'
export {Login, Signup} from './Auth-form'
