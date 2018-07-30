import React, { Component } from 'react';
import '../styles/App.css'
import Header from './Header'
import ChartContainer from './ChartContainer'
import {BrowserRouter} from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <ChartContainer />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
