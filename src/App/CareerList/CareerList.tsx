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

    this.goToPage = this.goToPage.bind(this)
    this.goToPageFactory = this.goToPageFactory.bind(this)
  }
  
  public careersToPages (careers: ICareer[], pageLength: number): ICareer[][] {
    return careers.reduce((acc: ICareer[][], career: ICareer) => {
      const currentPage = acc[acc.length - 1]
      if (currentPage.length < pageLength) acc[acc.length - 1].push(career)
      else acc.push([career])
      return acc
    }, [[]])
  }

  public goToPage (pageIndex: number) {
    this.setState({ onPage: pageIndex })
  }

  public goToPageFactory (pageIndex: number) {
    return () => this.goToPage(pageIndex)
  }

  public render (): JSX.Element {
    const pages = this.careersToPages(this.props.careers, this.props.pageLength)
    return (
      <div className="CareerList__wrapper">
        <div className="CareerList__pagination">
          { pages.map((page, index) => (
            <a className={ 'CareerList__paginationLink' + (this.state.onPage === index || (this.state.onPage > pages.length && index === pages.length - 1) ? '--active' : '') } onClick={ this.goToPageFactory(index) }>
              { index + 1 }
            </a>
          )) }
        </div>

        <ul className="CareerList__careers">
          { (pages[this.state.onPage] || pages[pages.length - 1]).map((career) => (
            <li className="CareerList__career" key={ career.id }>
              <Career
                career={ career }
                showImage={ this.props.showImages } />
            </li>
          )) }
        </ul>
      </div>
    )
  }
}

export default CareerList