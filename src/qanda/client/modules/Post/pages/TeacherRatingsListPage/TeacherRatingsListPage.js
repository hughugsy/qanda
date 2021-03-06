import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import TeacherRatingsList from '../../components/TeacherRatingsList';
import TeacherRatingsWidget from '../../components/TeacherRatingsWidget/TeacherRatingsWidget';

// Import Actions
import { addTRRequest, fetchTRs, deleteTRRequest } from './TeacherRatingActions';
import { toggleAddTR } from './TRButtonActions';

// Import Selectors
import { getShowAddPost } from './TRButtonReducer';
import { getTeacherRatings } from './TeacherRatingReducer';
import { getUser } from '../../../User/UserReducer';

class TeacherRatingsListPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTRs());
  }

  handleDeletePost = post => {
    if (confirm('Do you want to delete this post')) { // eslint-disable-line
      this.props.dispatch(deleteTRRequest(post));
    }
  };

  handleAddPost = (tags, name, grading, teaching, workload) => {
    this.props.dispatch(toggleAddTR());
    this.props.dispatch(addTRRequest({ tags, name, grading, teaching, workload }));
  };

  render() {
    return (
      <div>
        {/* <TeacherRatingsWidget addPost={this.handleAddPost} showAddPost={true/*this.props.showAddPost} />*/}
        <TeacherRatingsList showRate = {this.props.user} handleDeletePost={this.handleDeletePost} posts={this.props.posts} addPost ={this.handleAddPost} />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
TeacherRatingsListPage.need = [() => { return fetchTRs(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    showAddPost: getShowAddPost(state),
    posts: getTeacherRatings(state),
    user: getUser(state),
  };
}

TeacherRatingsListPage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    grading: PropTypes.number.isRequired,
    teaching: PropTypes.number.isRequired,
    workload: PropTypes.number.isRequired,
    cuid: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  })).isRequired,
  showAddPost: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

TeacherRatingsListPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(TeacherRatingsListPage);
