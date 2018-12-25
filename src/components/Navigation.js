import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        <Map
          onDirections={onDirections}
          {...locations}
          weatherPoints={weatherPoints}
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
