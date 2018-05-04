import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './App.css';
import { connect } from 'react-redux';
import styles from './App.css';

// Import Actions
import { toggleAddPost } from './AppActions';
import { loadUserProps, logout } from '../../modules/User/UserActions';
import { getProfileEntered } from '../../modules/User/UserReducer'; 

// Import cookie
import cookie from 'react-cookie';

import Search from '../Post/components/Search/Search';


export class App extends Component {
  componentWillMount() {
    const loginResult = cookie.load('mernAuth');
    const token = loginResult ? loginResult.t : null;
    const username = loginResult ? loginResult.u : null;
    if(this.props.user == null && token && username) {
      this.props.dispatch(loadUserProps( {username: username} ));
    } 
  }
    
  handleLogout = () => {
    this.props.dispatch(logout());
  };

  toggleAddPostSection = () => {
    this.props.dispatch(toggleAddPost());
  };

  render() {
    return (
      <div >
        <div style={{ postion: 'relative' }}>
          <div style={{ position: 'relative' }}>
            <nav className="navbar navbar-expand-lg navbar-light" style={{ background: '#0084b4' }}>
              <Link className="navbar-brand" to="/" style={{ color: 'white' }} >QANDA </Link>

            </nav>
          </div>
          <div style={{ position: 'absolute', top: 0, marginTop: '10px', right: 0, paddingRight: '200px' }}>
            <Search />
          </div>
          <div>
          {
            (this.props.user)
            ? <div>
                {
                  (this.props.getProfileEntered)
                  ? <div style={{ position: 'absolute', top: 0, marginTop: '6px', right: 0, paddingRight: '40px' }}>
                      <a className="btn btn-outline-warning" href="#" onClick={this.handleLogout}>
                        Logout
                      </a>
                    </div>
                  : <div style={{ position: 'absolute', top: 0, marginTop: '6px', right: 0, paddingRight: '40px' }}>
                      <Link style = {{marginRight: '5px'}} to="/profile" className="btn btn-outline-warning">Profile</Link>
                      <a className="btn btn-outline-warning" href="#" onClick={this.handleLogout}>
                        Logout
                      </a>
                    </div>
                }
              </div>
            : <div style={{ position: 'absolute', top: 0, marginTop: '6px', right: 0, paddingRight: '40px' }}>
                <Link style = {{marginRight: '5px'}} to="/register" className="btn btn-outline-warning" >Register</Link>
                <Link to="/login" className="btn btn-outline-warning" >Login</Link>
              </div>
          }
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-2" style={{ top: '20px' }}>
              <div className="list-group" role="tablist" >
                <Link className="list-group-item list-group-item-action" role="tab" to="/">Questions</Link>
                <Link className="list-group-item list-group-item-action" role="tab" to="/onlineresources">Online Resources</Link>
                <Link className="list-group-item list-group-item-action" role="tab" >Tutorship</Link>
                <Link className="list-group-item list-group-item-action" role="tab" to ="/teacherratings">Teacher Ratings</Link>
                <Link className="list-group-item list-group-item-action" role="tab" >Buy and Sell</Link>
              </div>
            </div>
            <div className="col-10">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.object,
};

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }),
};

// Retrieve data from store as props
 function mapStateToProps(store) {
   return {
     user: store.user.data,
     getProfileEntered: store.user.entered,
   };
 }

export default connect(mapStateToProps)(App);