import { IControlsState, IBookmark, ICareer } from '../types'

import * as React from 'react'
import { shallow } from 'enzyme'
import App from './App'
import { EStatus } from '../consts';

const controlsStateMock: IControlsState = { searchString: '', showImages: false, showStatuses: [], currentRevision: 0 }
const bookmarkStateMock: IBookmark[] = [
  {
    career: {
      title: 'Test',
      description: 'Test',
      notes: ['a', 'b'],
      image: 'TestImage',
      id: 1
    } as ICareer,
    saved: new Date(Date.now())
  }
]

it('renders without crashing', () => {
  shallow(<App careers={[]} />)
})

describe('control state:', () => {
  it('can update control state', () => {
    const component = shallow(<App careers={[]} />)
    expect(component.state('controlsState')).toMatchSnapshot()

    const instance = component.instance() as App
    instance.onControlsStateChange({ ...controlsStateMock, searchString: 'test' })

    component.update()

    expect(component.state('controlsState')).toMatchSnapshot()
  })
})

describe('bookmarks:', () => {
  it('can save new bookmark', () => {
    const component = shallow(<App careers={[]} />)
    expect(component.state('bookmarks')).toMatchSnapshot()

    const instance = component.instance() as App
    instance.onSaveBookmark(bookmarkStateMock[0].career)

    component.update()

    expect(component.state('bookmarks').length).toBe(1)
    expect(component.state('bookmarks')[0].career).toEqual(bookmarkStateMock[0].career)
  })

  it('can update bookmark state in it\'s entirity', () => {
    const component = shallow(<App careers={[]} />)
    expect(component.state('bookmarks')).toMatchSnapshot()

    const instance = component.instance() as App
    instance.updateBookmarks(bookmarkStateMock)

    component.update()

    expect(component.state('bookmarks')).toMatchSnapshot()
    expect(localStorage.setItem.mock.calls).toMatchSnapshot()
  })

  it('can delete a bookmark', () => {
    const careers = [{
      title: 'Test',
      description: 'Test',
      notes: ['a', 'b'],
      image: 'TestImage',
      id: 1,
      meta: {
        status: EStatus.Complete
      }
    }] as ICareer[]

    const component = shallow(<App careers={careers} />)

    const instance = component.instance() as App
    instance.setState({
      bookmarks: bookmarkStateMock
    })

    component.update()

    instance.onDeleteBookmark(careers[0])

    component.update()

    expect(component.state('bookmarks').length).toBe(0)
  })

  it('can merge bookmark career data with meta data', () => {
    const careers = [{
      title: 'Test',
      description: 'Test',
      notes: ['a', 'b'],
      image: 'TestImage',
      id: 1,
      meta: {
        status: EStatus.Complete
      }
    }] as ICareer[]

    const instance = new App({ careers })
    const result = instance.mergeBookmarksWithCareersMeta(bookmarkStateMock, {
      [careers[0].id]: careers[0].meta
    })

    expect(result).toMatchSnapshot()
  })

  it('can merge bookmark career data without meta data', () => {
    const careers = [{
      title: 'Test',
      description: 'Test',
      notes: ['a', 'b'],
      image: 'TestImage',
      id: 1,
      meta: {
        status: EStatus.Complete
      }
    }] as ICareer[]

    const instance = new App({ careers })
    const result = instance.mergeBookmarksWithCareersMeta(bookmarkStateMock, null)

    expect(result).toMatchSnapshot()
  })

  it('dirting state after saving a bookmark', (done) => {
    const careers = [{
      title: 'Test',
      description: 'Test',
      notes: ['a', 'b'],
      image: 'TestImage',
      id: 1
    }] as ICareer[]

    const component = shallow(<App careers={careers} offline={true} />)

    const instance = component.instance() as App
    instance.save()
      .then(() => {
        // After a save, should be a clean state
        expect(component.state('isDirty')).toMatchSnapshot()

        instance.onSaveBookmark(bookmarkStateMock[0].career)

        component.update()

        // After saving a bookmark, dirty the state
        expect(component.state('isDirty')).toMatchSnapshot()
        done()
      })
  })
})

describe('career meta data:', () => {
  it('can merge career data with meta data', () => {
    const careers = [{
      title: 'Test',
      description: 'Test',
      notes: ['a', 'b'],
      image: 'TestImage',
      id: 1
    }] as ICareer[]

    const component = shallow(<App careers={careers} />)

    const instance = component.instance() as App
    instance.setState({
      careersMeta: {
        1: {
          status: EStatus.NotStarted
        }
      }
    })

    component.update()

    expect(instance.mergeWithCareersMeta(careers)).toMatchSnapshot()
  })

  it('can update careerMeta state', () => {
    const careersBefore = [{
      title: 'Test',
      description: 'Test',
      notes: ['a', 'b'],
      image: 'TestImage',
      id: 1,
      meta: {
        status: EStatus.Complete
      }
    }] as ICareer[]

    const careersAfter = [{
      title: 'Test',
      description: 'Test',
      notes: ['a', 'b'],
      image: 'TestImage',
      id: 1,
      meta: {
        status: EStatus.NotStarted
      }
    }] as ICareer[]

    const component = shallow(<App careers={careersBefore} />)

    const instance = component.instance() as App
    instance.updateCareersMeta(careersAfter)

    component.update()

    expect(component.state('careersMeta')).toMatchSnapshot()
    expect(localStorage.setItem.mock.calls).toMatchSnapshot()
  })

  it('can update careerMeta state with null data', () => {
    const careersBefore = [{
      title: 'Test',
      description: 'Test',
      notes: ['a', 'b'],
      image: 'TestImage',
      id: 1,
      meta: {
        status: EStatus.Complete
      }
    }] as ICareer[]

    const careersAfter = [{
      title: 'Test',
      description: 'Test',
      notes: ['a', 'b'],
      image: 'TestImage',
      id: 1,
      meta: undefined
    }] as ICareer[]

    const component = shallow(<App careers={careersBefore} />)

    const instance = component.instance() as App
    instance.updateCareersMeta(careersAfter)

    component.update()

    expect(component.state('careersMeta')).toMatchSnapshot()
  })

  it('can update single record in careerMeta state', () => {
    const careers = [{
      title: 'Test',
      description: 'Test',
      notes: ['a', 'b'],
      image: 'TestImage',
      id: 1,
      meta: {
        status: EStatus.NotStarted
      }
    }] as ICareer[]

    const careerToChangeTo = {
      title: 'Test',
      description: 'Test',
      notes: ['a', 'b'],
      image: 'TestImage',
      id: 1,
      meta: {
        status: EStatus.Complete
      }
    } as ICareer

    const component = shallow(<App careers={careers} />)

    const instance = component.instance() as App
    instance.onChangeSingleCareer(careerToChangeTo)

    component.update()

    expect(component.state('careersMeta')).toMatchSnapshot()
  })

  it('can restore from server', (done) => {
    const careers = [{
      title: 'Test',
      description: 'Test',
      notes: ['a', 'b'],
      image: 'TestImage',
      id: 1
    }] as ICareer[]

    const component = shallow(<App careers={careers} />)

    const instance = component.instance() as App
    instance.restore()
      .then(() => {
        expect(component.state('careersMeta')).toMatchSnapshot()
        expect(component.state('bookmarks')).toMatchSnapshot()
        expect(component.state('controlsState')).toMatchSnapshot()
        expect(localStorage.setItem).toHaveBeenCalledTimes(3)
        expect(localStorage.setItem.mock.calls).toMatchSnapshot()
        done()
      })
  })

  it('can save to server', (done) => {
    const careers = [{
      title: 'Test',
      description: 'Test',
      notes: ['a', 'b'],
      image: 'TestImage',
      id: 1
    }] as ICareer[]

    const component = shallow(<App careers={careers} />)

    const instance = component.instance() as App
    instance.save()
      .then(() => {
        component.update()

        expect(component.state('controlsState')).toMatchSnapshot()
        done()
      })
  })

  it('dirting state after updating meta data', (done) => {
    const careers = [{
      title: 'Test2',
      description: 'Test2',
      notes: ['a2', 'b2'],
      image: 'TestImage2',
      id: 2
    }] as ICareer[]

    const component = shallow(<App careers={careers} offline={true} />)

    const instance = component.instance() as App
    instance.save()
      .then(() => {
        // After a save, should be a clean state
        expect(component.state('isDirty')).toMatchSnapshot()

        instance.updateCareersMeta([{
          title: 'Test',
          description: 'Test',
          notes: ['a', 'b'],
          image: 'TestImage',
          id: 1,
          meta: {
            status: EStatus.NotStarted
          }
        }] as ICareer[])

        component.update()

        // After saving a bookmark, dirty the state
        expect(component.state('isDirty')).toMatchSnapshot()
        done()
      })
  })
})