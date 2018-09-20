import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import Layouts from './layouts/Layouts';
import stores from './stores/index';
import './App.css';
import 'ant-design-pro/dist/ant-design-pro.css';

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
