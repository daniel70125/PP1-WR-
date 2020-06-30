import React, {Component} from 'react';
import {getUser, getAllJobs} from '../../Redux/loginReducer';
import {connect} from 'react-redux';
import Loading from '../Loading/Loading';
import {Link} from 'react-router-dom';
// import axios from 'axios';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: "",
            islogged: false,
            jobs: ['job1', 'job2'],
            ok: ""
         }
    }
    async componentDidMount(){
        this.props.getUser();
        if (this.props.isLoggedIn === false){
            this.props.history.push('/')
        }
        this.props.getAllJobs()
    }
    componentDidUpdate(prev){
        if (this.props.isLoggedIn === false){
            this.props.history.push('/')
        }
    }
    
    render() { 
        let posts = this.props.jobs.map((el, i) => {
            return <div key={i} className='dash-job-cont'>
            <Link to={`/job/${el.id}`} key={i}>
              <img alt = '.img' src={el.img} /> <br />
                <span>Title:</span><h3 className='post-title'>{el.title}</h3>
                <span>Location:</span><h3 className='post-title'>{el.location}</h3>
                <span>Pay</span><h3 className='post-title'>${el.pay}/Hr.</h3>
            </Link>
            </div>
          })
        return ( 
            this.props.isLoading ? <Loading /> : 
            <div style={{'padding': '10px'}}>
            <div id='main-dash-cont'>
                {posts}
            </div>
            </div>
         );
    }
}
 
const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps, {getUser, getAllJobs})(Dashboard);