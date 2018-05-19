import { IControlsState } from '../types'

import * as React from 'react'
import { shallow } from 'enzyme'
import App from './App'

const controlsStateMock: IControlsState = { searchString: '', showImages: false }

it('renders without crashing', () => {
  shallow(<App careers={[]} />)
})

it('can update search state', () => {
  const component = shallow(<App careers={[]} />)
  expect(component.state('controlsState').searchString).toBe('')

  const instance = component.instance() as App
  instance.onControlsStateChange({ ...controlsStateMock, searchString: 'test' })

  expect(component.state('controlsState').searchString).toBe('test')
})