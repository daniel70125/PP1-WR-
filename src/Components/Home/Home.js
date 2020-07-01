import React, {Component} from 'react';
import {loginUser, getUser} from '../../Redux/loginReducer';
import {connect} from 'react-redux';
import './Home.scss'
import axios from 'axios';
import {Link} from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: "",
            password: "",
            user: {}
         }
    }
    // componentDidUpdate(prevProp){
    //     if (prevProp.isLoggedIn === this.props.isLoggedIn){
    //     } else {
    //         this.props.history.push('/dashboard');
    //     }
    // }
    async login (){
        const {email, password} = this.state;
        const body = {
            email,
            password
        }
        
        const user = await axios.post('/login', body);
        console.log(user);
        this.setState({
            user: user.data
        })
      this.props.loginUser(user);
      
    //   if (this.props.isLoggedIn === true){
    //     this.props.history.push('/dashboard');
    //   }
      
    }
    render() { 
        // console.log(this.state);
        // console.log(this.props.isLoggedIn);
        return ( 
            <div id="home-cont">
                <div className='home-box-main'>
                    <h5>Welcome</h5>
                <input placeholder='E-Mail' onChange={(e) => this.setState({email: e.target.value})} /> <br />
                <input type='password' placeholder='Password' onChange={(e) => this.setState({password: e.target.value})} /><br />
                <button onClick={() => this.login()}>Login</button>
                <Link to='/register'><button>Register</button></Link> <br />
                <p>Are you an ADMINISTRATOR? <Link style={{'color': 'coral'}}to={'/admin'}>Click here</Link> ..</p>

                <h5 id='h5'> </h5>
                </div>
            </div>
         );
    }
}
 

const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps, {loginUser, getUser})(Home);