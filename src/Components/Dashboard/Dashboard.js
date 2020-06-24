import React, {Component} from 'react';
import {getUser} from '../../Redux/loginReducer';
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
    componentDidMount(){
        // this.props.getUser();
        setTimeout(()=> {
            if (this.props.isLoggedIn === false){
                this.props.history.push('/')
            }
        }, 1000)
    }
    componentDidUpdate(prev){
        if (this.props.isLoggedIn === false){
            this.props.history.push('/')
        }
    }
    render() { 
        console.log(this.props)
        return ( 
            this.props.isLoading ? <Loading /> : 
            <div>
                {
                    this.state.jobs.map((e, i) => {
                        return <Link to='/'>
                        <div>Hello</div>
                        </Link>
                    })
                }
            </div>
         );
    }
}
 
const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps, {getUser})(Dashboard);