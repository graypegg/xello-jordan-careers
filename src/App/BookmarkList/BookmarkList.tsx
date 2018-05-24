import { IBookmark, ICareer } from '../../types'
import * as React from 'react'

import BookmarkPopup from './BookmarkPopup/BookmarkPopup'

import './BookmarkList.css'

interface IBookmarkListProps {
  bookmarks: IBookmark[]
}

interface IBookmarkListState {
  currentCareer: ICareer | null
}

class BookmarkList extends React.Component<IBookmarkListProps, IBookmarkListState> {
  constructor (props: IBookmarkListProps) {
    super(props)

    this.state = {
      currentCareer: null
    }

    this.showBookmarkFactory = this.showBookmarkFactory.bind(this)
    this.closeBookmark = this.closeBookmark.bind(this)
  }

  public showBookmarkFactory (career: ICareer) {
    return () => this.setState({ currentCareer: career })
  }

  public closeBookmark () {
    this.setState({
      currentCareer: null
    })
  }

  public render () {
    return (
      <div className="BookmarkList__wrapper">
        <h1>Bookmarks</h1>
        <ul className="BookmarkList__bookmarkList">
          {
            this.props.bookmarks.length
              ? this.props.bookmarks.map((bookmark) => (
                <li className="BookmarkList__bookmark" key={bookmark.career.id} onClick={this.showBookmarkFactory(bookmark.career)}>
                  <strong>{ bookmark.career.title }</strong>
                </li>))
              : <li><em>You have no bookmarks to show. Click the bookmark icon beside the title of any career entry to add on to the list. Your bookmarks will be saved.</em></li>
          }
        </ul>

        { this.state.currentCareer
            ? <BookmarkPopup career={this.state.currentCareer} onClose={this.closeBookmark} />
            : null
        }
      </div>
    )
  }
}

export default BookmarkList