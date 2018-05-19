import * as React from 'react'
import { shallow } from 'enzyme'
import App from './App'

it('renders without crashing', () => {
  shallow(<App careers={[]} />)
})

it('can update search state', () => {
  const component = shallow(<App careers={[]} />)
  expect(component.state('searchState').searchString).toBe('')

  const instance = component.instance() as App
  instance.onSearchStateChange({ searchString: 'test' })

  expect(component.state('searchState').searchString).toBe('test')
})