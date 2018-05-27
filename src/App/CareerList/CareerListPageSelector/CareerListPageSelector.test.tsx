import * as React from 'react'
import { shallow } from 'enzyme'

import CareerListPageSelector from './CareerListPageSelector'

const onChangeMock = () => null

describe('pageination link list', () => {
  const wrapper = shallow(<CareerListPageSelector totalPages={3} currentPage={1} onChange={onChangeMock} />)
  it('renders the link list container', () => expect(wrapper.find('.CareerListPageSelector__pagination').length).toBe(1))
  it('renders the unselected links', () => expect(wrapper.find('.CareerListPageSelector__paginationLink').length).toBe(2))
  it('renders the single selected link', () => expect(wrapper.find('.CareerListPageSelector__paginationLink--active').length).toBe(1))
})