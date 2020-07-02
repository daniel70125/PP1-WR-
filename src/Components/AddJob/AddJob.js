import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUser} from '../../Redux/loginReducer';
import './AddJob.scss';
import axios from 'axios';

class AddJob extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            title: "",
            description: "",
            location: "",
            img: this.props.user.img,
            company_id: this.props.user.id,
            pay: ''
         }
    }
    componentDidMount(){
        this.props.getUser();
    }
    componentDidUpdate(prev){
        if (this.props.isLoggedIn === false){
            this.props.history.push('/admin')
        }
    }
    updateState(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    async addJob(){
        const {title, description, location, img, company_id, pay} = this.state
        const addedJob = await axios.post('/admin/addJob', {title, description, location, company_id, img, pay})
        console.log(addedJob);
        this.props.history.push('/admin/dashboard')
    }
    render() { 
        // console.log(this.state)
        return ( 
            <div>
                <div className='add-job-cont'>
                    <img alt={this.state.img} src={this.props.user.img} /> <br />
                    <span>Title: </span><input style={{'position': 'relative', 'left': '14px'}} name='title' onChange={(e) => this.updateState(e)}/> <br />
                    <span>Location: </span><input name='location' onChange={(e) => this.updateState(e)}/> <br />
                    <span>Pay Rate: </span><input name='pay' onChange={(e) => this.updateState(e)}/> <br />
                    <span>Description: </span><textarea type='textarea'name='description' onChange={(e) => this.updateState(e)}></textarea> <br />
                    <button onClick={()=> this.addJob()}>Add Job</button>
                </div>
            </div>
         );
    }
}
 
const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps, {getUser})(AddJob);