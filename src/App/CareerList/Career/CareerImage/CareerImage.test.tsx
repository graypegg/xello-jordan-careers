
import * as React from 'react'
import { shallow, render } from 'enzyme'
import { ImageMode } from '../../../../consts'

import CareerImage from './CareerImage'

it('renders without crashing', () => {
  shallow(<CareerImage image="" mode={ImageMode.High} />)
})

it('renders a low-res image', () => {
  const wrapper = render(<CareerImage image="test" mode={ImageMode.Low} />)
  expect(wrapper.find('.CareerImage__image').attr('style')).toBe(`background-image: url(test?quality=70&maxWidth=500)`)
})

it('renders a high-res image', () => {
  const wrapper = render(<CareerImage image="test" mode={ImageMode.High} />)
  expect(wrapper.find('.CareerImage__image').attr('style')).toBe(`background-image: url(test)`)
})