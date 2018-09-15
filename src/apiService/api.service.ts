import { IBookmark, ICareer } from "../types";

const APIROOT = `${window.location.protocol}//${window.location.hostname}:5000/`

declare type Methods = 'get' | 'post'
declare type Resources = ''

function request (method: Methods, resource: Resources, body?: object): Promise<Response> {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  } as any
  if (body) options.body = JSON.stringify(body)
  return fetch(APIROOT + resource, options)
}

declare interface IResponseLatest {
  id: number,
  data: {
    bookmarks: IBookmark[],
    careersMeta: { [careerId: number]: ICareer['meta'] }
  }
}
export function getLatest (): Promise<IResponseLatest> {
  return request('get', '')
    .then((response) => response.json())
    .then((response) => {
      return {
        id: response.id,
        data: {
          bookmarks: response.data.bookmarks || [],
          careersMeta: response.data.careersMeta || {}
        }
      }
    })
}

declare interface IResponseSave {
  id: number
}
export function postSave(data: IResponseLatest['data']): Promise<IResponseSave> {
  return request('post', '', data)
    .then((response) => response.json())
}