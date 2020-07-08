import React, {Component} from 'react';
import './Loading.scss'

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <img alt='.img'className='loading-screen' src='https://i.imgur.com/0hewHKs.gif' />
            </div>
         );
    }
}
 
export default Loading;