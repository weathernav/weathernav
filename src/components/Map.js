import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { compose, withProps } from 'recompose';
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} from 'react-google-maps';

const enhance = compose(
  withProps({
    // googleMapURL:"https://maps.googleapis.com/maps/api/js?exp&libraries=places,directions&key=AIzaSyCD15-lexoV0aFOvKchs4P6B6T-IqdSq-Y",
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100vh' }} />,
    mapElement: <div style={{ height: '100%' }} />
  }),
  // withScriptjs,
  withGoogleMap,
);

class Map extends Component {
  constructor(props){
    super(props)
    this.state = {
      directions: null,
      origin: null,
      destination: null
    }
  }
  // shouldComponentUpdate(nextProps) {
  //   console.log('nextProps', nextProps);
  //   console.log('props', this.props);
  //   const { origin, destination } = this.props
  //   const { origin: nextOrigin, destination: nextDestination} = nextProps
  //   if(!origin || !destination || !nextOrigin || !nextDestination) return true
  //   console.log('here');
  //   return (
  //     origin.lat !== nextOrigin.lat ||
  //     origin.lng !== nextOrigin.lng ||
  //     destination.lat !== nextDestination.lat ||
  //     destination.lng !== nextDestination.lng
  //   )
  // }

  componentDidUpdate() {
    const gmaps = google.maps; // eslint-disable-line
    const { origin, destination } = this.props

    if(!origin || !destination) return

    const DirectionsService = new gmaps.DirectionsService();
    DirectionsService.route(
      {
        origin: new gmaps.LatLng(origin.lat, origin.lng),
        destination: new gmaps.LatLng(destination.lat, destination.lng),
        travelMode: gmaps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === gmaps.DirectionsStatus.OK) {
          this.setState({
            directions: result
          });
        }
      }
    );
  }

  render() {
    const { directions } = this.state

    return (
      <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    )
  }
}

Map.propTypes = {
  origin: PropTypes.object,
  destination: PropTypes.object
};
export default enhance(Map);
