import React from 'react'
import {PieChart, Pie, Cell, Tooltip, Legend} from 'recharts'
import {setChartSize} from '../utils'
import PropTypes from 'prop-types'

const ChartPie = ({data, colors, category}) => {
  const dataArray = data ? Object.keys(data).map((catName, index) => ({
    name: catName,
    value: data[catName],
    color: colors[index % colors.length]
  })) : null

  return (dataArray ?
    <div>
      <h2>{`Percentages by ${category}`}</h2>
      <PieChart
        width={window.innerWidth}
        height={window.innerHeight - 150}
        >
        <Legend />
        <Pie
          data={dataArray}
          dataKey="value"
          nameKey="name"
          cx={'50%'}
          cy={'50%'}
          outerRadius={setChartSize()}
          fill="#8884d8"
          label
          >
          { dataArray &&
            dataArray.map(elem => (
              <Cell fill={elem.color} key={elem.name}>
                {elem.name}
              </Cell>))
          }
        </Pie>
        <Tooltip />
      </PieChart>
    </div> : <h2>Please upload some data</h2>
  )
}

ChartPie.propTypes = {
  data: PropTypes.object,
  colors: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired
}

export default ChartPie
