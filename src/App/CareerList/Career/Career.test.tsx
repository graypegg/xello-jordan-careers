import { ICareer } from '../../../types'

import * as React from 'react'
import { shallow } from 'enzyme'
import Career from './Career'

const career: ICareer = {
  title: 'Test',
  description: 'Test',
  notes: ['a', 'b'],
  image: 'TestImage',
  id: 1
}

it('renders without crashing', () => {
  shallow(<Career career={career} showImage={false} />)
})

describe('can render a simple career', () => {
  
  const component = shallow(<Career career={career} showImage={false} />)

  it('rendered a title', () => {
    expect(component.find('h1').text()).toBe(career.title)
  })

  it('rendered a description', () => {
    expect(component.find('p').text()).toBe(career.description)
  })

  it('rendered a notes list', () => {
    expect(component.children('ul').find('li').at(0).text()).toBe(career.notes[0])
    expect(component.children('ul').find('li').at(1).text()).toBe(career.notes[1])
  })

  describe('can render a simple career', () => {
    it('does not render an image when props.showImages == false', () => {
      expect(component.find('img').length).toBe(0)
    })

    it('renders an image when props.showImages == true', () => {
      const careerWithImage = shallow(<Career career={career} showImage={true} />)
      expect(careerWithImage.find('img').length).toBeGreaterThan(0)
      expect(careerWithImage.find('img').props().src).toBe(career.image)
    })
  })
})