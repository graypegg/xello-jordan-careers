import { IControlsState } from '../../types'
import { EStatus } from '../../consts';
import * as React from 'react'

import './Controls.css'

import Tooltip from '../Tooltip/Tooltip'

interface IControlsProps {
  stateIsDirty: boolean,
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

    localStorage.setItem('searchString', sanitizedSearch)
    this.props.onChange({
      ...this.props.controlsState,
      searchString: sanitizedSearch
    })
  }

  public onShowImageChange (e: React.SyntheticEvent<HTMLInputElement>): void {
    localStorage.setItem('showImages', e.currentTarget.checked.toString())
    this.props.onChange({
      ...this.props.controlsState,
      showImages: e.currentTarget.checked
    })
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
                className={`Controls__statusToggle Controls__statusToggle--${statusKey}`}
                type="checkbox"
                checked={this.props.controlsState.showStatuses.indexOf(EStatus[statusKey]) > -1}
                onChange={this.onStatusToggleChangeFactory(EStatus[statusKey])} />
            </label>
          ))}
        </div>

        { this.props.controlsState.currentRevision
          ? <div className="Controls__saveRevision">
              Revision: { this.props.controlsState.currentRevision }
            </div>
          : null
        }

        <div className="Controls__saveButtons">
          { this.props.onGlobalSave
            ? <Tooltip title="Backup!" content="There's non-backed-up data saved in your local version! Save to sync with other devices." active={this.props.stateIsDirty}>
                <button className={ this.props.stateIsDirty ? 'Controls__saveButton--highlight' : 'Controls__saveButton' } onClick={this.props.onGlobalSave}>Save</button>
              </Tooltip>
            : null }
          { this.props.onGlobalRestore
            ? <button onClick={this.props.onGlobalRestore}>Restore</button>
            : null }
        </div>
      </div>
    )
  }
}

export default Controls