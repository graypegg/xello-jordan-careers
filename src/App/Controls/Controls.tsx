import { IControlState } from '../../types'
import * as React from 'react'

interface IControlsProps {
  onChange: (controlState: IControlState) => void
}

class Controls extends React.Component<IControlsProps> {
  constructor (props: IControlsProps) {
    super(props)

    this.onSearchStringChange = this.onSearchStringChange.bind(this)
  }

  public onSearchStringChange (e: React.SyntheticEvent<HTMLInputElement>) {
    this.props.onChange({
      searchString: e.currentTarget.value
    })
  }

  public render () {
    return (
      <div className="Controls__wrapper">
        <input type="text" onChange={this.onSearchStringChange} />
      </div>
    )
  }
}

export default Controls