import React from 'react'
import renderer from 'react-test-renderer'
import ChartPie from '../../src/components/ChartPie'
import {ProcessedUserData} from '../userData'
const data = ProcessedUserData.percentageByGender
const colors = ['#333', '#eee']
const category = 'gender'

test('Pie Charts render correctly', () => {
  const component = renderer.create(
    <ChartPie
      data={data}
      colors={colors}
      category={category}
    />)

  const tree = component.toJSON()

  expect(tree).toMatchSnapshot()

})
