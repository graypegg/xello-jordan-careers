import { IBookmark, ICareer } from '../../types'
import * as React from 'react'

import BookmarkPopup from './BookmarkPopup/BookmarkPopup'

import './BookmarkList.css'

interface IBookmarkListProps {
  bookmarks: IBookmark[],
  onChange: (bookmarks: IBookmark[]) => void,
  onChangeCareer: (career: ICareer) => void
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
      const newBookmarks = this.props.bookmarks.filter((_, bookmarkIndex: number) => bookmarkIndex !== index)
      this.props.onChange(newBookmarks)
    }
  }

  public keepUpdated (career: ICareer, bookmarks: IBookmark[]): ICareer {
    const thisBookmark = bookmarks.find((bookmark) => bookmark.career.id === career.id);
    if (thisBookmark) {
      return {
        ...career,
        meta: thisBookmark.career.meta ? thisBookmark.career.meta : {}
      }
    }
    return career
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
                  <strong className="BookmarkList__label" onClick={this.showBookmarkFactory(bookmark.career)}>{ bookmark.career.title }</strong>
                </li>))
              : <li><em>You have no bookmarks to show. Click the bookmark icon beside the title of any career entry to add on to the list. Your bookmarks will be saved.</em></li>
          }
        </ul>

        { this.state.currentCareer
            ? <BookmarkPopup career={this.keepUpdated(this.state.currentCareer, this.props.bookmarks)} onClose={this.closeBookmark} onChangeCareer={this.props.onChangeCareer} />
            : null
        }
      </div>
    )
  }
}

export default BookmarkList