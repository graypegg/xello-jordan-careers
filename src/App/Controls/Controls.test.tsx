import { IControlsState } from '../../types'
import { EStatus } from '../../consts'

import * as React from 'react'
import { shallow, render } from 'enzyme'
import Controls from './Controls'

const onControlsStateChangeMock = (x: IControlsState) => ({ searchString: '' } as IControlsState)
const controlsStateMock: IControlsState = { searchString: '', showImages: false, showStatuses: [], currentRevision: 0 }

it('mounts', () => {
  shallow(<Controls onChange={onControlsStateChangeMock} controlsState={controlsStateMock} />)
  expect(localStorage.setItem.mock.calls).toMatchSnapshot()
})

describe('can render basic form', () => {
  const onChange = (state: IControlsState) => console.log(state) 
  const wrapper = render(<Controls onChange={onChange} controlsState={controlsStateMock} />)
  expect(wrapper).toMatchSnapshot();
})

describe('returns an updated IControlsState', () => {
  it('update searchString', () => {
    const onChange = (newState: IControlsState) => {
      expect(newState).toEqual({
        ...controlsStateMock,
        searchString: 'test'
      } as IControlsState)
      expect(localStorage.setItem.mock.calls).toMatchSnapshot()
    }
    const wrapper = shallow(<Controls onChange={onChange} controlsState={controlsStateMock} />)
    wrapper.find('.Controls__searchInput').simulate('change', { currentTarget: { value: 'test' } })
  })

  Object.keys(EStatus).forEach((statusKey) => {
    it(`can toggle ${EStatus[statusKey]}`, () => {
      const onChange = jest.fn()
      const wrapper = shallow(<Controls onChange={onChange} controlsState={controlsStateMock} />)
      wrapper.find(`.Controls__statusToggle--${statusKey}`).simulate('change', {})
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toBeCalledWith({
        ...controlsStateMock,
        showStatuses: [EStatus[statusKey]]
      })
      expect(localStorage.setItem.mock.calls).toMatchSnapshot()
    })
  })

  it('update showImages', () => {
    const onChange = (newState: IControlsState) => {
      expect(newState).toEqual({
        ...controlsStateMock,
        showImages: true
      } as IControlsState)
      expect(localStorage.setItem.mock.calls).toMatchSnapshot()
    }
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

it('emits onGlobalRestore', () => {
  const onGlobalRestoreMock = jest.fn()
  const wrapper = shallow(<Controls onChange={onControlsStateChangeMock} controlsState={controlsStateMock} onGlobalRestore={onGlobalRestoreMock} />)
  wrapper.find('.Controls__saveButtons button').simulate('click', {})
  expect(onGlobalRestoreMock).toBeCalled()
})

it('emits onGlobalSave', () => {
  const onGlobalSaveMock = jest.fn()
  const wrapper = shallow(<Controls onChange={onControlsStateChangeMock} controlsState={controlsStateMock} onGlobalSave={onGlobalSaveMock} />)
  wrapper.find('.Controls__saveButtons button').simulate('click', {})
  expect(onGlobalSaveMock).toBeCalled()
})
