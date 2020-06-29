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
            this.props.location.pathname === '/' || this.props.location.pathname === '/register' || this.props.location.pathname === '/admin' ? null :
            <div id='footer-cont' style={{'padding': '10px'}}>
                <div>
                D.Wright 2020@
                </div>
            </div>
         );
    }
}
 

export default withRouter(Footer);