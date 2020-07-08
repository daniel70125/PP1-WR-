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
                        <span>Webite:</span><h4 style={{"overflow": "auto"}}><b>{this.props.user.website}</b></h4>
                        <span>E-Mail:</span><br /><a style={{'color': 'black', "marginTop": "10px"}} href={a}><b>{this.props.user.email}</b></a>
                    </div>
                    <div className='skills-box2'>
                        <h5>Rating</h5>
                        <h1>4.6</h1>
                    </div>
            </div>
            <div style={{'height' : '48vh', 'marginBottom': '48px'}}className="card2">
                    <GMap user={this.props.user}/>
            </div>
            </div>
         );
    }
}
let mapStateToProps = state => state
export default connect(mapStateToProps)(AdminProfile);