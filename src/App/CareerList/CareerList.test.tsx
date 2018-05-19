import { ICareer } from '../types'

import * as React from 'react'
import { mount } from 'enzyme'
import CareerList from './CareerList'

it('renders without crashing', () => {
  mount(<CareerList careers={[]} />)
})

it('can render a simple career', () => {
  const careers: ICareer[] = [
    {
      title: 'Test',
      description: 'Test',
      notes: ['a', 'b'],
      careerImage: 'Test',
      careerId: 1
    }
  ]
  const wrapper = mount(<CareerList careers={careers} />)
  const career = wrapper.find('.CareerList__career')
  expect(career).toHaveLength(1)
  expect(career[0].find('h1').text()).toBe(careers[0].title)
})