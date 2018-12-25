import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import NavigationContainer from './containers/NavigationContainer';
import Navigation from './components/Navigation';

class App extends Component {
  render() {
    return (
      <CssBaseline>
        <NavigationContainer render={props => <Navigation {...props} />} />
      </CssBaseline>
    );
  }
}

export default App;
