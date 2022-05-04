import { HanoiGame } from '../HanoiGame'

let game: HanoiGame
beforeEach(() => {
  game = new HanoiGame({ a: [1, 2, 3, 4], b: [], c: [] })
})
it('基本示例', () => {
  expect(game.check('a', 'b')).toBeTruthy()
  expect(game.check('a', 'c')).toBeTruthy()
  expect(game.check('b', 'c')).toBeFalsy()
  expect(game.check('c', 'b')).toBeFalsy()
  expect(game.get('a')).toBe(1)
  game.move('a', 'b')
  expect(game.get('a')).toBe(2)
  expect(game.get('b')).toBe(1)
  expect(game.get('c')).toBeUndefined()
})

it('测试移动到自身', () => {
  console.log(game.check('a', 'a'))
})
