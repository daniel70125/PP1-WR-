import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './GMap.scss';
 
export class MapContainer extends Component {
  constructor(props){
    super(props);
    
    this.state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    }
  }
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
    onMapClicked = (props) => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        })
      }
    };



  render() {
    const style = { 
      width: '68%',
      height: '48vh'
    }
    const {lat, long} = this.props;
    return (
      <div className='okdiv' style={{'width': '150px'}}>
<Map 
google={this.props.google} zoom={14} onClick={this.onMapClicked}
initialCenter={{ lat: 29.958890, lng: -90.101740 }}
> 
    <Marker
        title={this.props.user.username}
        name={'SOMA'}
        position={{lat: 29.958890, lng: -90.101740}} 
        />

<InfoWindow
  onOpen={this.windowHasOpened}
  onClose={this.windowHasClosed}
  visible={this.state.showingInfoWindow}>
    <div>
      <h1>{this.state.selectedPlace.name}</h1>
    </div>
</InfoWindow>
</Map>
</div>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyCqPOkrUK2Jndzihmo-UXMS8XJvooWi16c')
})(MapContainer)