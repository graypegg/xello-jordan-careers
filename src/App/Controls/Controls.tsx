import { ISearchState } from '../../types'
import * as React from 'react'

interface IControlsProps {
  onChange: (searchState: ISearchState) => void
}

class Controls extends React.Component<IControlsProps> {
  public render () {
    return (
      <div>hey</div>
    )
  }
}

export default Controls