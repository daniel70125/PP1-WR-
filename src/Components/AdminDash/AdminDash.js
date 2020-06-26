import React, {Component} from 'react';
import {getUser, getJobs} from '../../Redux/loginReducer';
import {connect} from 'react-redux';
import Loading from '../Loading/Loading';
import {Link} from 'react-router-dom';
import './adminDash.scss'

class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: "",
            islogged: false,
            jobs: []
         }
    }
    componentDidMount(){
        this.props.getUser();
        if (this.props.isLoggedIn === false){
            this.props.history.push('/admin')
        }
        
        this.props.getJobs(this.props.user.id)
    }
    componentDidUpdate(prev){
        if (this.props.isLoggedIn === false){
            this.props.history.push('/admin')
        }
    }
    render() { 
        let posts = this.props.jobs.map((el, i) => {
            return <div className='dash-job-cont'>
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
            <div id='main-dash-cont'>
                {posts}
            </div>
         );
    }
}
 
const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps, {getUser, getJobs})(AdminDashboard);