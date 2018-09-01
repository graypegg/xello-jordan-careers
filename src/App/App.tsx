import { ICareer, IControlsState, IBookmark } from '../types'

import * as React from 'react'
import Sidebar from './Sidebar/Sidebar'
import BookmarkList from './BookmarkList/BookmarkList'
import CareerList from './CareerList/CareerList'
import Controls from './Controls/Controls'

import './App.css'
import iconBookmark from '../assets/images/icon-bookmark.svg'
import iconLogo from '../assets/images/logo.svg'

interface IAppProps {
  careers: ICareer[]
}

interface IAppState {
  controlsState: IControlsState,
  bookmarks: IBookmark[],
  sidebarOpen: boolean,
  careersMeta: Array<ICareer['meta']>
}

class App extends React.Component<IAppProps, IAppState> {
  public showImages: boolean = true;
  public state: IAppState = {
    controlsState: {
      searchString: '',
      showImages: false
    },
    bookmarks: JSON.parse(localStorage.getItem('bookmarks') || '[]'),
    sidebarOpen: false,
    careersMeta: JSON.parse(localStorage.getItem('careersMeta') || '[]'),
  }

  constructor (props: IAppProps) {
    super(props)

    this.onControlsStateChange = this.onControlsStateChange.bind(this)
    this.onSaveBookmark = this.onSaveBookmark.bind(this)
    this.onDeleteBookmark = this.onDeleteBookmark.bind(this)
    this.updateBookmarks = this.updateBookmarks.bind(this)
    this.updateCareersMeta = this.updateCareersMeta.bind(this)
  }

  public onControlsStateChange (controlsState: IControlsState): void {
    this.setState({ controlsState })
  }

  public filterCareers (careers: ICareer[], controlsState: IControlsState): ICareer[] {
    const searchStringRegExp = new RegExp(`(${controlsState.searchString})`, 'ig')
    return careers.filter((career) => searchStringRegExp.test(career.title))
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
      bookmarks
    })

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  }
  
  public mergeWithCareersMeta (careers: ICareer[]): ICareer[] {
    return careers.map((career, careerIndex) => {
      return {
        ...career,
        meta: this.state.careersMeta[careerIndex]
      }
    })
  }

  public updateCareersMeta (careers: ICareer[]): void {
    const careersMeta = careers.map((career: ICareer) => career.meta || {})

    this.setState({
      careersMeta
    })

    localStorage.setItem('careersMeta', JSON.stringify(careersMeta))
  }

  public render(): JSX.Element {
    return (
      <div className="App__wrapper">
        <header className="App__header">
          <img src={iconLogo} alt="Xello" /> Careers
        </header>

        <Sidebar icon={iconBookmark}>
          <BookmarkList bookmarks={this.state.bookmarks} onChange={this.updateBookmarks} />
        </Sidebar>

        <main className="App__application">
          <Controls
            onChange={this.onControlsStateChange}
            controlsState={this.state.controlsState} />

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
