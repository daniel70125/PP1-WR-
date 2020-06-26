import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import './Jobs.scss';

class Jobs extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            post: [],
            modal: false,
            title: "",
            description: "",
            location: "",
            img: this.props.user.img,
            company_id: this.props.user.id,
            pay: ''
         }
    }
   async componentDidMount(){
       const {pathname} = this.props.location
    const job = await axios.get(`${pathname}`);
    this.setState({
        post: job.data
    })
    }
   async editJob(){
        const {id} = this.props.user;
       const {title, description, location, company_id, img, pay} = this.state;
       const obj = {
           id,
           title,
           description,
           location,
           company_id,
           img,
           pay
       }
       console.log(obj);
       const editedJob =  await axios.post('/admin/editJob', obj);
       console.log(editedJob);
    }
    deletePost(){
        const {id} = this.state.post;
        axios.delete(`/job/${id}`)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
        this.props.history.push('/admin/dashboard')
    }
    updateState(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    async acceptJob(){
        const {id} = this.props.user;
        const postId = this.state.post.id;
        const {title, description, location, company_id, img, pay} = this.state.post;
       const job = await axios.post('/job/accept', {postId, title, description, location, company_id, id, img, pay  });
       this.props.history.push('/profile');
       
    
    }
    render() { 
        return ( 
            
            this.props.user.role_id ? 
            this.state.modal ? 
            
            <div className='add-job-cont'>
                    <img alt={this.state.img} src={this.props.user.img} /> <br />
                    <span>Title: </span><input name='title' onChange={(e) => this.updateState(e)}/> <br />
                    <span>Location: </span><input name='location' onChange={(e) => this.updateState(e)}/> <br />
                    <span>Pay Rate: </span><input name='pay' onChange={(e) => this.updateState(e)}/> <br />
                    <span>Description: </span><textarea type='textarea'name='description' onChange={(e) => this.updateState(e)}></textarea> <br />
                    <button onClick={()=> this.editJob()}>Add Job</button>
                    <button onClick={() => this.setState({modal: !this.state.modal})}>Cancel</button>
                </div>
            :

            
            <div className="card">
                    <img src={this.state.post.img} alt="Avatar" />
                    <div className="container">
                        <span>Job Type:</span><h4><b>{this.state.post.title}</b></h4>
                        <span>Location:</span><p>{this.state.post.location}</p>
                        <span>Pay Rate:</span><p>${this.state.post.pay} Hr.</p>
                        <span>Company Comments</span><textarea readOnly value={this.state.post.description}></textarea>
                        <button onClick={() => this.setState({modal: !this.state.modal})}>Edit</button><button onClick={() => this.deletePost()}>Delete</button>
                    </div>
            </div>
            
            :
            
            <div className="card">
                    <img src={this.state.post.img} alt="Avatar" />
                    <div className="container">
                        <span>Job Type:</span><h4><b>{this.state.post.title}</b></h4>
                        <span>Location:</span><p>{this.state.post.location}</p>
                        <span>Pay Rate:</span><p>${this.state.post.pay} Hr.</p>
                        <span>Company Comments</span><textarea readOnly value={this.state.post.description}></textarea>
                        <button onClick={() => this.acceptJob()}>Accept Job</button>
                    </div>
            </div>
            
            
                
         );
    }
}
 
const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps)(Jobs);