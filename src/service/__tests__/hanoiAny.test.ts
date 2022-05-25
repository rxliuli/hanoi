import { hanoiAnyByDepth } from '../hanoiAny'

it('测试', () => {
  const res = hanoiAnyByDepth(
    {
      a: [4, 5, 6],
      b: [1, 3],
      c: [2],
    },
    'b',
  )
  console.log(res)
})
