import { ISearchState } from '../../types'

import * as React from 'react'
import { shallow } from 'enzyme'
import Controls from './Controls'

const s = (x: ISearchState) => ({ searchString: '' } as ISearchState)

it('renders without crashing', () => {
  shallow(<Controls onChange={s} />)
})
