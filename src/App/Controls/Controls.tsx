import { IControlsState } from '../../types'
import * as React from 'react'

interface IControlsProps {
  controlsState: IControlsState,
  onChange: (controlsState: IControlsState) => void
}

class Controls extends React.Component<IControlsProps> {
  constructor (props: IControlsProps) {
    super(props)

    this.onSearchStringChange = this.onSearchStringChange.bind(this)
    this.onShowImageChange = this.onShowImageChange.bind(this)
  }

  public onSearchStringChange (e: React.SyntheticEvent<HTMLInputElement>): void {
    this.props.onChange({
      ...this.props.controlsState,
      searchString: e.currentTarget.value
    })
  }

  public onShowImageChange (e: React.SyntheticEvent<HTMLInputElement>): void {
    this.props.onChange({
      ...this.props.controlsState,
      showImages: e.currentTarget.checked
    })
  }

  public render(): JSX.Element {
    return (
      <div className="Controls__wrapper">
        <label>
          Search
          <input
            className="Controls__searchInput"
            type="text"
            value={this.props.controlsState.searchString}
            onChange={this.onSearchStringChange} />
        </label>
        
        <label>
          Show Images
          <input
            className="Controls__showImagesInput"
            type="checkbox"
            checked={this.props.controlsState.showImages}
            onChange={this.onShowImageChange} />
        </label>
      </div>
    )
  }
}

export default Controls