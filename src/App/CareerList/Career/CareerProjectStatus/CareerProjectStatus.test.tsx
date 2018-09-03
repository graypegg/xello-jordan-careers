import { ICareer } from '../../../../types'

import * as React from 'react'
import { shallow } from 'enzyme'
import CareerProjectStatus from './CareerProjectStatus';
import { EStatus } from '../../../../consts';

const career: ICareer = {
  title: 'Test',
  description: 'Test',
  notes: ['a', 'b'],
  image: 'TestImage',
  meta: {
    status: EStatus.NotStarted
  },
  id: 1
}

const onChangeMock = (_: ICareer) => { /* */ }

it('renders without crashing', () => {
  expect(
    shallow(<CareerProjectStatus career={career} onChange={onChangeMock} />)
  ).toMatchSnapshot();
})

Object.keys(EStatus).forEach((statusKey) => {
  it(`should display ${EStatus[statusKey]}`, () => {
    const newCareer = {
      ...career,
      meta: {
        ...career.meta,
        status: EStatus[statusKey]
      }
    }
    const wrapper = shallow(<CareerProjectStatus career={newCareer} onChange={onChangeMock} />)
    expect(wrapper.find('select').prop('value')).toBe(EStatus[statusKey])
  })

  it(`should apply proper class to wrapper for ${EStatus[statusKey]}`, () => {
    const newCareer = {
      ...career,
      meta: {
        ...career.meta,
        status: EStatus[statusKey]
      }
    }
    const wrapper = shallow(<CareerProjectStatus career={newCareer} onChange={onChangeMock} />)
    expect(wrapper.hasClass(`CareerProjectStatus__wrapper--${ EStatus[statusKey].toLowerCase().replace(' ', '-') }`)).toBe(true)
  })

  it(`should dispatch props.onChange when changed to ${EStatus[statusKey]}`, () => {
    const nextCareer = {
      ...career,
      meta: {
        ...career.meta,
        status: EStatus[statusKey]
      }
    }
    const onChangeMockSpied = jest.fn().mockImplementation(onChangeMock)
    const wrapper = shallow(<CareerProjectStatus career={career} onChange={onChangeMockSpied} />)
    wrapper.find('select').simulate('change', { currentTarget: { value: EStatus[statusKey] } })
    expect(onChangeMockSpied).toBeCalledWith(nextCareer)
  })
})


