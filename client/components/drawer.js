import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';

export default class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
    return (
    <MuiThemeProvider>
      <div>

        <IconButton
          onClick={this.handleToggle}
        ><i className="material-icons">menu</i>
        </IconButton>
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem onClick={this.handleClose}>For Him</MenuItem>
          <MenuItem onClick={this.handleClose}>For Her</MenuItem>
          <MenuItem onClick={this.handleClose}>For Pets</MenuItem>
        </Drawer>
      </div>
    </ MuiThemeProvider>
    );
  }
}
