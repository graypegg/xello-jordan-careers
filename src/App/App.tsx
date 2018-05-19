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

class App extends React.Component<IAppProps, IAppState> {
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

  public filterCareers (careers: ICareer[], searchState: ISearchState): ICareer[] {
    const searchStringRegExp = new RegExp(`(${searchState.searchString})`, 'ig')
    return careers.filter((career) => searchStringRegExp.test(career.title))
  }

  public render() {
    return (
      <div className="App">
        <Controls onChange={this.onSearchStateChange} />
        <CareerList careers={this.filterCareers(this.props.careers, this.state.searchState)} showImages={this.showImages} />
      </div>
    )
  }
}

export default App
