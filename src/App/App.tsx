import { ICareer } from '../types'

import * as React from 'react'
import CareerList from './CareerList/CareerList'

import './App.css'

interface IAppProps {
  careers: ICareer[]
}

class App extends React.Component<IAppProps> {
  public render() {
    return (
      <div className="App">
        <CareerList careers={this.props.careers} />
      </div>
    )
  }
}

export default App
