import * as React from 'react'
import { shallow, render } from 'enzyme'
import BookmarkList from './BookmarkList'

it('renders without crashing', () => {
  shallow(<BookmarkList />)
})
