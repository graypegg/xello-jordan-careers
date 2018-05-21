import { ImageMode } from '../../../../types'

import * as React from 'react'

interface ICareerImageProps {
  image: string,
  mode: ImageMode
}

class CareerImage extends React.Component<ICareerImageProps> {
  public render (): JSX.Element {
    return (
      <div>d</div>
    )
  }
}

export default CareerImage