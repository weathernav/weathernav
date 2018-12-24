import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps, lifecycle } from 'recompose';
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} from 'react-google-maps';

const Map = compose(
  withProps({
    // googleMapURL:"https://maps.googleapis.com/maps/api/js?exp&libraries=places,directions&key=AIzaSyCD15-lexoV0aFOvKchs4P6B6T-IqdSq-Y",
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100vh' }} />,
    mapElement: <div style={{ height: '100%' }} />
  }),
  // withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const gmaps = google.maps; // eslint-disable-line

      const DirectionsService = new gmaps.DirectionsService();
      DirectionsService.route(
        {
          origin: new gmaps.LatLng(41.85073, -87.65126),
          destination: new gmaps.LatLng(41.85258, -87.65141),
          travelMode: gmaps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === gmaps.DirectionsStatus.OK) {
            this.setState({
              directions: result
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  })
)(props => (
  <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
));

Map.propTypes = {};
export default Map;
