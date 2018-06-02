import * as React from 'react'
import { shallow } from 'enzyme'
import Sidebar from './Sidebar'

it('renders without crashing', () => {
  const wrapper = shallow(<Sidebar icon="abc">xyz</Sidebar>)
  expect(wrapper).toMatchSnapshot()
})

describe('toggle button', () => {
  const wrapper = shallow(<Sidebar icon="abc">xyz</Sidebar>)

  it('opens when the toggle button is clicked initially', () => {
    wrapper.find('.Sidebar__toggleButton').simulate('click')
    expect(wrapper.find('aside').hasClass('Sidebar__wrapper--open')).toBe(true)
  })

  it('closes when the toggle button is clicked again', () => {
    wrapper.find('.Sidebar__toggleButton').simulate('click')
    expect(wrapper.find('aside').hasClass('Sidebar__wrapper--closed')).toBe(true)
  })
})