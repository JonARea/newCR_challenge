import React from 'react'
import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Cell} from 'recharts'
import '../styles/ChartBar.css'
import PropTypes from 'prop-types'

class ChartBar extends React.Component {
  constructor() {
    super()
    this.state = {
      category: 'overall'
    }
  }

  render() {
    const {data, type, colors, history, location} = this.props
    let xAxis, barValue
    if (type === 'state') {
      xAxis = 'state'
      barValue = 'percentage'
    } else if (type === 'age') {
      xAxis = 'range'
      barValue = 'percentage'
    }

    return (data ?
      <div className='ChartBarContainer'>
        <h2>{`Percentages by ${type}`}</h2>
        <h3 className='ChartBarFilterHeader'>Filter by Category</h3>
        <div className='ChartBarCategoryContainer'>
          <div
            className={location.pathname.includes('overall') ? 'ChartBarCategory ChartBarCategoryActive' : 'ChartBarCategory'}
            onClick={() => {
              this.setState({category: 'overall'})
              history.push(`/${type}/overall`)
            }}
          >
            Overall
          </div>
          <div
            className={location.pathname.includes('females') ? 'ChartBarCategory ChartBarCategoryActive' : 'ChartBarCategory'}
            onClick={() => {
              this.setState({category: 'females'})
              history.push(`/${type}/females`)
            }}
          >
            Females
          </div>
          <div
            className={location.pathname.includes('males') && !location.pathname.includes('females') ? 'ChartBarCategory ChartBarCategoryActive' : 'ChartBarCategory'}
            onClick={() => {
              this.setState({category: 'males'})
              history.push(`/${type}/males`)
            }}
          >
            Males
          </div>
        </div>
        <BarChart
          width={window.innerWidth}
          height={window.innerHeight - 150}
          data={data[this.state.category]}
          margin={{top: 20, right: 20, left: 20, bottom: 20}}
        >
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey={xAxis} />
          <YAxis/>
          <Tooltip/>
          <Bar dataKey={barValue}>
            {data ? data[this.state.category].map((bar, index) =>
              <Cell
                fill={colors[index % colors.length]}
                key={bar.name}
              >
                {bar.percentage}
              </Cell>
            ): null}
          </Bar>
        </BarChart>
      </div> : <h2>Please upload some data</h2>
    )
  }
}

ChartBar.propTypes = {
  data: PropTypes.object,
  colors: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default ChartBar
