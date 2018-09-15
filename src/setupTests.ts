import { configure } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'

(global as any).Date.now = jest.fn(() => 0)

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
(global as any).localStorage = localStorageMock 

const fetchMock = jest.fn((path: string) => {
  return new Promise((resolve) => {
    resolve(new Response('{"id":1, "data":{"a":1}}'))
  })
});
(global as any).fetch = fetchMock 

configure({ adapter: new Adapter() })