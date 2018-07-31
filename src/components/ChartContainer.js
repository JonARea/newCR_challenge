import React from 'react'
import ChartPie from './ChartPie'
import ChartBar from './ChartBar'
import {Switch, Route} from 'react-router-dom'
import '../styles/ChartContainer.css'
import PropTypes from 'prop-types'

class ChartContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      colors: ['#90a4ae', '#ff8a65', '#a1887f', '#aed581', '#7986cb', '#e57373']
    }
  }

  render() {
    return (
      <div className='ChartContainer'>
          <Switch>
            <Route
              path='/gender'
              render={() =>
                <ChartPie
                  data={this.props.userData.percentageByGender}
                  colors={this.state.colors}
                  category='gender'
                />
              }
            />
            <Route
              path='/firstName'
              render={() =>
                <ChartPie
                  data={this.props.userData.percentageByFirstName}
                  colors={this.state.colors}
                  category='first name'
                />
              }
            />
            <Route
              path='/lastName'
              render={() =>
                <ChartPie
                  data={this.props.userData.percentageByLastName}
                  colors={this.state.colors}
                  category='last name'
                />
              }
            />
            <Route
              path='/age'
              render={({location, history}) =>
                <ChartBar
                  data={this.props.userData.percentageByAge}
                  type='age'
                  colors={this.state.colors}
                  location={location}
                  history={history}
                />
              }
            />
            <Route
              path='/state'
              render={({location, history}) =>
                <ChartBar
                  data={this.props.userData.percentageByState}
                  type='state'
                  colors={this.state.colors}
                  location={location}
                  history={history}
                />
              }
            />
          </Switch>
      </div>
    )
  }
}

ChartContainer.propTypes = {
  userData: PropTypes.object.isRequired
}

export default ChartContainer
