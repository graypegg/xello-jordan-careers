import { EStatus } from "./consts";

export declare interface ICareer {
  title: string,
  description: string,
  notes: string[],
  image: string,
  id: number,
  meta?: {
    status?: EStatus
  }
}

export declare interface IControlsState {
  searchString: string,
  showImages: boolean
}

export declare interface IBookmark {
  career: ICareer,
  saved: Date
}