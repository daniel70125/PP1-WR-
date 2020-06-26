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
        this.props.history.push('/')
    }
    logout2(){
        axios.delete('/logout')
        .then(() => this.props.logout() )
        .catch(err => console.log(err))
        this.props.history.push('/admin')
    }
    render() {
        return ( 
            this.props.location.pathname === '/' || this.props.location.pathname === '/register'  || this.props.location.pathname === '/admin'  ? null : 
            this.props.user.role_id ? 
            <div>
            <div id="nav">
                <div className='imgBox'>
                 <img alt=".img" src={this.props.user.img} />
                <h3>{this.props.user.username}</h3>
                </div>
                <p>{this.props.username}</p>
                <div id="nav-links">
                    <Link className="a-tag" to="/admin/dashboard">Home</Link>
                    <Link className="a-tag" to="/admin/addjob">Add Job</Link>
                    <Link className="a-tag" to="/admin/profile">My Profile</Link>
                </div>
                <Link onClick={() => this.logout2()} className="logout">Logout</Link>
            </div>
            <div id='mobile-nav'>
                <Link to='/admin/dashboard'><li>Home</li></Link>
                <Link to='/admin/addjob'><li>Add Job</li></Link>
                <Link to='/admin/profile'><li>My Profile</li></Link>
            </div>
            </div>
            :
            <div>
            <div id="nav">
                <div className='imgBox'>
                 <img alt=".img" src={this.props.user.img} />
                <h3>{this.props.user.username}</h3>
                </div>
                <p>{this.props.username}</p>
                <div id="nav-links">
                    <Link to="/dashboard">Home</Link>
                    <Link to="/profile">My Profile</Link>
                </div>
                <Link onClick={() => this.logout()} className="logout">Logout</Link>
            </div>
            <div id='mobile-nav'>
            
                <Link to='/dashboard'><li>Home</li></Link>
                <Link to='profile'><li>My Profile</li></Link>
                <Link onClick={() => this.logout()} >Logout</Link>
            
            </div>
            </div>
         );
    }
}

let mapStateToProps = state => state

export default connect(mapStateToProps, {logout, getUser})(withRouter(Nav));