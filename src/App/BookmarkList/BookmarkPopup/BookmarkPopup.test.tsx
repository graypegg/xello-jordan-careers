import { ICareer } from '../../../types'

import * as React from 'react'
import { shallow } from 'enzyme'
import BookmarkPopup from './BookmarkPopup'
import Career from '../../CareerList/Career/Career'

const onCloseMock = () => {/* void */ }
const onChangeMock = (_: ICareer) => {/* void */}

const career: ICareer = {
  title: 'Test',
  description: 'Test',
  notes: ['a', 'b'],
  image: 'TestImage',
  id: 1
}

it('renders without crashing', () => {
  shallow(<BookmarkPopup career={career} onClose={onCloseMock} onChangeCareer={onChangeMock} />)
})

it('renders a Career', () => {
  const wrapper = shallow(<BookmarkPopup career={career} onClose={onCloseMock} onChangeCareer={onChangeMock} />)
  expect(wrapper.find(Career).length).toBe(1)
})

it('fires onClose when closing popup', () => {
  const onCloseMockSpied = jest.fn().mockImplementation(onCloseMock)
  const wrapper = shallow(<BookmarkPopup career={career} onClose={onCloseMockSpied} onChangeCareer={onChangeMock} />)
  wrapper.find('.BookmarkPopup__closeButton').first().simulate('click')
  expect(onCloseMockSpied).toHaveBeenCalledTimes(1)
})