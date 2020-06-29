import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {getUser} from '../../Redux/loginReducer';
import './AdminProfile.scss';
import GMap from '../GMap/GMAP';

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
        const a = `mailto:${this.props.user.email}`
        return ( 
            <div>
            <div className="card2">
                    <img img='.img' id='card2-img'src={this.props.user.img} alt="Avatar" />
                    <div className="contact-box">
                        <span>Name:</span><h4><b>{this.props.user.username}</b></h4>
                        <span>Phone:</span><h4><b>{this.props.user.phone}</b></h4>
                        <span>E-Mail:</span><br /><a style={{'color': 'black'}} href={a}><b>{this.props.user.email}</b></a>
                    </div>
                    {/* <div className='skills-box'>
                        <h5>Rating</h5>
                        <ul>
                            <li>Javascript</li>
                            <li>HTML5</li>
                            <li>Crazy</li>
                            <li>Kinda</li>
                        </ul>
                    </div> */}
            </div>
            <div style={{'height' : '48vh', 'marginBottom': '48px'}}className="card2">
                    <GMap username={this.props.user.username}/>
            </div>
            </div>
         );
    }
}
let mapStateToProps = state => state
export default connect(mapStateToProps)(AdminProfile);