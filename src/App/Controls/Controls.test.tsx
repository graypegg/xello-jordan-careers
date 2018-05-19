import { IControlState } from '../../types'

import * as React from 'react'
import { shallow } from 'enzyme'
import Controls from './Controls'

const s = (x: IControlState) => ({ searchString: '' } as IControlState)

it('renders without crashing', () => {
  shallow(<Controls onChange={s} />)
})

describe('can render a simple career', () => {
  const onChange = (state: IControlState) => console.log(state) 
  const wrapper = shallow(<Controls onChange={onChange}/>)

  it('rendered a search box', () => {
    expect(wrapper.find('input').length).toBe(1)
  })
})