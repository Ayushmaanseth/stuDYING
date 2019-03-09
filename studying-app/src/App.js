import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Registration from './Registration.js'
import Feed from './Feed';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Registration />
      </div>
    );
  }
}

export default App;
