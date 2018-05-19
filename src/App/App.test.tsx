import * as React from 'react'
import { shallow } from 'enzyme'
import App from './App'

it('renders without crashing', () => {
  shallow(<App careers={[]} />)
})

it('can update search state', () => {
  const component = shallow(<App careers={[]} />)
  expect(component.state('controlState').searchString).toBe('')

  const instance = component.instance() as App
  instance.onControlStateChange({ searchString: 'test' })

  expect(component.state('controlState').searchString).toBe('test')
})