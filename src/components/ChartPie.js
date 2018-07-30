import React from 'react'
import {PieChart, Pie, Cell, Tooltip, Legend} from 'recharts'
import {setChartSize} from '../utils'

const ChartPie = ({data, colors, category}) => {
  if (!data) {
    data = {
      males: 51,
      females: 49
    },
    colors = ['ccc', '666']
  }
  const dataArray = data ? Object.keys(data).map((catName, index) => ({
    name: catName,
    value: data[catName],
    color: colors[index % colors.length]
  })) : null

  return (
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
    </div>
  )
}

export default ChartPie
