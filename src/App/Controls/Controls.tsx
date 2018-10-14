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
              Revision: 
              <span className="Controls__revisionNumber">
                { this.props.controlsState.currentRevision }
                { this.props.stateIsDirty
                  ? <span>&nbsp;+ local changes</span>
                  : null
                }
              </span>
              { this.props.controlsState.serverRevision && this.props.controlsState.serverRevision !== this.props.controlsState.currentRevision
                ? <span>&nbsp;(Server is { this.props.controlsState.serverRevision })</span>
                : null
              }
            </div>
          : null
        }

        <div className="Controls__saveButtons">
          { this.props.onGlobalSave
            ? <Tooltip
                title="Safe to backup!"
                content="The server and this computer are not in sync. Backup to overwrite the server's version, or Restore to overwrite your local copy with the server's data. (Your local copy is saved to your computer regardless.)"
                active={this.props.stateIsDirty && (this.props.controlsState.serverRevision || -1) <= (this.props.controlsState.currentRevision || -1)}>
              <button className={this.props.stateIsDirty && (this.props.controlsState.serverRevision || -1) <= (this.props.controlsState.currentRevision || -1) ? 'Controls__saveButton--highlight' : 'Controls__saveButton' } onClick={this.props.onGlobalSave}>Backup to Server</button>
              </Tooltip>
            : null }
          { this.props.onGlobalRestore
            ? <Tooltip
                title="Update with caution!"
                content="The server and this computer are not in sync. There may be more up-to-date data to pull! Restoring will overwrite your unsaved local copy. Backingup will overwrite the server's newer copy."
                active={(this.props.controlsState.serverRevision || -1) > (this.props.controlsState.currentRevision || -1)}>
                <button onClick={this.props.onGlobalRestore}>Restore</button>
              </Tooltip>
            : null }
        </div>
      </div>
    )
  }
}

export default Controls