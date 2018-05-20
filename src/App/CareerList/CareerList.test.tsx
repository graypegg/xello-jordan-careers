import { ICareer } from '../../types'

import * as React from 'react'
import { shallow } from 'enzyme'

import CareerList from './CareerList'
import Career from './Career/Career'

it('renders without crashing', () => {
  shallow(<CareerList careers={[]} showImages={false} pageLength={20} />)
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
  const wrapper = shallow(<CareerList careers={careers} showImages={false} pageLength={20} />)
  const career = wrapper.find(Career)

  it('rendered one career', () => {
    expect(career.length).toBe(1)
  })

  it('passing correct props to Career', () => {
    expect(career.props().career).toEqual(careers[0])
  })
})

it('creates pages according to pageLength prop', () => {
  const careers: ICareer[] = [
    {
      title: 'Test1',
      description: 'Test1',
      notes: ['a1', 'b1'],
      image: 'TestImage1',
      id: 1
    },
    {
      title: 'Test2',
      description: 'Test2',
      notes: ['a2', 'b2'],
      image: 'TestImage2',
      id: 2
    },
    {
      title: 'Test3',
      description: 'Test3',
      notes: ['a3', 'b3'],
      image: 'TestImage3',
      id: 3
    }
  ]

  const wrapper = shallow(<CareerList careers={careers} showImages={false} pageLength={1} />)

  expect(wrapper.find(Career).length).toBe(1)
})