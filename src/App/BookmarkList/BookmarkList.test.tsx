import { IBookmark, ICareer } from '../../types'

import * as React from 'react'
import { shallow } from 'enzyme'
import BookmarkList from './BookmarkList'
import BookmarkPopup from './BookmarkPopup/BookmarkPopup'

const onChangeMock = (_: IBookmark[]) => {/* void */}

const bookmarks: IBookmark[] = [
  {
    career: {
      title: 'Test',
      description: 'Test',
      notes: ['a', 'b'],
      image: 'TestImage',
      id: 1
    } as ICareer,
    saved: new Date()
  }
]

it('renders without crashing', () => {
  shallow(<BookmarkList bookmarks={[]} onChange={onChangeMock} />)
})

it('renders a single bookmark', () => {
  const wrapper = shallow(<BookmarkList bookmarks={bookmarks} onChange={onChangeMock} />)
  expect(wrapper.find('.BookmarkList__bookmark').length).toBe(1)
})

it('fires onChange when deleting a bookmark', () => {
  const onChangeMockSpied = jest.fn().mockImplementation((_: IBookmark[]) => {/* void */})
  const wrapper = shallow(<BookmarkList bookmarks={bookmarks} onChange={onChangeMockSpied} />)
  wrapper.find('.BookmarkList__deleteBookmarkButton').first().simulate('click')
  expect(onChangeMockSpied).toHaveBeenCalledWith([])
})

it('opens a BookmarkPopup when a bookmark is clicked', () => {
    const wrapper = shallow(<BookmarkList bookmarks={bookmarks} onChange={onChangeMock} />)
    wrapper.find('.BookmarkList__label').first().simulate('click')
    expect(wrapper.find(BookmarkPopup).length).toBe(1)
    expect(wrapper.find(BookmarkPopup).props().career).toEqual(bookmarks[0].career)
})