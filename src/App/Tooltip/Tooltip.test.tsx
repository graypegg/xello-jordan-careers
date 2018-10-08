import * as React from 'react'
import { shallow } from 'enzyme'
import Tooltip from './Tooltip'

it('renders without crashing', () => {
  const wrapper = shallow(<Tooltip title="xyz" content="abc">ailurus fulgens</Tooltip>)
  expect(wrapper).toMatchSnapshot()
})

it('hides when active is false', () => {
  const wrapper = shallow(<Tooltip title="xyz" content="abc" active={false}>ailurus fulgens</Tooltip>)
  expect(wrapper.find('.Tooltip__tooltip').length).toBe(0);
})

it('shows when active is true', () => {
  const wrapper = shallow(<Tooltip title="xyz" content="abc" active={true}>ailurus fulgens</Tooltip>)
  expect(wrapper.find('.Tooltip__tooltip').length).toBe(1);
})

it('can show with out a title', () => {
  const wrapper = shallow(<Tooltip content="abc">ailurus fulgens</Tooltip>)
  expect(wrapper).toMatchSnapshot()
})