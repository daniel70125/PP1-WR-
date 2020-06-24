import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import './AdminNav.css';
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
        // this.props.getUser();
        console.log('mounted');
    }
    componentDidUpdate(prev){
        // this.props.getUser();
    }
    logout(){
        axios.delete('/logout')
        .then(() => this.props.logout() )
        .catch(err => console.log(err))
    }
    render() {
        return ( 
            this.props.location.pathname === '/' || this.props.location.pathname === '/admin' || this.props.location.pathname === '/admin/' || this.props.location.pathname === '/dashboard' ? null : 
            <div id="nav">
                <div className='imgBox'>
                 <img alt=".img" src={this.props.user.img} />
                <h3>{this.props.user.username}</h3>
                </div>
                <p>{this.props.username}</p>
                <div id="nav-links">
                    <Link className="a-tag" to="/admin/dashboard">Home</Link>
                    <Link className="a-tag" to="/admin/addjob">Add Job</Link>
                    <Link className="a-tag" to="">My Profile</Link>
                </div>
                <Link onClick={() => this.logout()} className="logout">Logout</Link>
            </div>
            
         );
    }
}

let mapStateToProps = state => state

export default connect(mapStateToProps, {logout, getUser})(withRouter(Nav));