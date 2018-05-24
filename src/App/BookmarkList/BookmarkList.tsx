import { IBookmark } from '../../types'
import * as React from 'react'

import './BookmarkList.css'

interface IBookmarkListProps {
  bookmarks: IBookmark[]
}

function BookmarkList (props: IBookmarkListProps) {
  return (
    <div className="BookmarkList__wrapper">
      { props.bookmarks.map((bookmark) => (
        <div className="BookmarkList__bookmark" key={bookmark.career.id}>
          <strong>{ bookmark.career.title }</strong>
        </div>
      )) }
    </div>
  )
}

export default BookmarkList