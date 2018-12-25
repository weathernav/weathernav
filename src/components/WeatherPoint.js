import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';
import { Marker } from 'react-google-maps';
const gmaps = google.maps; // eslint-disable-line

class WeatherPoint extends Component {
  render() {
    const { point } = this.props;
    console.log(point);
    return (
      <Marker position={point} defaultVisible={false}>
        <InfoBox options={{ closeBoxURL: '', enableEventPropagation: true }}>
          <div
            style={{ backgroundColor: 'white', opacity: 0.75, padding: '12px' }}
          >
            <div style={{ fontSize: '16px', fontColor: '#08233B' }}>
              Hello, Kaohsiung!
            </div>
          </div>
        </InfoBox>
      </Marker>
    );
  }
}

WeatherPoint.propTypes = {
  point: PropTypes.object.isRequired
};
export default WeatherPoint;
