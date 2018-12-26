import { Component } from 'react';
import PropTypes from 'prop-types';

const gmaps = google.maps; // eslint-disable-line

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      directions: null,
      origin: null,
      destination: null,
      err: null
    };
  }

  componentWillReceiveProps(nextProps) {
    const { origin, destination, onDirections } = this.props;
    const { origin: nextOrigin, destination: nextDestination } = nextProps;
    if (!nextOrigin || !nextDestination) return;
    if (
      origin &&
      origin.lat === nextOrigin.lat &&
      origin.lng === nextOrigin.lng &&
      destination &&
      destination.lat === nextDestination.lat &&
      destination.lng === nextDestination.lng
    )
      return;

    const DirectionsService = new gmaps.DirectionsService();
    DirectionsService.route(
      {
        origin: new gmaps.LatLng(nextOrigin.lat, nextOrigin.lng),
        destination: new gmaps.LatLng(nextDestination.lat, nextDestination.lng),
        travelMode: gmaps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === gmaps.DirectionsStatus.OK) {
          this.setState({
            directions: result
          });
          onDirections(result);
        } else {
          this.setState({
            err: new Error('Unable to fetch driving directions.')
          });
        }
      }
    );
  }

  render() {
    const { directions, err } = this.state;
    return this.props.children({ err, directions });
  }
}

MapContainer.propTypes = {
  onDirections: PropTypes.func.isRequired,
  origin: PropTypes.object,
  destination: PropTypes.object,
  children: PropTypes.func.isRequired
};
export default MapContainer;
