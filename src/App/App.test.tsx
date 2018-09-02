import { IControlsState, IBookmark, ICareer } from '../types'

import * as React from 'react'
import { shallow } from 'enzyme'
import App from './App'

const controlsStateMock: IControlsState = { searchString: '', showImages: false, showStatuses: [] }
const bookmarkStateMock: IBookmark[] = [
  {
    career: {
      title: 'Test',
      description: 'Test',
      notes: ['a', 'b'],
      image: 'TestImage',
      id: 1
    } as ICareer,
    saved: new Date(Date.now())
  }
]

it('renders without crashing', () => {
  shallow(<App careers={[]} />)
})

it('can update control state', () => {
  const component = shallow(<App careers={[]} />)
  expect(component.state('controlsState')).toMatchSnapshot()

  const instance = component.instance() as App
  instance.onControlsStateChange({ ...controlsStateMock, searchString: 'test' })

  component.update()

  expect(component.state('controlsState')).toMatchSnapshot()
})

it('can update bookmark state', () => {
  const component = shallow(<App careers={[]} />)
  expect(component.state('bookmarks')).toMatchSnapshot()

  const instance = component.instance() as App
  instance.onSaveBookmark(bookmarkStateMock[0].career)

  component.update()

  expect(component.state('bookmarks').length).toBe(1)
  expect(component.state('bookmarks')[0].career).toEqual(bookmarkStateMock[0].career)
})

it('can update bookmark state in it\'s entirity', () => {
  const component = shallow(<App careers={[]} />)
  expect(component.state('bookmarks')).toMatchSnapshot()

  const instance = component.instance() as App
  instance.updateBookmarks(bookmarkStateMock)

  component.update()

  expect(component.state('bookmarks')).toMatchSnapshot()
})