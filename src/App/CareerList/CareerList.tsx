import { ICareer } from '../../types'
import * as React from 'react'

interface ICareerListProps {
  careers: ICareer[],
  showImages?: boolean
}

function CareerList (props: ICareerListProps) {
  return (
    <div className="CareerList__wrapper">
      <ul className="CareerList__careers">
        { props.careers.map((career) => (
          <li className="CareerList__career" key={career.id}>
            { props.showImages ? (
              <img src={career.image} />
            ) : undefined }
            <h1>{ career.title }</h1>
            <p>{ career.description }</p>
            <ul>
              { career.notes.map((note) => (
                <li key={note}>
                  { note }
                </li>
              )) }
            </ul>
          </li>
        )) }
      </ul>
    </div>
  )
}

export default CareerList