import { ICareer } from '../../types'
import * as React from 'react'

interface ICareerListProps {
  careers: ICareer[]
}

function CareerList (props: ICareerListProps) {
  return (
    <div className="CareerList__wrapper">
      <ul className="CareerList__careers">
        { props.careers.map((career) => (
          <li className="CareerList__career">
            <h1>{ career.title }</h1>
          </li>
        )) }
      </ul>
    </div>
  )
}

export default CareerList