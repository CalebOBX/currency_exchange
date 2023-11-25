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
      <>
        <header>
          <h1>Another Currency Converter App</h1>
          <p>Convert between 33 different currencies adjusting the base and amount.</p>
        </header>
        <div id='main'>
          <BrowserRouter>
            <Home />  
          </BrowserRouter>
        </div>
        <footer>
          <p>Created using the <a href='https://www.frankfurter.app/'>Frankfurter API</a>.</p>
        </footer>
      </>
    );
  }
}

export default App;
