import { IBookmark, ICareer } from '../../types'
import * as React from 'react'

import BookmarkPopup from './BookmarkPopup/BookmarkPopup'

import './BookmarkList.css'

interface IBookmarkListProps {
  bookmarks: IBookmark[],
  onChange: (bookmarks: IBookmark[]) => void
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

  public showBookmarkFactory (career: ICareer): () => void {
    return () => this.setState({ currentCareer: career })
  }

  public closeBookmark (): void {
    this.setState({
      currentCareer: null
    })
  }

  public deleteBookmarkFactory (index: number): () => void {
    return () => {
      const left = this.props.bookmarks.slice(0, index)
      const right = this.props.bookmarks.slice(index + 1)
      this.props.onChange([...left, ...right])
    }
  }

  public render () {
    return (
      <div className="BookmarkList__wrapper">
        <h1>Bookmarks</h1>
        <ul className="BookmarkList__bookmarkList">
          {
            this.props.bookmarks.length
              ? this.props.bookmarks.map((bookmark, index) => (
                <li className="BookmarkList__bookmark" key={`${bookmark.career.id}-${new Date(bookmark.saved).getTime()}`}>
                  <span className="BookmarkList__deleteBookmarkButton" onClick={this.deleteBookmarkFactory(index)}>×</span>
                  <strong onClick={this.showBookmarkFactory(bookmark.career)}>{ bookmark.career.title }</strong>
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