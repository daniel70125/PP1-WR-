import React, { Component } from 'react';
import './App.css';
import Routes from './routes';
import Nav from './Components/Nav/Nav';
import AdminNav from './Components/AdminNav/AdminNav';
import Footer from './Components/Footer/Footer';
import {getUser} from './Redux/loginReducer';
import {connect} from 'react-redux';
import HeaderJS from './Components/Header/Header';

class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      
    }
  }
  
  render(){
  return (
    <div className="App">
      <HeaderJS />
      <Nav />
      <AdminNav />
      {Routes}
      <Footer />
    </div>
  );
  }
} 
const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps, {getUser})(App);
