import { ICareer, IControlState } from '../types'

import * as React from 'react'
import CareerList from './CareerList/CareerList'
import Controls from './Controls/Controls'

import './App.css'

interface IAppProps {
  careers: ICareer[]
}

interface IAppState {
  controlState: IControlState
}

class App extends React.Component<IAppProps, IAppState> {
  public showImages: boolean = true;
  public state: IAppState = {
    controlState: {
      searchString: '',
      showImages: false
    }
  }

  constructor (props: IAppProps) {
    super(props)
    this.onControlStateChange = this.onControlStateChange.bind(this)
  }

  public onControlStateChange (controlState: IControlState): void {
    this.setState({ controlState })
  }

  public filterCareers (careers: ICareer[], controlState: IControlState): ICareer[] {
    const searchStringRegExp = new RegExp(`(${controlState.searchString})`, 'ig')
    return careers.filter((career) => searchStringRegExp.test(career.title))
  }

  public render() {
    return (
      <div className="App">
        <Controls onChange={this.onControlStateChange} />
        <CareerList careers={this.filterCareers(this.props.careers, this.state.controlState)} showImages={this.state.controlState.showImages} />
      </div>
    )
  }
}

export default App
