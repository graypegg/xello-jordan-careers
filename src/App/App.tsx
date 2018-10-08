import { ICareer, IControlsState, IBookmark } from '../types'

import * as React from 'react'
import Sidebar from './Sidebar/Sidebar'
import BookmarkList from './BookmarkList/BookmarkList'
import CareerList from './CareerList/CareerList'
import Controls from './Controls/Controls'

import './App.css'
import iconBookmark from '../assets/images/icon-bookmark.svg'
import iconLogo from '../assets/images/logo.svg'
import { EStatus } from '../consts'
import { getLatest, postSave } from '../apiService/api.service'
import { isEqual as _isEqual } from 'lodash'

interface IAppProps {
  careers: ICareer[],
  offline?: boolean | null
}

interface IAppState {
  controlsState: IControlsState,
  bookmarks: IBookmark[],
  sidebarOpen: boolean,
  careersMeta: {[careerId: number]: ICareer['meta']},
  isDirty: boolean
}

class App extends React.Component<IAppProps, IAppState> {
  public showImages: boolean = true;
  public state: IAppState = {
    controlsState: {
      searchString: '',
      showImages: false,
      showStatuses: ((Object as any).values(EStatus)) as EStatus[],
      currentRevision: null
    },
    bookmarks: JSON.parse(localStorage.getItem('bookmarks') || '[]'),
    sidebarOpen: false,
    careersMeta: JSON.parse(localStorage.getItem('careersMeta') || '{}'),
    isDirty: false
  }

  constructor (props: IAppProps) {
    super(props)

    this.onControlsStateChange = this.onControlsStateChange.bind(this)
    this.onSaveBookmark = this.onSaveBookmark.bind(this)
    this.onDeleteBookmark = this.onDeleteBookmark.bind(this)
    this.updateBookmarks = this.updateBookmarks.bind(this)
    this.updateCareersMeta = this.updateCareersMeta.bind(this)
    this.onChangeSingleCareer = this.onChangeSingleCareer.bind(this)
    this.restore = this.restore.bind(this)
    this.save = this.save.bind(this)
  }

  public componentDidMount () {
    if (!this.props.offline) {
      getLatest()
        .then((latest) => {
          if (
            !(_isEqual(latest.data, {
              bookmarks: this.state.bookmarks,
              careersMeta: this.state.careersMeta
            }))
          ) {
            this.setState({
              isDirty: true
            })
          } else {
            this.setState((prevState) => ({
              controlsState: {
                ...prevState.controlsState,
                currentRevision: latest.id
              }
            }))
          }
        })
        .catch(() => {
          console.warn('You\'re offline. Can\'t check if we\'re working with the latest copy of the db or not')
        })
    }
  }

  public onControlsStateChange (controlsState: IControlsState): void {
    this.setState({ controlsState })
  }

  public filterCareers (careers: ICareer[], controlsState: IControlsState): ICareer[] {
    const searchStringRegExp = new RegExp(`(${controlsState.searchString})`, 'ig')
    return careers
      .filter((career) => searchStringRegExp.test(career.title))
      .filter((career) => career.meta
        ? controlsState.showStatuses.indexOf(career.meta.status || EStatus.NotStarted) > -1
        : controlsState.showStatuses.indexOf(EStatus.NotStarted) > -1
      )
  }

  public onSaveBookmark (career: ICareer) {
    this.updateBookmarks(
      this.state.bookmarks.concat([
        {
          career,
          saved: new Date(Date.now())
        }
      ])
    )
  }

  public onDeleteBookmark (career: ICareer) {
    this.updateBookmarks(
      this.state.bookmarks.filter((bookmark) => {
        return bookmark.career.id !== career.id
      })
    )
  }

  public updateBookmarks (bookmarks: IBookmark[]) {
    this.setState({
      bookmarks,
      isDirty: true
    })

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  }
  
  public mergeWithCareersMeta (careers: ICareer[]): ICareer[] {
    return careers.map((career) => {
      return {
        ...career,
        meta: this.state.careersMeta[career.id]
      }
    })
  }

  public mergeBookmarksWithCareersMeta (bookmarks: IBookmark[], careersMeta: {[careerId: number]: ICareer['meta']} | null): IBookmark[] {
    return bookmarks.map((bookmark) => {
      return {
        ...bookmark,
        career: {
          ...bookmark.career,
          meta: careersMeta ? careersMeta[bookmark.career.id] : {}
        }
      }
    })
  }

  public updateCareersMeta (careers: ICareer[]): void {
    const careersMeta = careers.reduce((acc, career: ICareer) => {
      if (career.meta) {
        acc[career.id] = career.meta
      } else {
        acc[career.id] = null
      }
      return acc
    }, {})

    this.setState({
      careersMeta: Object.assign({}, this.state.careersMeta, careersMeta),
      isDirty: true
    })

    localStorage.setItem('careersMeta', JSON.stringify(Object.assign({}, this.state.careersMeta, careersMeta)))
  }

  public onChangeSingleCareer (career: ICareer): void {
    this.updateCareersMeta([career])
  }

  public restore (): Promise<any> {
    return getLatest()
      .then((obj) => {
        return new Promise((res) => {
          localStorage.setItem('bookmarks', JSON.stringify(obj.data.bookmarks))
          localStorage.setItem('careersMeta', JSON.stringify(obj.data.careersMeta))
          this.setState((prevState) => ({
            bookmarks: obj.data.bookmarks,
            careersMeta: obj.data.careersMeta,
            controlsState: {
              ...prevState.controlsState,
              currentRevision: obj.id
            },
            isDirty: false
          }), () => res())
        })
      })
  }

  public save (): Promise<any> {
    return postSave({
      bookmarks: this.state.bookmarks,
      careersMeta: this.state.careersMeta
    })
      .then((obj) => {
        return new Promise((res) => {
          this.setState((prevState) => ({
            controlsState: {
              ...prevState.controlsState,
              currentRevision: obj.id,
            },
            isDirty: false
          }), () => res())
        })
      })
  }

  public render(): JSX.Element {
    return (
      <div className="App__wrapper">
        <header className="App__header">
          <img src={iconLogo} alt="Xello" /> Careers
        </header>

        <Sidebar icon={iconBookmark}>
          <BookmarkList bookmarks={this.mergeBookmarksWithCareersMeta(this.state.bookmarks, this.state.careersMeta)} onChange={this.updateBookmarks} onChangeCareer={this.onChangeSingleCareer} />
        </Sidebar>

        <main className="App__application">
          <Controls
            stateIsDirty={this.state.isDirty}
            onChange={this.onControlsStateChange}
            controlsState={this.state.controlsState}
            onGlobalRestore={this.props.offline ? undefined : this.restore}
            onGlobalSave={this.props.offline ? undefined : this.save} />

          <CareerList
            careers={this.filterCareers(this.mergeWithCareersMeta(this.props.careers), this.state.controlsState)}
            bookmarks={this.state.bookmarks}
            showImages={this.state.controlsState.showImages}
            pageLength={30}
            onSaveBookmark={this.onSaveBookmark}
            onDeleteBookmark={this.onDeleteBookmark}
            onChangeCareers={this.updateCareersMeta} />
          </main>
      </div>
    )
  }
}

export default App
