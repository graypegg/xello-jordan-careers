import * as React from 'react'
import { times as _times } from 'lodash'

import './CareerListPageSelector.css'

interface ICareerListPageSelectorProps {
  totalPages: number,
  currentPage: number,
  onChange: (pageIndex: number) => void 
}

function onChangeFactory (props:ICareerListPageSelectorProps, index: number): () => void {
  return () => props.onChange(index)
} 

function CareerListPageSelector (props: ICareerListPageSelectorProps): JSX.Element {
  return (
    <div className="CareerListPageSelector__pagination">
      { _times(props.totalPages).map((_: any, index: number) => (
        <a  
          className={ 'CareerListPageSelector__paginationLink' + (props.currentPage === index || (props.currentPage > props.totalPages && index === props.totalPages - 1) ? '--active' : '') }
          onClick={ onChangeFactory(props, index) }
          key={index}>
          { index + 1 }
        </a>
      )) }
    </div>
  )
}

export default CareerListPageSelector