import React from 'react'
import ChartPie from './ChartPie'
import ChartBar from './ChartBar'
import {Switch, Route} from 'react-router-dom'
import UploadDataForm from './UploadDataForm'
import toastr from 'toastr'
import '../styles/ChartContainer.css'

class ChartContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      userData: {},
      colors: ['#90a4ae', '#ff8a65', '#a1887f', '#aed581', '#7986cb', '#e57373']
    }
    this.isJSON = this.isJSON.bind(this)
    this.handleDataUpload = this.handleDataUpload.bind(this)
  }

  isJSON(data) {
    try {
      const object = JSON.parse(data)
      return object && typeof object === 'object'
    } catch (error) {
      return false
    }
  }

  handleDataUpload() {
    const file = document.getElementById('UploadJSONFile').files[0]

    const pastedData = document.getElementById('json').value
    if (file || this.isJSON(pastedData)) {
      fetch('/api/data', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: file ? file : pastedData
      }).then(res => res.json())
      .then(data => {
        this.setState({userData: data})
        toastr.success('Data Uploaded Successfully!')
      })
      .catch((() => toastr.error('There was a problem with your JSON data')))
    } else {
      toastr.error('That\'s not JSON!')
    }
  }

  render() {
    return (
      <div className='ChartContainer'>
        <UploadDataForm handleDataUpload={this.handleDataUpload} />
          <Switch>
            <Route
              path='/gender'
              render={() => <ChartPie data={this.state.userData.percentageByGender} colors={this.state.colors} category='gender' />}
            />
            <Route
              path='/firstName'
              render={({match}) => <ChartPie data={this.state.userData.percentageByFirstName} colors={this.state.colors} category='first name' />}
            />
            <Route
              path='/lastName'
              render={() => <ChartPie data={this.state.userData.percentageByLastName} colors={this.state.colors} category='last name' />}
            />
            <Route
              path='/age'
              render={({match}) => <ChartBar data={this.state.userData.percentageByAge ?this.state.userData.percentageByAge: null} type='age' colors={this.state.colors} />}
            />
            <Route
              path='/state'
              render={({match}) => <ChartBar data={this.state.userData.percentageByState ? this.state.userData.percentageByState: null} type='state' colors={this.state.colors} />}
            />
          </Switch>
      </div>
    )
  }
}

export default ChartContainer
