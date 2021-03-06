import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {getUser} from '../../Redux/loginReducer';
import './Profile.scss';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {getUser} from '../../Redux/loginReducer';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            jobs: [{title: 'hello', location:'1212 nowhere Ave', pay:0, img:'https://blacknewschannel.com/wp-content/uploads/2020/06/Chuck-E-Cheese.jpg'}]
         }
    }
    async componentDidMount(){
        this.props.getUser();
        if (this.props.isLoggedIn === false){
            this.props.history.push('/')
        }
        const {id} = this.props.user;
    const jobs = await axios.post('myJob', {id});
    this.setState({
        jobs: jobs.data
    })
    }
   async cancel(id){
       const newid = await axios.post(`/cancelJob/${id}`);
       this.props.history.push('/dashboard');
    }
    render() { 
        let posts = this.state.jobs.map((el, i) => {
            return <div className='dash-job-cont'>
            <Link to={`/job/${el.id}`} key={i}>
              <img alt = '.img' src={el.img} /> <br />
                <span>Title:</span><h3 className='post-title'>{el.title}</h3>
                <span>Location:</span><h3 className='post-title'>{el.location}</h3>
                <span>Pay</span><h3 className='post-title'>${el.pay}/Hr.</h3>
                
            </Link>
            <button onClick={() => this.cancel(el.id)}>Cancel</button>
            </div>
          })
        return ( 
            <div>
            <div style={{'color': 'snow'}} className="card2">
                    <img img='.img' id='card2-img'src={this.props.user.img} alt="Avatar" />
                    <div className="contact-box">
                        <span>Name:</span><h4><b>{this.props.user.username}</b></h4>
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
            <div style={{'marginBottom': '45px'}}className="card2">
                    {posts}
            </div>
            </div>
         );
    }
}
let mapStateToProps = state => state
export default connect(mapStateToProps, {getUser})(Profile);