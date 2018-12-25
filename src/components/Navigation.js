import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MapContainer from '../containers/MapContainer';
import Map from './Map';
import Controls from './Controls';

class Navigation extends Component {
  render() {
    const {
      locations,
      weatherPoints,
      onRouteSearch,
      onDirections
    } = this.props;
    return (
      <div>
        <Controls onRouteSearch={onRouteSearch} />
        <MapContainer
          onDirections={onDirections}
          {...locations}
          render={props => <Map weatherPoints={weatherPoints} {...props} />}
        />
      </div>
    );
  }
}

Navigation.propTypes = {
  locations: PropTypes.object,
  weatherPoints: PropTypes.array,
  onRouteSearch: PropTypes.func.isRequired,
  onDirections: PropTypes.func.isRequired
};
export default Navigation;
