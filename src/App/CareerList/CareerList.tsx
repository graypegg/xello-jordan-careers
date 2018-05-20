import { ICareer } from '../../types'
import * as React from 'react'

import Career from './Career/Career'

import './CareerList.css'

interface ICareerListProps {
  careers: ICareer[],
  showImages: boolean
}

class CareerList extends React.Component<ICareerListProps> {
  public render (): JSX.Element {
    return (
      <div className="CareerList__wrapper">
        <ul className="CareerList__careers">
          { this.props.careers.map((career) => (
            <li className="CareerList__career" key={ career.id }>
              <Career career={ career } showImage={ this.props.showImages } />
            </li>
          )) }
        </ul>
      </div>
    )
  }
}

export default CareerList