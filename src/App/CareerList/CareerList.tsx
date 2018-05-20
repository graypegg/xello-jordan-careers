import { ICareer } from '../../types'
import * as React from 'react'

import Career from './Career/Career'

import './CareerList.css'

interface ICareerListProps {
  careers: ICareer[],
  showImages: boolean,
  pageLength: number
}

interface ICareerListState {
  onPage: number
}

class CareerList extends React.Component<ICareerListProps, ICareerListState> {
  constructor (props: ICareerListProps) {
    super(props)

    this.state = {
      onPage: 0
    } as ICareerListState
  }
  
  public careersToPages (careers: ICareer[], pageLength: number): ICareer[][] {
    return careers.reduce((acc: ICareer[][], career: ICareer) => {
      const currentPage = acc[acc.length - 1]
      if (currentPage.length < pageLength) acc[acc.length - 1].push(career)
      else acc.push([career])
      return acc
    }, [[]])
  }

  public render (): JSX.Element {
    return (
      <div className="CareerList__wrapper">
        <ul className="CareerList__careers">
          { this.careersToPages(this.props.careers, this.props.pageLength)[this.state.onPage].map((career) => (
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