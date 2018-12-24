import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import Map from './components/Map'
import Controls from './components/Controls'

class App extends Component {
  render() {
    return (
      <CssBaseline>
        <Controls />
        <Map/>
      </CssBaseline>

    )
  }
}

export default App;
