import { ICareer } from '../../../types'

import * as React from 'react'

import Career from '../../CareerList/Career/Career'

import './BookmarkPopup.css'

interface IBookmarkPopupProps {
  career: ICareer,
  onClose: () => void,
  onChangeCareer: (career: ICareer) => void
}

function BookmarkPopup (props: IBookmarkPopupProps) {
  return (
    <div className="BookmarkPopup__wrapper">
      <div className="BookmarkPopup__closeButton" onClick={props.onClose} />
      <Career career={props.career} showImage={false} isBookmarked={true} onChangeCareer={props.onChangeCareer} />
    </div>
  )
}

export default BookmarkPopup