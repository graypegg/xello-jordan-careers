import { configure } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'

(global as any).Date.now = jest.fn(() => 0)

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
(global as any).localStorage = localStorageMock 

const fetchMock = jest.fn((path: string, { method }) => {
  return new Promise((resolve) => {
    let response;
    switch(`${method} ${path}`) {
      case 'get http://localhost:5000/':
        response = `{"id":1, "data":{
          "bookmarks": [
            {
              "career": {
                "title": "Test",
                "description": "Test",
                "notes": ["a", "b"],
                "image": "TestImage",
                "id": 1
              },
              "saved": "${new Date(Date.now())}"
            }
          ],
          "careersMeta": {
            "1": { "status": "Complete" }
          }
        }}`
        break;
      case 'post http://localhost:5000/':
        response = '{"id":1}'
        break;
    }
    resolve(new Response(response))
  })
});
(global as any).fetch = fetchMock 

configure({ adapter: new Adapter() })