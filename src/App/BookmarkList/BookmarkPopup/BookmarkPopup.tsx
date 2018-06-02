import { ICareer } from '../../../types'

import * as React from 'react'

import Career from '../../CareerList/Career/Career'

import './BookmarkPopup.css'

interface IBookmarkPopupProps {
  career: ICareer,
  onClose: () => void
}

const onSaveBookmarkMock = (_: ICareer) => { /* */ }

function BookmarkPopup (props: IBookmarkPopupProps) {
  return (
    <div className="BookmarkPopup__wrapper">
      <div className="BookmarkPopup__closeButton" onClick={props.onClose} />
      <Career career={props.career} showImage={false} onSaveBookmark={onSaveBookmarkMock} isBookmarked={true} />
    </div>
  )
}

export default BookmarkPopup