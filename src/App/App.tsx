import { ICareer, ISearchState } from '../types'

import * as React from 'react'
import CareerList from './CareerList/CareerList'
import Controls from './Controls/Controls'

import './App.css'

interface IAppProps {
  careers: ICareer[]
}

interface IAppState {
  searchState: ISearchState
}

class App extends React.Component<IAppProps> {
  public showImages: boolean = true;
  public state: IAppState = {
    searchState: {
      searchString: ''
    }
  }

  constructor (props: IAppProps) {
    super(props)

    this.onSearchStateChange = this.onSearchStateChange.bind(this)
  }

  public onSearchStateChange (searchState: ISearchState): void {
    this.setState({ searchState })
  }

  public render() {
    return (
      <div className="App">
        <Controls onChange={this.onSearchStateChange} />
        <CareerList careers={this.props.careers} showImages={this.showImages} />
      </div>
    )
  }
}

export default App
