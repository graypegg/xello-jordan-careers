import { ICareer } from '../../../types'
import * as React from 'react'
import CareerImage from './CareerImage/CareerImage'

import './Career.css'

interface ICareerProps {
  career: ICareer,
  showImage: boolean
}

function Career(props: ICareerProps): JSX.Element {
  return (
    <div className="Career__wrapper">
      {props.showImage ? (
        <CareerImage image={props.career.image} />
      ) : undefined}
      <h1>{props.career.title}</h1>
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