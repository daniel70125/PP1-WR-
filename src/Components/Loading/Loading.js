import React, {Component} from 'react';

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <img alt='.img'id='loading-screen' src='https://i.imgur.com/0hewHKs.gif' />
            </div>
         );
    }
}
 
export default Loading;