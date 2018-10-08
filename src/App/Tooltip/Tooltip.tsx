import * as React from 'react'

import './Tooltip.css'

interface ITooltipProps {
  children?: JSX.Element | string,
  content: string,
  title?: string,
  active?: boolean
}

export default function Tooltip (props: ITooltipProps): JSX.Element {
  return (
    <div className="Tooltip__container">
      <div className="Tooltip__target">{ props.children }</div>
      { props.active === undefined || props.active === true
        ? <div className="Tooltip__tooltip">
            {
              props.title
              ? <strong>{ props.title }</strong>
              : null
            }
            { props.content }
          </div>
        : null
      }
    </div>
  )
}