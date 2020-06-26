import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {getUser} from '../../Redux/loginReducer';
import './AdminProfile.scss';

class AdminProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            jobs: [{title: 'hello'}]
         }
    }
    async componentDidMount(){
        
    }
    render() { 
        return ( 
            <div>
            <div className="card2">
                    <img img='.img' id='card2-img'src={this.props.user.img} alt="Avatar" />
                    <div className="contact-box">
                        <span>Name:</span><h4><b>{this.props.user.email}</b></h4>
                        <span>Phone:</span><h4><b>{this.props.user.email}</b></h4>
                        <span>E-Mail:</span><h4><b>{this.props.user.email}</b></h4>
                    </div>
                    <div className='skills-box'>
                        <h5>Skills</h5>
                        <ul>
                            <li>Javascript</li>
                            <li>HTML5</li>
                            <li>Crazy</li>
                            <li>Kinda</li>
                        </ul>
                    </div>
            </div>
            <div className="card2">
                    
            </div>
            </div>
         );
    }
}
let mapStateToProps = state => state
export default connect(mapStateToProps)(AdminProfile);