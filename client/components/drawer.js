import React from 'react';
import { connect } from 'react-redux'

import { NavLink } from 'react-router-dom'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
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
    //console.log("isthisAnArray", Array.isArray(this.props.collectionsArray.data))
    let collectionItems = []
    let collectionTitles = []

    collectionItems = this.props.collectionsArray.data

    if (collectionItems) {
      collectionTitles = collectionItems.map(collection => collection.title)
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
    collectionsArray: state.categories
  }
}

export default connect(mapState, null)(Sidebar)
