import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import AutoComplete from 'material-ui/AutoComplete';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      allProducts: false
    }

    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.updateCheck = this.updateCheck.bind(this);
  }

  updateCheck = () => {
    this.setState((oldState) => {
      return {
        allProducts: !oldState.allProducts,
      };
    });
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
    const {history} = this.props;
    const selectedItem = products.find(item => item.title === searchText)
    if (selectedItem) {
      this.handleNewRequest();
      this.updateCheck();
      history.push(`/item/${selectedItem.id}`);
    }
  };

  render() {
    const {products, history} = this.props;
    //const productTitleArray = products.map(item => item.title)
    let searchBarData;
    let productTitleArray;
    let checkbox = false;
    const currentPath = history.location.pathname;
    const collectionType = currentPath.slice(13);

    if (currentPath === `/collections/${collectionType}`) {
      //console.log('IN A')
      checkbox = true;
      const collectionData = products.filter(product => product.category[0] === collectionType);
      searchBarData = collectionData;
      productTitleArray = collectionData.map(item => item.title);
    } else {
      //console.log('IN B')
      searchBarData = products;
      productTitleArray = products.map(item => item.title)
    }

    if (this.state.allProducts) {
      //console.log('IN C')
      searchBarData = products;
      productTitleArray = products.map(item => item.title)
    }

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
        { checkbox &&
          <Checkbox
            label="All"
            checked={this.state.allProducts}
            onCheck={this.updateCheck.bind(this)}
            style={styles.checkbox}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products
});

export default withRouter(connect(mapStateToProps)(SearchBar));

// const mapDispatchToProps = (dispatch, ownProps) => ({
//   handleClick: (products, productTitles, searchText) => {
//         const selectedItem = products.find(item => item.title === searchText)
//         if (selectedItem) {
//           ownProps.history.push(`/item/${selectedItem.id}`)
//         }
//       }
// })


