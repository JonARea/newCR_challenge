import React from 'react'
import renderer from 'react-test-renderer'
import ChartBar from '../../src/components/ChartBar'
import {ProcessedUserData} from '../userData'
import createHistory from 'history/createMemoryHistory'
const history = createHistory()
const colors = ['#333', '#eee']
const type = 'age'
const data = ProcessedUserData.percentageByAge
const location = {
  pathname: '/age/overall'
}

test('Bar Charts render correctly', () => {
  const component = renderer.create(
    <ChartBar
      data={data}
      colors={colors}
      type={type}
      history={history}
      location={location}
    />)

  const tree = component.toJSON()

  expect(tree).toMatchSnapshot()

})
