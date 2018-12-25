import { Component } from 'react';
import PropTypes from 'prop-types';

import { geocodeBySuggestion } from 'mui-places-autocomplete';

class LocationSearchContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coordinates: null,
      err: null
    };
  }

  onSuggestionSelected(suggestion) {
    geocodeBySuggestion(suggestion)
      .then(results => {
        if (results.length < 1) {
          this.setState({
            err: new Error(
              'Geocode request completed successfully but without any results'
            )
          });

          return;
        }

        const { geometry } = results[0];

        const coordinates = {
          lat: geometry.location.lat(),
          lng: geometry.location.lng()
        };
        this.props.onCoords(coordinates);
        this.setState({ coordinates });
      })
      .catch(err => {
        this.setState({ err: err });
      });
  }

  render() {
    const { err } = this.state;
    return this.props.render({
      err,
      onSuggestionSelected: this.onSuggestionSelected.bind(this)
    });
  }
}

LocationSearchContainer.propTypes = {
  onCoords: PropTypes.func.isRequired,
  render: PropTypes.func.isRequired
};
export default LocationSearchContainer;
