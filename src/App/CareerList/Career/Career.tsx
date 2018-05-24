import { ICareer } from '../../../types'
import * as React from 'react'
import CareerImage from './CareerImage/CareerImage'

import './Career.css'
import iconBookmark from '../../../assets/images/icon-bookmark.svg'

interface ICareerProps {
  career: ICareer,
  showImage: boolean,
  onSaveBookmark: (career: ICareer) => void
}

function onSaveBookmarkFactory (props: ICareerProps) {
  return () => props.onSaveBookmark(props.career)
}

function Career (props: ICareerProps): JSX.Element {
  return (
    <div className="Career__wrapper">
      {props.showImage ? (
        <CareerImage image={props.career.image} />
      ) : undefined}
      <h1>
        <div className="Career__titleContainer">{props.career.title}</div>
        <div className="Career__bookmarkButton" onClick={onSaveBookmarkFactory(props)}>
          <img src={iconBookmark} width="50" />
        </div>
      </h1>
      <p>{props.career.description}</p>
      <ul>
        {props.career.notes.map((note) => (
          <li key={note}>
            {note}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Career