import { ICareer } from '../../types'

import * as React from 'react'
import { shallow } from 'enzyme'

import CareerList from './CareerList'
import Career from './Career/Career'

it('renders without crashing', () => {
  shallow(<CareerList careers={[]} showImages={false} />)
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
  const wrapper = shallow(<CareerList careers={careers} showImages={false} />)
  const career = wrapper.find(Career)

  it('rendered one career', () => {
    expect(career.length).toBe(1)
  })

  it('passing correct props to Career', () => {
    expect(career.props().career).toEqual(careers[0])
  })
})