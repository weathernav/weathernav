import React from 'react'
import { compose, withProps, lifecycle } from "recompose"
import { withGoogleMap, GoogleMap, DirectionsRenderer } from "react-google-maps"

const Map = compose(
  withProps({
    // googleMapURL:"https://maps.googleapis.com/maps/api/js?exp&libraries=places,directions&key=AIzaSyCD15-lexoV0aFOvKchs4P6B6T-IqdSq-Y",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  // withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
        const gmaps = google.maps // eslint-disable-line

        const DirectionsService = new gmaps.DirectionsService();
        DirectionsService.route({
          origin: new gmaps.LatLng(41.8507300, -87.6512600),
          destination: new gmaps.LatLng(41.8525800, -87.6514100),
          travelMode: gmaps.TravelMode.DRIVING,
        }, (result, status) => {
          if (status === gmaps.DirectionsStatus.OK) {
            this.setState({
              directions: result,
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        });
    }
  })
)((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
)

export default Map
