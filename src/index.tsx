import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App/App'

import careerData from './assets/data'
import './assets/vars.css'

ReactDOM.render(
  <App careers={careerData} />,
  document.getElementById('root') as HTMLElement
)
