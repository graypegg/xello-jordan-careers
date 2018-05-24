import { IBookmark } from '../../types'
import * as React from 'react'

import './BookmarkList.css'

interface IBookmarkListProps {
  bookmarks: IBookmark[]
}

function BookmarkList (props: IBookmarkListProps) {
  return (
    <div className="BookmarkList__wrapper">
      <h1>Bookmarks</h1>
      <ul className="BookmarkList__bookmarkList">
        {
          props.bookmarks.length
            ? props.bookmarks.map((bookmark) => (
              <li className="BookmarkList__bookmark" key={bookmark.career.id}>
                <strong>{ bookmark.career.title }</strong>
              </li>))
            : <li><em>You have no bookmarks to show. Click the bookmark icon beside the title of any career entry to add on to the list. Your bookmarks will be saved.</em></li>
        }
      </ul>
    </div>
  )
}

export default BookmarkList