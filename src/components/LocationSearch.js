import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MUIPlacesAutocomplete from 'mui-places-autocomplete';
import { geocodeBySuggestion } from 'mui-places-autocomplete';

class LocationSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      })
      .catch(err => {
        this.setState({ err: err });
      });
  }

  render() {
    const { label } = this.props;
    return (
      <div>
        <MUIPlacesAutocomplete
          onSuggestionSelected={this.onSuggestionSelected.bind(this)}
          renderTarget={() => <div />}
          textFieldProps={{ label }}
        />
      </div>
    );
  }
}

LocationSearch.propTypes = {
  label: PropTypes.string.isRequired,
  onCoords: PropTypes.func.isRequired,
  onSuggestionSelected: PropTypes.func.isRequired
};
export default LocationSearch;
