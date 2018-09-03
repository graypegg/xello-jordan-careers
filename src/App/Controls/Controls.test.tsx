import { IControlsState } from '../../types'

import * as React from 'react'
import { shallow, render } from 'enzyme'
import Controls from './Controls'

const onControlsStateChangeMock = (x: IControlsState) => ({ searchString: '' } as IControlsState)
const controlsStateMock: IControlsState = { searchString: '', showImages: false, showStatuses: [] }

it('renders without crashing', () => {
  shallow(<Controls onChange={onControlsStateChangeMock} controlsState={controlsStateMock} />)
})

describe('can render basic form', () => {
  const onChange = (state: IControlsState) => console.log(state) 
  const wrapper = render(<Controls onChange={onChange} controlsState={controlsStateMock} />)
  expect(wrapper).toMatchSnapshot();
})

describe('returns an updated IControlsState', () => {
  it('update searchString', () => {
    const onChange = (newState: IControlsState) => expect(newState).toEqual({
      ...controlsStateMock,
      searchString: 'test'
    } as IControlsState)
    const wrapper = shallow(<Controls onChange={onChange} controlsState={controlsStateMock} />)
    wrapper.find('.Controls__searchInput').simulate('change', { currentTarget: { value: 'test' } })
  })

  it('update showImages', () => {
    const onChange = (newState: IControlsState) => expect(newState).toEqual({
      ...controlsStateMock,
      showImages: true
    } as IControlsState)
    const wrapper = shallow(<Controls onChange={onChange} controlsState={controlsStateMock} />)
    wrapper.find('.Controls__showImagesInput').simulate('change', { currentTarget: { checked: true } })
  })

  it('filters out bad search input', () => {
    localStorage.clear()
    const onChange = (newState: IControlsState) => expect(newState).toEqual({
      ...controlsStateMock,
      searchString: '^tes.*t$'
    } as IControlsState)
    const wrapper = shallow(<Controls onChange={onChange} controlsState={controlsStateMock} />)
    wrapper.find('.Controls__searchInput').simulate('change', { currentTarget: { value: '*\\^te~`s*(t$' } })
  })
})