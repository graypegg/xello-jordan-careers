import { IControlsState } from '../../types'
import * as React from 'react'

import './Controls.css'

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

  public componentDidMount (): void {
    const searchString = localStorage.getItem('searchString') !== null ? localStorage.getItem('searchString') : undefined
    const showImages = localStorage.getItem('showImages') !== null ? localStorage.getItem('showImages') === 'true' : undefined 
    
    let out = Object.assign(this.props.controlsState, {})
    if (searchString !== undefined) out = Object.assign(out, { searchString })
    if (showImages !== undefined) out = Object.assign(out, { showImages })

    if (searchString !== undefined && showImages !== undefined) this.props.onChange(out)

    localStorage.setItem('searchString', out.searchString)
    localStorage.setItem('showImages', out.showImages.toString())
  }

  public onSearchStringChange (e: React.SyntheticEvent<HTMLInputElement>): void {
    const sanitizedSearch = e.currentTarget.value
                                           .replace(/[^\*\w\^\$]/g, '')
                                           .replace(/^\*/, '')
                                           .replace(/\*/g, '.*')

    this.props.onChange({
      ...this.props.controlsState,
      searchString: sanitizedSearch
    })

    localStorage.setItem('searchString', sanitizedSearch)
  }

  public onShowImageChange (e: React.SyntheticEvent<HTMLInputElement>): void {
    this.props.onChange({
      ...this.props.controlsState,
      showImages: e.currentTarget.checked
    })

    localStorage.setItem('showImages', e.currentTarget.checked.toString())
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