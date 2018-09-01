import { ICareer } from '../../../types'
import * as React from 'react'
import CareerImage from './CareerImage/CareerImage'
import CareerProjectStatus from './CareerProjectStatus/CareerProjectStatus'

import './Career.css'
import iconBookmark from '../../../assets/images/icon-bookmark.svg'

interface ICareerProps {
  career: ICareer,
  showImage: boolean,
  isBookmarked?: boolean,
  onSaveBookmark?: (career: ICareer) => void,
  onDeleteBookmark?: (career: ICareer) => void,
  onChangeCareer?: (career: ICareer) => void
}

function onBookmarkActionFactory (props: ICareerProps): () => void {
  if (!props.isBookmarked) return () => (props.onSaveBookmark ? props.onSaveBookmark(props.career) : undefined)
  else return () => (props.onDeleteBookmark ? props.onDeleteBookmark(props.career) : undefined)
}

function onChangeCareerFactory(props: ICareerProps): (newCareer: ICareer) => void {
  return (newCareer) => props.onChangeCareer ? props.onChangeCareer(newCareer) : newCareer
}

function Career (props: ICareerProps): JSX.Element {
  return (
    <div className="Career__wrapper">
      {props.showImage ? (
        <CareerImage image={props.career.image} />
      ) : undefined}
      <h1>
        <div className="Career__titleContainer">{props.career.title}</div>
        {
          props.onSaveBookmark && props.onDeleteBookmark
            ? <div className={!props.isBookmarked ? 'Career__bookmarkButton' : 'Career__bookmarkButton--active'} onClick={onBookmarkActionFactory(props)}>
                <img src={iconBookmark} width="50" />
              </div>
            : null
        }
      </h1>
      { props.onChangeCareer
        ? <CareerProjectStatus career={ props.career } onChange={onChangeCareerFactory(props)} />
        : null
      }
      <p>{props.career.description}</p>
      <ul>
        {props.career.notes.map((note) => (
          <li key={note}>
            {note}
          </li>
        ))}
      </ul>
      <a className="Career__profileLink" target="_blank" href={`https://student.xello.world/options/career/${props.career.id}`}>https://student.xello.world/options/career/{props.career.id}</a>
    </div>
  )
}

export default Career