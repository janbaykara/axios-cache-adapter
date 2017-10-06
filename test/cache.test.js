/* globals test expect */

// const axios = require('axios')
const isFunction = require('lodash/isFunction')

const { setup, setupCache } = require('../dist/cache.bundled')
// const cache = setupCache({
//   maxAge: 15 * 60 * 1000
// })
//
// const api = axios.create({
//   adapter: cache.adapter
// })

const api = setup({
  cache: {
    debug: true,
    maxAge: 15 * 60 * 1000
  }
})

test('Required lib', () => {
  expect(isFunction(setupCache)).toBeTruthy()
  expect(isFunction(setup)).toBeTruthy()
})

test('Execute GET request', () => {
  const definition = {
    url: 'https://jsonplaceholder.typicode.com/posts/1',
    method: 'get'
  }

  return api(definition).then(response => {
    const expectedData = expect.objectContaining({
      "userId": 1,
      "id": 1
    })

    expect(response.data).toEqual(expectedData)

    return api(definition).then(response => {
      expect(response.data).toEqual(expectedData)
      expect(response.request.fromCache).toBeTruthy()
    })
  })
})
