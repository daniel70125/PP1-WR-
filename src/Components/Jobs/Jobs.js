import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import './Jobs.scss';

class Jobs extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            post: [],
            modal: false
         }
    }
   async componentDidMount(){
       const {pathname} = this.props.location
       console.log(pathname);
    const job = await axios.get(`${pathname}`);
    this.setState({
        post: job.data
    })
    }
    editJob(){
        
    }
    render() { 
        return ( 
            this.state.modal ? 
            
            <div className='add-job-cont'>
                    <img alt={this.state.img} src={this.props.user.img} /> <br />
                    <span>Title: </span><input name='title' onChange={(e) => this.updateState(e)}/> <br />
                    <span>Location: </span><input name='location' onChange={(e) => this.updateState(e)}/> <br />
                    <span>Pay Rate: </span><input name='pay' onChange={(e) => this.updateState(e)}/> <br />
                    <span>Description: </span><textarea type='textarea'name='description' onChange={(e) => this.updateState(e)}></textarea> <br />
                    <button onClick={()=> this.editJob()}>Add Job</button>
                </div>
            
            :
                <div className="card">
                    <img src={this.state.post.img} alt="Avatar" />
                    <div className="container">
                        <span>Job Type:</span><h4><b>{this.state.post.title}</b></h4>
                        <span>Location:</span><p>{this.state.post.location}</p>
                        <span>Pay Rate:</span><p>${this.state.post.pay} Hr.</p>
                        <span>Company Comments</span><textarea readonly value={this.state.post.description}></textarea>
                        <button onClick={() => this.setState({modal: !this.state.modal})}>Edit</button><button>Delete</button>
                    </div>
            </div>
         );
    }
}
 
const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps)(Jobs);