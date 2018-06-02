import * as React from 'react'

interface ISidebarProps {
  icon: string
}

interface ISidebarState {
  open: boolean
}

class Sidebar extends React.Component<ISidebarProps, ISidebarState> {
  constructor (props: ISidebarProps) {
    super(props)

    this.state = {
      open: false
    } as ISidebarState

    this.toggleSidebar = this.toggleSidebar.bind(this)
  }

  public toggleSidebar () {
    this.setState({
      open: !this.state.open
    })
  }

  public render () {
    return (
      <aside className={this.state.open ? 'Sidebar__wrapper--open' : 'Sidebar__wrapper--closed'}>
        <div className="Sidebar__toggleButton" onClick={this.toggleSidebar}>
          <img src={this.props.icon} width="30" />
        </div>
        {this.props.children}
      </aside>
    )
  }
}

export default Sidebar