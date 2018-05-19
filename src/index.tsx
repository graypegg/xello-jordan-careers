import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App/App'

import careerData from './data'

ReactDOM.render(
  <App careers={careerData} />,
  document.getElementById('root') as HTMLElement
)
