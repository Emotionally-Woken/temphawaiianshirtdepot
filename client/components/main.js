import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import Sidebar from './drawer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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
    const {children, handleClick, isLoggedIn} = this.props

    return (
      <div>
        <MuiThemeProvider>
        <Toolbar>

          <ToolbarGroup firstChild={true}>
            <Sidebar />
          </ToolbarGroup>

          <ToolbarGroup>
            <ToolbarTitle text="HAWAIIAN HUT" />
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
            <i className="material-icons">add_shopping_cart</i>

          </ToolbarGroup>

        </Toolbar>
        </MuiThemeProvider>

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
    isLoggedIn: !!state.user.id
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


// <nav>
//           {
//             isLoggedIn
//               ? <div>
//                 {/* The navbar will show these links after you log in */}
//                 <Link to="/home">Home</Link>
//                 <a href="#" onClick={handleClick}>Logout</a>
//               </div>
//               : <div>
//                 {/* The navbar will show these links before you log in */}
//                 <Link to="/login">Login</Link>
//                 <Link to="/signup">Sign Up</Link>
//               </div>
//           }
//         </nav>
