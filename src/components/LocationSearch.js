import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Snackbar from '@material-ui/core/Snackbar';
import MUIPlacesAutocomplete, {
  geocodeBySuggestion
} from 'mui-places-autocomplete';

class LocationSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      coordinates: null,
      errorMessage: null
    };
  }

  onClose() {
    this.setState({ open: false, coordinates: null, errorMessage: null });
  }

  onSuggestionSelected(suggestion) {
    geocodeBySuggestion(suggestion)
      .then(results => {
        if (results.length < 1) {
          this.setState({
            open: true,
            errorMessage:
              'Geocode request completed successfully but without any results'
          });

          return;
        }

        const { geometry } = results[0];

        const coordinates = {
          lat: geometry.location.lat(),
          lng: geometry.location.lng()
        };
        this.props.onCoords(coordinates);
        this.setState({ open: true, coordinates });
      })
      .catch(err => {
        this.setState({ open: true, errorMessage: err.message });
      });
  }

  renderMessage() {
    const { coordinates, errorMessage } = this.state;

    if (coordinates) {
      return `Selected suggestions geocoded latitude is ${
        coordinates.lat
      } and longitude is ${coordinates.lng}`;
    } else if (errorMessage) {
      return `Failed to geocode suggestion because: ${errorMessage}`;
    }

    return null;
  }

  render() {
    const { open } = this.state;
    const { label } = this.props;
    return (
      <div>
        <MUIPlacesAutocomplete
          onSuggestionSelected={this.onSuggestionSelected.bind(this)}
          renderTarget={() => <div />}
          textFieldProps={{ label }}
        />
        <Snackbar
          onClose={this.onClose.bind(this)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          autoHideDuration={5000}
          open={open}
          message={<span>{this.renderMessage()}</span>}
          style={{ width: '70vw' }}
        />
      </div>
    );
  }
}

LocationSearch.propTypes = {
  label: PropTypes.string.isRequired,
  onCoords: PropTypes.func.isRequired
};
export default LocationSearch;
