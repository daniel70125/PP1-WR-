import React, {Component} from 'react';
import {getWeather} from '../../Redux/loginReducer';
import {connect} from 'react-redux';
import './Header.scss';
// import axios from 'axios';
import {withRouter} from 'react-router-dom';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            weather: {name: 'kid',main: {temp:"70.87"}, weather: [{description: '', icon: ''}]},
            img: ''
         }
    }

   async componentDidMount(){
        await this.props.getWeather();
        this.setState({
            weather: this.props.weather
        })
        const {icon} = this.state.weather.weather[0]
        this.setState({
            img: `http://openweathermap.org/img/w/${icon}.png`
        })
    }
    componentDidUpdate(prev){
        
    }
    
    render() { 
        console.log(this.state.weather.weather[0].icon)
        return ( 
            this.props.location.pathname === '/' || this.props.location.pathname === '/register' || this.props.location.pathname === '/admin' ? null :
            <div>
            <div id='weather-cont'>
                <div className='weather-box'>
                    <p>Today's weather looks like <br /> <p className='weather-feel'>{this.state.weather.weather[0].description}</p></p>
                </div>
                <div className='padding-top weather-box'>
                    <img src={this.state.img} alt='.img' /> <br />
                    <span className='weather-feel'>{this.state.weather.main.temp}° F</span>
                </div>
                <div className='padding-top weather-box'>
                    <h5 className='weather-feel'>{this.state.weather.name}</h5>
                </div>
            </div>
            </div>
         );
    }
}
let mapStateToProps = state => state
export default connect(mapStateToProps, {getWeather})(withRouter(Header));