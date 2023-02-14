import { classNames } from './classNames'

describe('className', () => {
  test('with first param', () => {
    const mainClassName = 'someClass'
    expect(classNames(mainClassName)).toBe(mainClassName)
  })

  test('with additional class', () => {
    const expected = 'someClass class1 class2'
    expect(classNames('someClass', {}, ['class1', 'class2'])).toBe(expected)
  })

  test('with mods', () => {
    const expected = 'someClass hovered scrollable class1 class2'
    expect(classNames('someClass', {
      hovered: true,
      scrollable: true,
    }, ['class1', 'class2'])).toBe(expected)
  })

  test('with mods false', () => {
    const expected = 'someClass scrollable class1 class2'
    expect(classNames('someClass', {
      hovered: false,
      scrollable: true,
    }, ['class1', 'class2'])).toBe(expected)
  })

  test('with mods undefined', () => {
    const expected = 'someClass hovered class1 class2'
    expect(classNames('someClass', {
      hovered: true,
      scrollable: undefined,
    }, ['class1', 'class2'])).toBe(expected)
  })
})
