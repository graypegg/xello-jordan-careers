import { ICareer } from '../../types'

import * as React from 'react'
import { shallow } from 'enzyme'
import CareerList from './CareerList'

it('renders without crashing', () => {
  shallow(<CareerList careers={[]} />)
})

describe('can render a simple career', () => {
  const careers: ICareer[] = [
    {
      title: 'Test',
      description: 'Test',
      notes: ['a', 'b'],
      image: 'TestImage',
      id: 1
    }
  ]
  const wrapper = shallow(<CareerList careers={careers} />)
  const career = wrapper.find('.CareerList__career')

  it('rendered one career', () => {
    expect(career.length).toBe(1)
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

  it('rendered an image', () => {
    wrapper.setProps({ showImages: true })
    const careerWithImages = wrapper.find('.CareerList__career')
    expect(careerWithImages.find('img').length).toBeGreaterThan(0)
    expect(careerWithImages.find('img').props().src).toBe('TestImage')
  })
})