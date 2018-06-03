import { ICareer } from '../../../types'

import * as React from 'react'
import { shallow } from 'enzyme'
import Career from './Career'
import CareerImage from './CareerImage/CareerImage'

const career: ICareer = {
  title: 'Test',
  description: 'Test',
  notes: ['a', 'b'],
  image: 'TestImage',
  id: 1
}

const onSaveBookmarkMock = (_: ICareer) => { /* */ }
const onDeleteBookmarkMock = (_: ICareer) => { /* */ }

it('renders without crashing', () => {
  shallow(<Career career={career} showImage={false} onSaveBookmark={onSaveBookmarkMock} onDeleteBookmark={onDeleteBookmarkMock} />)
})

describe('can render a simple career', () => {
  const component = shallow(<Career career={career} showImage={false} onSaveBookmark={onSaveBookmarkMock} onDeleteBookmark={onDeleteBookmarkMock} />)

  it('rendered a title with bookmark button', () => {
    expect(component.find('h1').text()).toBe(career.title)
    expect(component.find('h1 > .Career__bookmarkButton').length).toBe(1)
  })

  it('hide bookmark button if save and delete events not supplied', () => {
    const componentWithoutBookmarkButton = shallow(<Career career={career} showImage={false} />)
    expect(componentWithoutBookmarkButton.find('.Career__bookmarkButton').length).toBe(0)
  })

  it('rendered a description', () => {
    expect(component.find('p').text()).toBe(career.description)
  })

  it('rendered a notes list', () => {
    expect(component.children('ul').find('li').at(0).text()).toBe(career.notes[0])
    expect(component.children('ul').find('li').at(1).text()).toBe(career.notes[1])
  })

  it('does render an image when props.showImages == true', () => {
    const componentWithImage = shallow(<Career career={career} showImage={true} onSaveBookmark={onSaveBookmarkMock} onDeleteBookmark={onDeleteBookmarkMock} />)
    expect(componentWithImage.find(CareerImage).length).toBe(1)
    expect(componentWithImage).toMatchSnapshot()

  })

  it('does not render an image when props.showImages == false', () => {
    expect(component.find(CareerImage).length).toBe(0)
    expect(component).toMatchSnapshot()
  })
})

describe('bookmarking', () => {
  const onSaveBookmarkSpied = jest.fn().mockImplementation(onSaveBookmarkMock)
  const onDeleteBookmarkSpied = jest.fn().mockImplementation(onDeleteBookmarkMock)
  const component = shallow(<Career career={career} showImage={false} onSaveBookmark={onSaveBookmarkSpied} onDeleteBookmark={onDeleteBookmarkSpied} />)

  it('click to add bookmark', () => {
    component.find('.Career__bookmarkButton').simulate('click')
    component.update()
    expect(onSaveBookmarkSpied).toHaveBeenCalledTimes(1)
    expect(onDeleteBookmarkSpied).toHaveBeenCalledTimes(0)
    expect(onSaveBookmarkSpied).toHaveBeenCalledWith(career)
  })

  it('click again to remove bookmark', () => {
    component.setProps({ isBookmarked: true })
    component.find('.Career__bookmarkButton--active').simulate('click')
    component.update()
    expect(onSaveBookmarkSpied).toHaveBeenCalledTimes(1)
    expect(onDeleteBookmarkSpied).toHaveBeenCalledTimes(1)
    expect(onDeleteBookmarkSpied).toHaveBeenCalledWith(career)
  })
})