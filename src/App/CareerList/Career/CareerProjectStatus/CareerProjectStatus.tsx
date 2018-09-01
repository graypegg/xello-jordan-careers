import { ICareer } from '../../../../types'
import { EStatus } from '../../../../consts';
import * as React from 'react'

import './CareerProjectStatus.css'

interface ICareerProjectStatusProps {
  career: ICareer,
  onChange: (newCareer: ICareer) => void 
}

function getStatus (career: ICareer): EStatus {
  if (career.meta) {
    return career.meta.status ? career.meta.status : EStatus.NotStarted
  }
  return EStatus.NotStarted
}

function newCareerStatus (career: ICareer, status: EStatus): ICareer {
  return {
    ...career,
    meta: {
      ...career.meta,
      status
    }
  }
}

const applyOnChange = (props: ICareerProjectStatusProps, status: EStatus): (() => void) => {
  return (() => {
    props.onChange(
      newCareerStatus(props.career, EStatus.Complete)
    )
  })
}

function CareerProjectStatus (props: ICareerProjectStatusProps): JSX.Element {
  return (
    <div className="CareerProjectStatus__wrapper" onClick={ applyOnChange(props, EStatus.Complete) }>
      { getStatus(props.career) }
    </div>
  )
}

export default CareerProjectStatus