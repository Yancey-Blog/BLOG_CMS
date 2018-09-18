import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import Layouts from './layout/Layout';
import stores from './stores/index';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider {...stores}>
        <div className="App">
          <Layouts />
        </div>
      </Provider>
    );
  }
}

export default App;
