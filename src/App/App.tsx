import { ICareer, IControlsState, IBookmark } from '../types'

import * as React from 'react'
import CareerList from './CareerList/CareerList'
import Controls from './Controls/Controls'

import './App.css'

interface IAppProps {
  careers: ICareer[]
}

interface IAppState {
  controlsState: IControlsState,
  bookmarks: IBookmark[]
}

class App extends React.Component<IAppProps, IAppState> {
  public showImages: boolean = true;
  public state: IAppState = {
    controlsState: {
      searchString: '',
      showImages: false
    },
    bookmarks: []
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

  public render(): JSX.Element {
    return (
      <div className="App__wrapper">
        <header className="App__header">
          <img src="https://xello.world/images/xello-logo.svg" alt="Xello" /> Careers
        </header>

        <main className="App__application">
          <Controls
            onChange={this.onControlsStateChange}
            controlsState={this.state.controlsState} />

          <CareerList
            careers={this.filterCareers(this.props.careers, this.state.controlsState)}
            showImages={this.state.controlsState.showImages}
            pageLength={30} />
          </main>
      </div>
    )
  }
}

export default App
