import { ImageMode } from '../../../../consts'

import * as React from 'react'

interface ICareerImageProps {
  image: string
}

interface ICareerImageState {
  mode: ImageMode
}

class CareerImage extends React.Component<ICareerImageProps, ICareerImageState> {
  constructor (props: ICareerImageProps) {
    super(props)

    this.state = {
      mode: ImageMode.Low
    }

    this.scaleImage = this.scaleImage.bind(this)
    this.toggleMode = this.toggleMode.bind(this)
  }

  public scaleImage (image: string) {
    return `${image}${this.state.mode === ImageMode.High ? '' : '?quality=70&maxWidth=500'}`
  }

  public toggleMode (): void {
    this.setState({
      mode: this.state.mode === ImageMode.High ? ImageMode.Low : ImageMode.High
    })
  }

  public render (): JSX.Element {
    return (
      <div className="CareerImage__wrapper">
        <div className="CareerImage__image" style={ { backgroundImage: `url(${this.scaleImage(this.props.image)})` } }>
          <div className="CareerImage__modeToggleButton" onClick={this.toggleMode}>Toggle</div>
        </div>
      </div>
    )
  }
}

export default CareerImage