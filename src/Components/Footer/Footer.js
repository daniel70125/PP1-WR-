import React, {Component} from 'react';
import './Footer.scss';
import {withRouter} from 'react-router-dom';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            this.props.location.pathname === '/' || this.props.location.pathname === '/admin' ? null :
            <footer>D.Wright 2020#</footer>
         );
    }
}
 

export default withRouter(Footer);