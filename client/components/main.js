import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import Sidebar from './Drawer'
import SearchBar from './SearchBar';

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 3,
    };
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = (event, index, value) => this.setState({value});

  render(){
    const {children, handleClick, isLoggedIn, products, history} = this.props

    // let searchBarData;
    // const currentPath = history.location.pathname;
    // const collectionType = currentPath.slice(13);

    // if (currentPath === '/' || currentPath === '/collections' ) {
    //   const allProductData = products;
    //   searchBarData = allProductData;
    // }
    // if (currentPath === `/collections/${collectionType}`) {
    //   const collectionData = products.filter(product => product.category[0] === collectionType);
    //   searchBarData = collectionData;
    // }
    // products={searchBarData} history={history}
    return (
      <div>
        <Toolbar>

          <ToolbarGroup firstChild={true}>
            <Sidebar />
          </ToolbarGroup>

          <SearchBar />

          <ToolbarGroup>
            <Link to='/' style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)'}}>
              <ToolbarTitle text="HAWAIIAN - HUT 🍹" />
            </Link>
            <FontIcon className="muidocs-icon-custom-sort" />
          </ToolbarGroup>

          <ToolbarGroup>
          {
            isLoggedIn
              ? <div>
                {/* The navbar will show these links after you log in */}
                <Link to="/home"> <RaisedButton label="Home"/></Link>
                <a href="#" onClick={handleClick}><RaisedButton label="Logout"/></a>
              </div>
              : <div>
                {/* The navbar will show these links before you log in */}
                <Link to="/login"> <RaisedButton label="Login"/></Link>
                <Link to="/signup"> <RaisedButton label="Sign Up"/></Link>
              </div>
          }

            <IconButton iconClassName="muidocs-icon-custom-github" />
            <Link to={'/cart'}><i className="material-icons">add_shopping_cart</i></Link>

          </ToolbarGroup>

        </Toolbar>

        <hr />
        {children}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    products: state.products
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
