import React, {Component} from 'react'
import {connect} from 'react-redux'
import AutoComplete from 'material-ui/AutoComplete';
import FlatButton from 'material-ui/FlatButton';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: ''
    }
  }

  handleUpdateInput = searchText => {
    this.setState({
      searchText: searchText,
    });
  };

  handleNewRequest = () => {
    this.setState({
      searchText: '',
    });
  };

  handleClick = (products, productTitles, searchText) => {
    const selectedItem = products.find(item => item.title === searchText)
    if (selectedItem) {
      this.props.history.push(`/item/${selectedItem.id}`);
    }
  };

  render() {
    const {products} = this.props;
    const productTitleArray = products.map(item => item.title);

    return (
      <div>
        <AutoComplete
          hintText="What are you looking for?"
          searchText={this.state.searchText}
          onUpdateInput={this.handleUpdateInput}
          // onNewRequest={this.handleNewRequest}
          dataSource={productTitleArray}
          filter={AutoComplete.caseInsensitiveFilter}
          // filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
          openOnFocus={true}
        />
        <FlatButton
          label="Submit"
          onClick={() => this.handleClick(products, productTitleArray, this.state.searchText)}
        />
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   products: state.products
// });

export default connect()(SearchBar);

// const mapDispatchToProps = (dispatch, ownProps) => ({
//   handleClick: (products, productTitles, searchText) => {
//         const selectedItem = products.find(item => item.title === searchText)
//         if (selectedItem) {
//           ownProps.history.push(`/item/${selectedItem.id}`)
//         }
//       }
// })
