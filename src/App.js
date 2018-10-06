import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import Layouts from './layouts/Layouts';
import Login from './containers/Page/Login/Login';
import stores from './stores/index';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Provider {...stores}>
        <Router history={history}>
          <div className="App">
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/" component={Layouts} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
