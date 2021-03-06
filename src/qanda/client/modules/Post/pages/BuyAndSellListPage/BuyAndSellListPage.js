import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch/dom';

// Import Components
import BuyAndSellList from '../../components/BuyAndSellList';
import BuyAndSellWidget from '../../components/BuyAndSellWidget/BuyAndSellWidget';
import Result from '../../components/Result/Result';

// Import Actions
import { addBSRequest, fetchBSs } from './BuyAndSellActions';

// Import Selectors
import { getBuyAndSells } from './BuyAndSellReducer';
import { getUser } from '../../../User/UserReducer';

class BuyAndSellListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRateForm: false,
    };
  }
  componentDidMount() {
    this.props.dispatch(fetchBSs());
  }

  handleAddPost = (tags, title, price, contact, content) => {
    this.props.dispatch(addBSRequest({ tags, title, price, contact, content }));
    this.setState({ showRateForm: false });
  }

  handleClickAddItem = () => {
    this.setState({ showRateForm: true });
  }
  handleClickCancel = () => {
    this.setState({ showRateForm: false });
  }

  render() {
    let pageContent;
    if (!this.props.user)
      pageContent = null;
    else{
    if (!this.state.showRateForm) {
      pageContent = (<button className="btn btn-primary" onClick={this.handleClickAddItem} style={{marginBottom: '5px' }}>Add Item</button>);
    }
    else {
        pageContent = (
          <div>
            <BuyAndSellWidget handleClickCancel={this.handleClickCancel} addPost={this.handleAddPost} />
          </div>
        );
      }
    }
    return (
      <div style={{marginTop: '20px'}}>
        {pageContent}
        <BuyAndSellList posts={this.props.posts} />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
BuyAndSellListPage.need = [() => { return fetchBSs(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    posts: getBuyAndSells(state),
    user: getUser(state),
  };
}

BuyAndSellListPage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    price: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    contact: PropTypes.string.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

BuyAndSellListPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(BuyAndSellListPage);
