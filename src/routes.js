import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Components/Home/Home';
import Dashbaord from './Components/Dashboard/Dashboard';
import AdminHome from './Components/AdminHome/AdminHome';
import AdminDash from './Components/AdminDash/AdminDash';
import AddJob from './Components/AddJob/AddJob';
import Jobs from './Components/Jobs/Jobs';
import Profile from './Components/Profile/Profile';
import Register from './Components/Register/Register';
import AdminProfile from './Components/AdminProfile/AdminProfile';

export default (
    <Switch>
        <Route exact path = '/' component={Home} />
        <Route exact path='/dashboard' component={Dashbaord} />
        <Route exact path='/admin' component={AdminHome} />
        <Route exact path='/admin/dashboard' component={AdminDash} />
        <Route exact path='/admin/addjob' component={AddJob} />
        <Route exact path='/job/:id' component={Jobs} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/admin/profile' component={AdminProfile} />
    </Switch>
)