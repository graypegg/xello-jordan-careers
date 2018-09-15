import { IControlsState } from '../../types'
import { EStatus } from '../../consts';
import * as React from 'react'

import './Controls.css'

interface IControlsProps {
  controlsState: IControlsState,
  onChange: (controlsState: IControlsState) => void,
  onGlobalRestore?: () => void,
  onGlobalSave?: () => void
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
    const showStatuses = localStorage.getItem('showStatuses') !== null ? JSON.parse(localStorage.getItem('showStatuses') || '[]') : undefined 
    
    let out = Object.assign(this.props.controlsState, {})
    if (searchString !== undefined) out = Object.assign(out, { searchString })
    if (showImages !== undefined) out = Object.assign(out, { showImages })
    if (showStatuses !== undefined) out = Object.assign(out, { showStatuses })

    localStorage.setItem('searchString', out.searchString)
    localStorage.setItem('showImages', out.showImages.toString())
    localStorage.setItem('showStatuses', JSON.stringify(out.showStatuses))
  }

  public onSearchStringChange (e: React.SyntheticEvent<HTMLInputElement>): void {
    const sanitizedSearch = e.currentTarget.value
                                           .replace(/[^\*\s\w\^\$]/g, '')
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

  public onStatusToggleChangeFactory (status: EStatus): (event: React.SyntheticEvent<HTMLInputElement>) => void {
    return (event) => {
      const next = this.props.controlsState.showStatuses.indexOf(status) > -1
        ? this.props.controlsState.showStatuses.filter((currentStatus) => currentStatus !== status)
        : this.props.controlsState.showStatuses.concat([status])

      this.props.onChange({
        ...this.props.controlsState,
        showStatuses: next
      })

      localStorage.setItem('showStatuses', JSON.stringify(next))
    }
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

        <div className="Controls__statusToggles">
          { Object.keys(EStatus).map((statusKey: string) => (
            <label key={statusKey}>
              Show '{EStatus[statusKey]}'
              <input
                className="Controls__statusToggle"
                type="checkbox"
                checked={this.props.controlsState.showStatuses.indexOf(EStatus[statusKey]) > -1}
                onChange={this.onStatusToggleChangeFactory(EStatus[statusKey])} />
            </label>
          ))}
        </div>

        <div className="Controls__saveButtons">
          { this.props.onGlobalSave
            ? <button onClick={this.props.onGlobalSave}>Save</button>
            : null }
          { this.props.onGlobalRestore
            ? <button onClick={this.props.onGlobalRestore}>Restore</button>
            : null }
        </div>

        <div className="Controls__saveButtons">
          Revision: { this.props.controlsState.currentRevision }
        </div>
      </div>
    )
  }
}

export default Controls