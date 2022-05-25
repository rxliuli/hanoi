import { HanoiGame, HanoiPos } from './HanoiGame'

/**
 * 处理任意状态下的汉诺塔
 * 优先考虑如何将最大的圆盘移动到合适的位置，必须要考虑无法移动的情况（在无法移动的情况下应该尝试合并两外两个柱子）
 */
export function hanoiAnyByDepth(
  state: Record<HanoiPos, number[]>,
  to: HanoiPos,
): [HanoiPos, HanoiPos][] {
  function findPosByNumber(
    state: Record<HanoiPos, number[]>,
    n: number,
  ): HanoiPos {
    return Object.entries(state).find(([_k, v]) =>
      v.includes(n),
    )?.[0] as HanoiPos
  }
  function isMove(
    state: Record<HanoiPos, number[]>,
    from: HanoiPos,
    to: HanoiPos,
    n: number,
  ) {
    const game = new HanoiGame(state)
    return game.get(from) === n && game.check(from, to)
  }
  function move(
    state: Record<HanoiPos, number[]>,
    steps: [HanoiPos, HanoiPos][],
  ): Record<HanoiPos, number[]> {
    const game = new HanoiGame(JSON.parse(JSON.stringify(state)))
    steps.forEach((step) => game.move(...step))
    return game.state
  }
  function findStage(from: HanoiPos, to: HanoiPos): HanoiPos {
    const arr: HanoiPos[] = ['a', 'b', 'c']
    return arr.find((i) => i !== from && i !== to)!
  }
  function iter(
    state: Record<HanoiPos, number[]>,
    from: HanoiPos,
    to: HanoiPos,
    stage: HanoiPos,
    n: number,
  ): [HanoiPos, HanoiPos][] {
    if (from === to) {
      const nextFrom = findPosByNumber(state, n - 1)
      return iter(state, nextFrom, to, findStage(nextFrom, to), n - 1)
    }
    if (n === 0) {
      return []
    }
    // 移动 from => to 的一个指定值
    // 如果可以直接移动，则直接移动
    if (isMove(state, from, to, n)) {
      return [[from, to]]
    }
    // 否则找到上面影响移动的最大圆盘到临时柱，递归调用该方法
    const values = [...state[from], ...state[to]].sort((a, b) => a - b)
    const nextN = values[values.indexOf(n) - 1]
    const nextForm = findPosByNumber(state, nextN)
    // 应用上面的移动步骤，然后递归调用该方法
    const before = iter(
      state,
      nextForm,
      stage,
      findStage(nextForm, stage),
      nextN,
    )
    let nextState = move(state, before)
    const current = iter(nextState, from, to, stage, n)
    nextState = move(nextState, current)
    const next = findPosByNumber(nextState, n - 1)
    const after = iter(nextState, next, to, findStage(next, to), n - 1)
    return [...before, ...current, ...after]
  }
  const initN = Object.values(state).flat().length
  const initForm = findPosByNumber(state, initN)
  return iter(state, initForm, to, findStage(initForm, to), initN)
}

export function hanoi(
  n: number,
  from: HanoiPos,
  to: HanoiPos,
  stage: HanoiPos,
): [HanoiPos, HanoiPos][] {
  function calcSteps(
    n: number,
    from: HanoiPos,
    to: HanoiPos,
    stage: HanoiPos,
  ): [HanoiPos, HanoiPos][] {
    if (n === 1) {
      return [[from, to]]
    }
    return calcSteps(n - 1, from, stage, to)
      .concat(calcSteps(1, from, to, stage))
      .concat(calcSteps(n - 1, stage, to, from))
  }
  return calcSteps(n, from, to, stage)
}
