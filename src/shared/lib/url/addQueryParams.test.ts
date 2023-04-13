import { getQueryParams } from './addQueryParams'

describe('shared/url/addQueryParams', () => {
  test('test with one param', () => {
    const params = getQueryParams({
      test: 'value',
    })
    expect(params).toBe('?test=value')
  })

  test('test with multiple param', () => {
    const params = getQueryParams({
      test: 'value',
      code: 'ref',
      print: 'report',
    })
    expect(params).toBe('?test=value&code=ref&print=report')
  })

  test('test with one undefined param', () => {
    const params = getQueryParams({
      test: 'value',
      code: undefined,
    })
    expect(params).toBe('?test=value')
  })
})
