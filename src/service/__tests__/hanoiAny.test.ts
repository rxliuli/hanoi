import { hanoiAny } from '../hanoiAny'

it('测试', () => {
  const res = hanoiAny({
    a: [4, 5, 6],
    b: [1, 3],
    c: [2],
  })
  console.log(res)
})
