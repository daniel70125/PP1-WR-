import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import './Nav.scss';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {logout, getUser} from '../../Redux/loginReducer';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = { 

         }
         this.logout = this.logout.bind(this);
    }
    componentDidMount(){
        this.props.getUser();
    }
    logout(){
        axios.delete('/logout')
        .then(() => this.props.logout() )
        .catch(err => console.log(err))
    }
    render() {
        return ( 
            this.props.location.pathname === '/' || this.props.location.pathname === '/admin/addjob' || this.props.location.pathname === '/admin' || this.props.location.pathname === '/admin/' || this.props.location.pathname === '/admin/dashboard'  ? null : 
            <div id="nav">
                <div className='imgBox'>
                 <img alt=".img" src={this.props.user.img} />
                <h3>{this.props.user.username}</h3>
                </div>
                <p>{this.props.username}</p>
                <div id="nav-links">
                    <Link to="/dashboard">Home</Link>
                    <Link to="">My Profile</Link>
                </div>
                <Link onClick={() => this.logout()} className="logout">Logout</Link>
            </div>
            
         );
    }
}

let mapStateToProps = state => state

export default connect(mapStateToProps, {logout, getUser})(withRouter(Nav));