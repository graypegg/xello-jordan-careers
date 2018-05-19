import { ICareer, IControlsState } from '../types'

import * as React from 'react'
import CareerList from './CareerList/CareerList'
import Controls from './Controls/Controls'

import './App.css'

interface IAppProps {
  careers: ICareer[]
}

interface IAppState {
  controlsState: IControlsState
}

class App extends React.Component<IAppProps, IAppState> {
  public showImages: boolean = true;
  public state: IAppState = {
    controlsState: {
      searchString: '',
      showImages: false
    }
  }

  constructor (props: IAppProps) {
    super(props)
    this.onControlsStateChange = this.onControlsStateChange.bind(this)
  }

  public onControlsStateChange (controlsState: IControlsState): void {
    this.setState({ controlsState })
  }

  public filterCareers (careers: ICareer[], controlsState: IControlsState): ICareer[] {
    const searchStringRegExp = new RegExp(`(${controlsState.searchString})`, 'ig')
    return careers.filter((career) => searchStringRegExp.test(career.title))
  }

  public render() {
    return (
      <div className="App">
        <Controls
          onChange={this.onControlsStateChange}
          controlsState={this.state.controlsState} />

        <CareerList
          careers={this.filterCareers(this.props.careers, this.state.controlsState)}
          showImages={this.state.controlsState.showImages} />
      </div>
    )
  }
}

export default App
