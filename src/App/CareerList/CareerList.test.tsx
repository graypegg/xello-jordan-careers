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

  describe('can render a simple career', () => {
    it('does not render an image when props.showImages == false', () => {
      expect(career.find('img').length).toBe(0)
    })

    it('renders an image when props.showImages == true', () => {
      const wrapperWithImages = shallow(<CareerList careers={careers} showImages={true} />)
      const careerWithImages = wrapperWithImages.find('.CareerList__career')
      expect(careerWithImages.find('img').length).toBeGreaterThan(0)
      expect(careerWithImages.find('img').props().src).toBe('TestImage')
    })
  })
})