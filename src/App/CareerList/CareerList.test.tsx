import { ICareer, IBookmark } from '../../types'

import * as React from 'react'
import { shallow } from 'enzyme'

import CareerList from './CareerList'
import Career from './Career/Career'

const onSaveBookmarkMock = (_: ICareer) => { /* */ }

it('renders without crashing', () => {
  shallow(<CareerList careers={[]} showImages={false} pageLength={20} onSaveBookmark={onSaveBookmarkMock} bookmarks={[]} />)
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
  const wrapper = shallow(<CareerList careers={careers} showImages={false} pageLength={20} onSaveBookmark={onSaveBookmarkMock} bookmarks={[]} />)
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

  const wrapper = shallow(<CareerList careers={careers} showImages={false} pageLength={1} onSaveBookmark={onSaveBookmarkMock} bookmarks={[]} />)

  expect(wrapper.find(Career).length).toBe(1)
})

describe('pageination link list', () => {
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

  const wrapper = shallow(<CareerList careers={careers} showImages={false} pageLength={1} onSaveBookmark={onSaveBookmarkMock} bookmarks={[]} />)

  it('renders the link list container', () => expect(wrapper.find('.CareerList__pagination').length).toBe(1))
  it('renders the unselected links', () => expect(wrapper.find('.CareerList__paginationLink').length).toBe(2))
  it('renders the single selected link', () => expect(wrapper.find('.CareerList__paginationLink--active').length).toBe(1))

  it('clicking the selected link does nothing', () => {
    wrapper.find('.CareerList__paginationLink--active').simulate('click')
    expect(wrapper.state().onPage).toBe(0)
    expect(wrapper.find(Career).first().props().career).toEqual(careers[0])
  })

  it('clicking a link that is unselected advances the list of careers', () => {
    wrapper.find('.CareerList__paginationLink').last().simulate('click')
    expect(wrapper.state().onPage).toBe(2)
    expect(wrapper.find(Career).first().props().career).toEqual(careers[2])
  })
})

it('should show a message when no items are being shown', () => {
  const wrapper = shallow(<CareerList careers={[]} showImages={false} pageLength={1} onSaveBookmark={onSaveBookmarkMock} bookmarks={[]} />)

  expect(wrapper.find(Career).length).toBe(0)
  expect(wrapper.find('.CareerList__noItemsMessage').first().text()).toBe('Sorry! No items match your search.')
})

it('should mark bookmarked careers', () => {
  const careers: ICareer[] = [
    {
      title: 'Test',
      description: 'Test',
      notes: ['a', 'b'],
      image: 'TestImage',
      id: 1
    }
  ]
  const bookmarks: IBookmark[] = [
    {
      career: Object.assign(careers[0], {}),
      saved: new Date()
    }
  ]

  const wrapper = shallow(<CareerList careers={careers} showImages={false} pageLength={1} onSaveBookmark={onSaveBookmarkMock} bookmarks={bookmarks} />)

  expect(wrapper.find(Career).length).toBe(1)
  expect(wrapper.find(Career).props().isBookmarked).toBe(true)
})