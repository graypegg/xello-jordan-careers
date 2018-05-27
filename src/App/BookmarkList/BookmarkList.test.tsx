import { IBookmark, ICareer } from '../../types'

import * as React from 'react'
import { shallow } from 'enzyme'
import BookmarkList from './BookmarkList'

const onChangeMock = (_: IBookmark[]) => null

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