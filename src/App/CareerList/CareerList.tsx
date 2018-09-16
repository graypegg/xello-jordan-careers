import { ICareer, IBookmark } from '../../types'
import * as React from 'react'

import Career from './Career/Career'
import CareerListPageSelector from './CareerListPageSelector/CareerListPageSelector';

import './CareerList.css'

interface ICareerListProps {
  careers: ICareer[],
  bookmarks: IBookmark[],
  showImages: boolean,
  pageLength: number,
  onSaveBookmark: (career: ICareer) => void,
  onDeleteBookmark: (career: ICareer) => void,
  onChangeCareers?: (careers: ICareer[]) => void
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

  public onChangeCareerFactory (careerId: ICareer['id']): (career: ICareer) => void {
    return (career) => {
      if (this.props.onChangeCareers) {
        this.props.onChangeCareers(
          this.props.careers.map((value) => {
            return (value.id === careerId
              ? career
              : value)
          })
        )
      }
    }
  }

  public render (): JSX.Element {
    const pages = this.careersToPages(this.props.careers, this.props.pageLength)
    return (
      <div className="CareerList__wrapper">
        <CareerListPageSelector totalPages={pages.length} currentPage={this.state.onPage} onChange={this.goToPage} />
        <ul className="CareerList__careers">
          {
            this.props.careers.length
              ? (pages[this.state.onPage] || pages[pages.length - 1]).map((career) => (
                <li className="CareerList__career" key={ career.id }>
                  <Career
                    career={ career }
                    showImage={ this.props.showImages }
                    onSaveBookmark={ this.props.onSaveBookmark }
                    onDeleteBookmark={ this.props.onDeleteBookmark }
                    isBookmarked={ this.props.bookmarks.some((bookmark) => bookmark.career.id === career.id) }
                    onChangeCareer={ this.onChangeCareerFactory(career.id) }/>
                </li>
              ))
              : <div className="CareerList__noItemsMessage">Sorry! No items match your search.</div>
          }
        </ul>
        <CareerListPageSelector totalPages={pages.length} currentPage={this.state.onPage} onChange={this.goToPage} />
      </div>
    )
  }
}

export default CareerList