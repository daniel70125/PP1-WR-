import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Register.scss';
import axios from 'axios';
import {loginUser} from '../../Redux/loginReducer';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: "",
            password: "",
            username: "",
            img: "",
            skill1: "",
            skill2: "",
            skill3: ""
         }
    }
    componentDidUpdate(prevProp){
        if (prevProp.isLoggedIn === this.props.isLoggedIn){
            console.log('yep');
        } else {
            this.props.history.push('/dashboard');
        }
    }
    async register(){
        const {email, password, username, img, skill1, skill2, skill3} = this.state;
        const body = {
            email,
            password,
            username, 
            img,
            skill1,
            skill2,
            skill3
        }
        
        const user = await axios.post('/register', body);
        // console.log(user);
        this.setState({
            user: user.data
        })
      this.props.loginUser(user);
      
      if (this.props.isLoggedIn === true){
        this.props.history.push('/dashboard');
      }
    }
    updateState(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() { 
        return ( 
            <div id='home-cont'>
                <div className="card3">
                    <h5>Register Below !</h5>
                    <div className="container">
                        <span>First Name: </span> <input placeholder='Mike'/> <br />
                        <span>Last Name: </span><input placeholder='Wazowski'/> <br />
                        <span>Username: </span> <input name='username' onChange={(e) => this.updateState(e)} placeholder='supercooldude'/> <br />
                        <span>E-Mail:</span> <input name='email' onChange={(e) => this.updateState(e)} placeholder='email@gmail.com'/> <br />
                        <span>Password: </span> <input name='password' onChange={(e) => this.updateState(e)} placeholder='hackmyaccount1'/> <br />
                        <span>Profile Img: </span> <input name='img' onChange={(e) => this.updateState(e)} placeholder='https://icon.png'/> <br />
                        <h5>Skills</h5>
                        <span>Skill 1: </span><input name='skill1' onChange={(e) => this.updateState(e)} placeholder='Javascript'/> <br />
                        <span>Skill 2: </span><input name='skill2' onChange={(e) => this.updateState(e)} placeholder='Dishwashing' /> <br />
                        <span>Skill 3: </span><input name='skill3' onChange={(e) => this.updateState(e)} placeholder='Welder' /> <br />
                    </div>
                    <button onClick={() => this.register()}>Register</button>
                </div>
            </div>
         );
    }
}
const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps, {loginUser})(Register);