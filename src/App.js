import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { Router } from 'react-router-dom';
import history from './history';
import Layouts from './layouts/Layouts';
import stores from './stores/index';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider {...stores}>
        <Router history={history}>
          <div className="App">
            <Layouts />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
