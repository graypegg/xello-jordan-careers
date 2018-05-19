import { ICareer } from '../../types'

import * as React from 'react'
import { mount } from 'enzyme'
import CareerList from './CareerList'

it('renders without crashing', () => {
  mount(<CareerList careers={[]} />)
})

describe('can render a simple career', () => {
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

  it('rendered one career', () => {
    expect(career).toHaveLength(1)
  })

  it('rendered a title', () => {
    expect(career.find('h1').text()).toBe(careers[0].title)
  })

  it('rendered a description', () => {
    expect(career.find('p').text()).toBe(careers[0].description)
  })

  it('rendered a notes list', () => {
    expect(career.children('ul').find('li').at(0).text()).toBe('a')
    expect(career.children('ul').find('li').at(1).text()).toBe('b')
  })
})