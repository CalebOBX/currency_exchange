import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../containers/Home';
import '../css/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      //
    }    
  }

  render() {
    return (
      <div>
        <nav>
          <h1>Another Currency Converter App</h1>
        </nav>
        <BrowserRouter>
          <Home />  
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
