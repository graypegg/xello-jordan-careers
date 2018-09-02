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

const applyOnChangeFactory = (props: ICareerProjectStatusProps, status: EStatus): ((event: React.FormEvent<HTMLSelectElement>) => void) => {
  return ((event) => {
    props.onChange(
      newCareerStatus(props.career, event.currentTarget.value as EStatus)
    )
  })
}

function getClassSuffix (career: ICareer): string {
  switch (career.meta ? career.meta.status : null) {
    case EStatus.NotStarted: return '--not-started'
    case EStatus.InProgress: return '--in-progress'
    case EStatus.Complete: return '--complete'
    default: return '--not-started'
  }
}

function CareerProjectStatus (props: ICareerProjectStatusProps): JSX.Element {
  return (
    <div className={"CareerProjectStatus__wrapper CareerProjectStatus__wrapper" + getClassSuffix(props.career)}>
      <select className="CareerProjectStatus__options" value={getStatus(props.career)} onChange={ applyOnChangeFactory(props, EStatus.Complete) }>
        { Object.keys(EStatus).map((statusKey: string) => (
          <option
            key={statusKey}
            value={EStatus[statusKey]}>
            {EStatus[statusKey]}
          </option>
        )) }
      </select>
    </div>
  )
}

export default CareerProjectStatus