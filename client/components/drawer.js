import React from 'react';
import { NavLink } from 'react-router-dom'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
//this is f/collections branch
export default class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      collectionsArray: ['Performance', 'Pets', 'Sleepwear', 'Casual', 'Business']
    };
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });

  render() {

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
            this.state.collectionsArray.map((collection, index) => (
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

          //  <NavLink to={`/collections/Performance`}>
          //   <MenuItem onClick={this.handleClose}>Performance</MenuItem>
          // </NavLink>

          // <NavLink to={`/collections/Pets`}>
          //   <MenuItem onClick={this.handleClose}>Pets</MenuItem>
          // </NavLink>

          // <NavLink to={`/collections/Sleepwear`}>
          //   <MenuItem onClick={this.handleClose}>Sleepwear</MenuItem>
          // </NavLink>

          // <NavLink to={`/collections/Casual`}>
          //   <MenuItem onClick={this.handleClose}>Casual</MenuItem>
          // </NavLink>

          // <NavLink to={`/collections/Business`}>
          //   <MenuItem onClick={this.handleClose}>Business</MenuItem>
          // </NavLink>
