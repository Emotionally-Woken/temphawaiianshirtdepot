import React from 'react';
import { connect } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
//this is f/collections branch
class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });

  render() {
    console.log("yoooooooo", this.props.collectionsArray)
    const style = {
      marginRight: 20,
    }
    let collectionItems
    let collectionTitles
    let isAdmin
    const user = this.props.user
    collectionItems = this.props.collectionsArray
    console.log("beeeeee", this.props.collectionsArray)
    if (collectionItems) {
      collectionTitles = collectionItems.map(collection => collection.title)
    }
    if (user) {
      isAdmin = user.id && user.isAdmin
    }

    return (
      <div>

        <IconButton
          onClick={this.handleToggle}
        ><i className="material-icons">menu</i>
        </IconButton>
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({ open })}
        >
        {
          isAdmin &&
          <Link to={'/createCollection'} >
            <FloatingActionButton mini={true} secondary={true} style={style}>
              <ContentAdd />
            </FloatingActionButton>
          </Link>
        }
          {
            collectionTitles.map((collection, index) => (
              <NavLink key={index} to={`/collections/${collection}`}>
                <MenuItem onClick={this.handleClose}>{`${collection}`}</MenuItem>
              </NavLink>
            ))
          }

        </Drawer>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    collectionsArray: state.categories,
    user: state.user
  }
}

export default connect(mapState, null)(Sidebar)
