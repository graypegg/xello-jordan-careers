import { getLatest, postSave } from './api.service';

it('could request latest data', (done) => {
  getLatest()
    .then((obj) => {
      expect(fetch).toBeCalledWith(
        'http://localhost:5000/',
        { 'headers': { 'Content-Type': 'application/json' }, 'method': 'get' }
      )
      done()
    })
})

it('could request update data', (done) => {
  postSave({
    bookmarks: [],
    careersMeta: {}
  })
    .then((obj) => {
      expect(fetch).toBeCalledWith(
        'http://localhost:5000/',
        { "body": "{\"bookmarks\":[],\"careersMeta\":{}}", "headers": { "Content-Type": "application/json" }, "method": "post" }
      )
      done()
    })
})