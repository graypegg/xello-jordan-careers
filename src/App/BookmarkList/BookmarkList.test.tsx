import { IBookmark, ICareer } from '../../types'

import * as React from 'react'
import { shallow } from 'enzyme'
import BookmarkList from './BookmarkList'

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
  shallow(<BookmarkList bookmarks={[]} />)
})

it('renders a single bookmark', () => {
  const wrapper = shallow(<BookmarkList bookmarks={bookmarks} />)
  expect(wrapper.find('.BookmarkList__bookmark').length).toBe(1)
})