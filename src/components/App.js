import React, { Component } from 'react';
import '../styles/App.css'
import Header from './Header'
import ChartContainer from './ChartContainer'
import {BrowserRouter} from 'react-router-dom'
import toastr from 'toastr'
import {fetchUserData} from '../utils'

class App extends Component {
  constructor() {
    super()
    this.state = {
      userData: {}
    }
    this.handleDataUpload = this.handleDataUpload.bind(this)
  }

  handleDataUpload() {
    fetchUserData()
      .then(data => {
        if (data === 'Not JSON') {
          toastr.error('That\'s not JSON!')
        } else {
          this.setState({userData: data})
          toastr.success('Data Uploaded Successfully!')
        }
      })
      .catch((() => toastr.error('There was a problem with your JSON data')))
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header handleDataUpload={this.handleDataUpload} />
          <ChartContainer userData={this.state.userData} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
