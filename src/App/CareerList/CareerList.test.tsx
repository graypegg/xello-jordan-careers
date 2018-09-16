import { ICareer, IBookmark } from '../../types'

import * as React from 'react'
import { shallow, mount } from 'enzyme'

import CareerList from './CareerList'
import Career from './Career/Career'
import CareerListPageSelector from './CareerListPageSelector/CareerListPageSelector';
import { EStatus } from '../../consts';

const onSaveBookmarkMock = (_: ICareer) => { /* */ }
const onDeleteBookmarkMock = (_: ICareer) => { /* */ }

it('renders without crashing', () => {
  shallow(<CareerList careers={[]} showImages={false} pageLength={20} onSaveBookmark={onSaveBookmarkMock} onDeleteBookmark={onDeleteBookmarkMock} bookmarks={[]} />)
})

describe('can render a simple career', () => {
  const careers: ICareer[] = [
    {
      title: 'Test',
      description: 'Test',
      notes: ['a', 'b'],
      image: 'TestImage',
      id: 1
    }
  ]
  const wrapper = shallow(<CareerList careers={careers} showImages={false} pageLength={20} onSaveBookmark={onSaveBookmarkMock} onDeleteBookmark={onDeleteBookmarkMock} bookmarks={[]} />)
  const career = wrapper.find(Career)

  it('rendered one career', () => {
    expect(career.length).toBe(1)
  })

  it('passing correct props to Career', () => {
    expect(career.props().career).toEqual(careers[0])
  })
})

it('creates pages according to pageLength prop', () => {
  const careers: ICareer[] = [
    {
      title: 'Test1',
      description: 'Test1',
      notes: ['a1', 'b1'],
      image: 'TestImage1',
      id: 1
    },
    {
      title: 'Test2',
      description: 'Test2',
      notes: ['a2', 'b2'],
      image: 'TestImage2',
      id: 2
    },
    {
      title: 'Test3',
      description: 'Test3',
      notes: ['a3', 'b3'],
      image: 'TestImage3',
      id: 3
    }
  ]

  const wrapper = shallow(<CareerList careers={careers} showImages={false} pageLength={1} onSaveBookmark={onSaveBookmarkMock} onDeleteBookmark={onDeleteBookmarkMock} bookmarks={[]} />)

  expect(wrapper.find(Career).length).toBe(1)
})

describe('pageination link list', () => {
  const careers: ICareer[] = [
    {
      title: 'Test1',
      description: 'Test1',
      notes: ['a1', 'b1'],
      image: 'TestImage1',
      id: 1
    },
    {
      title: 'Test2',
      description: 'Test2',
      notes: ['a2', 'b2'],
      image: 'TestImage2',
      id: 2
    },
    {
      title: 'Test3',
      description: 'Test3',
      notes: ['a3', 'b3'],
      image: 'TestImage3',
      id: 3
    }
  ]

  const wrapper = mount(<CareerList careers={careers} showImages={false} pageLength={1} onSaveBookmark={onSaveBookmarkMock} onDeleteBookmark={onDeleteBookmarkMock} bookmarks={[]} />)
  const pageSelector = wrapper.find(CareerListPageSelector).first()
  it('clicking the selected link does nothing', () => {
    pageSelector.find('.CareerListPageSelector__paginationLink--active').simulate('click')
    expect(wrapper.state().onPage).toBe(0)
    expect(wrapper.find(Career).first().props().career).toEqual(careers[0])
  })

  it('clicking a link that is unselected advances the list of careers', () => {
    pageSelector.find('.CareerListPageSelector__paginationLink').last().simulate('click')
    expect(wrapper.state().onPage).toBe(2)
    expect(wrapper.find(Career).first().props().career).toEqual(careers[2])
  })
})

it('should show a message when no items are being shown', () => {
  const wrapper = shallow(<CareerList careers={[]} showImages={false} pageLength={1} onSaveBookmark={onSaveBookmarkMock} onDeleteBookmark={onDeleteBookmarkMock} bookmarks={[]} />)

  expect(wrapper.find(Career).length).toBe(0)
  expect(wrapper.find('.CareerList__noItemsMessage').first().text()).toBe('Sorry! No items match your search.')
})

it('should call prop onChangeCareers if passed in', () => {
  const careersBefore: ICareer[] = [
    {
      title: 'Test',
      description: 'Test',
      notes: ['a', 'b'],
      image: 'TestImage',
      id: 1,
      meta: { status: EStatus.NotStarted }
    }
  ]
  const careersAfter: ICareer[] = [
    {
      title: 'Test1',
      description: 'Test1',
      notes: ['a1', 'b1'],
      image: 'TestImage1',
      id: 1,
      meta: { status: EStatus.Complete }
    }
  ]
  const onChangeCareerMock = jest.fn()
  const wrapper = mount(<CareerList careers={careersBefore} showImages={false} pageLength={1} onSaveBookmark={onSaveBookmarkMock} onDeleteBookmark={onDeleteBookmarkMock} bookmarks={[]} onChangeCareers={onChangeCareerMock} />)
  const fn = wrapper.find(Career).prop('onChangeCareer')
  expect(fn).toBeTruthy()
  if (fn) fn(careersAfter[0])
  expect(onChangeCareerMock).toBeCalledWith(careersAfter)
})

it('should mark bookmarked careers', () => {
  const careers: ICareer[] = [
    {
      title: 'Test',
      description: 'Test',
      notes: ['a', 'b'],
      image: 'TestImage',
      id: 1
    }
  ]
  const bookmarks: IBookmark[] = [
    {
      career: Object.assign(careers[0], {}),
      saved: new Date()
    }
  ]

  const wrapper = shallow(<CareerList careers={careers} showImages={false} pageLength={1} onSaveBookmark={onSaveBookmarkMock} onDeleteBookmark={onDeleteBookmarkMock} bookmarks={bookmarks} />)

  expect(wrapper.find(Career).length).toBe(1)
  expect(wrapper.find(Career).props().isBookmarked).toBe(true)
})

describe('integration with <Career>', () => {
  it('should emit onSaveBookmark when a <Career> is bookmarked', () => {
    const careers: ICareer[] = [
      {
        title: 'Test',
        description: 'Test',
        notes: ['a', 'b'],
        image: 'TestImage',
        id: 1
      }
    ]
    const bookmarks: IBookmark[] = [
      {
        career: Object.assign(careers[0], {}),
        saved: new Date()
      }
    ]
    
    const onSaveBookmarkMockSpied = jest.fn()

    const wrapper = mount(<CareerList careers={careers} showImages={false} pageLength={1} onSaveBookmark={onSaveBookmarkMockSpied} onDeleteBookmark={onDeleteBookmarkMock} bookmarks={bookmarks} />)
    const fn = wrapper.find(Career).prop('onSaveBookmark')
    const career = wrapper.find(Career).prop('career')
    expect(fn).toBeTruthy()
    if (fn) fn(career)
    expect(onSaveBookmarkMockSpied).toBeCalledWith(career)
  })

  it('should emit onDeleteBookmark when a <Career> is unbookmarked', () => {
    const careers: ICareer[] = [
      {
        title: 'Test',
        description: 'Test',
        notes: ['a', 'b'],
        image: 'TestImage',
        id: 1
      }
    ]
    const bookmarks: IBookmark[] = [
      {
        career: Object.assign(careers[0], {}),
        saved: new Date()
      }
    ]

    const onDeleteBookmarkMockSpied = jest.fn()

    const wrapper = mount(<CareerList careers={careers} showImages={false} pageLength={1} onSaveBookmark={onSaveBookmarkMock} onDeleteBookmark={onDeleteBookmarkMockSpied} bookmarks={bookmarks} />)
    const fn = wrapper.find(Career).prop('onDeleteBookmark')
    const career = wrapper.find(Career).prop('career')
    expect(fn).toBeTruthy()
    if (fn) fn(career)
    expect(onDeleteBookmarkMockSpied).toBeCalledWith(career)
  })
})