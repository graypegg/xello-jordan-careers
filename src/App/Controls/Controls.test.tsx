import { ISearchState } from '../../types'

import * as React from 'react'
import { shallow } from 'enzyme'
import Controls from './Controls'

const s = (x: ISearchState) => ({ searchString: '' } as ISearchState)

it('renders without crashing', () => {
  shallow(<Controls onChange={s} />)
})

describe('can render a simple career', () => {
  const onChange = (state: ISearchState) => console.log(state) 
  const wrapper = shallow(<Controls onChange={onChange}/>)

  it('rendered a search box', () => {
    expect(wrapper.find('input').length).toBe(1)
  })
})