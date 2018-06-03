import { ICareer, IControlsState, IBookmark } from '../types'

import * as React from 'react'
import Sidebar from './Sidebar/Sidebar'
import BookmarkList from './BookmarkList/BookmarkList'
import CareerList from './CareerList/CareerList'
import Controls from './Controls/Controls'

import './App.css'
import iconBookmark from '../assets/images/icon-bookmark.svg'

interface IAppProps {
  careers: ICareer[]
}

interface IAppState {
  controlsState: IControlsState,
  bookmarks: IBookmark[],
  sidebarOpen: boolean
}

class App extends React.Component<IAppProps, IAppState> {
  public showImages: boolean = true;
  public state: IAppState = {
    controlsState: {
      searchString: '',
      showImages: false
    },
    bookmarks: JSON.parse(localStorage.getItem('bookmarks') || '[]'),
    sidebarOpen: false
  }

  constructor (props: IAppProps) {
    super(props)

    this.onControlsStateChange = this.onControlsStateChange.bind(this)
    this.onSaveBookmark = this.onSaveBookmark.bind(this)
    this.onDeleteBookmark = this.onDeleteBookmark.bind(this)
    this.updateBookmarks = this.updateBookmarks.bind(this)
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

  public render(): JSX.Element {
    return (
      <div className="App__wrapper">
        <header className="App__header">
          <img src="https://xello.world/images/xello-logo.svg" alt="Xello" /> Careers
        </header>

        <Sidebar icon={iconBookmark}>
          <BookmarkList bookmarks={this.state.bookmarks} onChange={this.updateBookmarks} />
        </Sidebar>

        <main className="App__application">
          <Controls
            onChange={this.onControlsStateChange}
            controlsState={this.state.controlsState} />

          <CareerList
            careers={this.filterCareers(this.props.careers, this.state.controlsState)}
            bookmarks={this.state.bookmarks}
            showImages={this.state.controlsState.showImages}
            pageLength={30}
            onSaveBookmark={this.onSaveBookmark}
            onDeleteBookmark={this.onDeleteBookmark} />
          </main>
      </div>
    )
  }
}

export default App
