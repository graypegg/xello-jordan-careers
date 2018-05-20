import { ICareer } from '../../types'
import * as React from 'react'

import Career from './Career/Career'

interface ICareerListProps {
  careers: ICareer[],
  showImages: boolean
}

function CareerList (props: ICareerListProps): JSX.Element {
  return (
    <div className="CareerList__wrapper">
      <ul className="CareerList__careers">
        { props.careers.map((career) => (
          <li className="CareerList__career" key={career.id}>
            <Career career={career} showImage={props.showImages} />
          </li>
        )) }
      </ul>
    </div>
  )
}

export default CareerList