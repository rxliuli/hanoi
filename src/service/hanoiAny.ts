import { HanoiPos } from './HanoiGame'

/**
 * 处理任意状态下的汉诺塔
 * @param state
 * @returns
 */
export function hanoiAny(
  state: Record<HanoiPos, number[]>,
): [HanoiPos, HanoiPos][] {
  function findPos(state: Record<HanoiPos, number[]>, value: number): HanoiPos {
    const arr: HanoiPos[] = ['a', 'b', 'c']
    const res = arr.map((i) => state[i][0])
    return arr[res.indexOf(value)]
  }
  function findContinuousCount(arr: number[]): number {
    function f(i: number, last: number): number {
      return arr[i] !== last + 1 ? i : f(i + 1, arr[i])
    }
    return f(1, arr[0])
  }
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
  function findStage(from: HanoiPos, to: HanoiPos): HanoiPos {
    const arr: HanoiPos[] = ['a', 'b', 'c']
    return arr.find((i) => i !== from && i !== to)!
  }
  function move(
    state: Record<HanoiPos, number[]>,
    n: number,
    from: HanoiPos,
    to: HanoiPos,
    stage: HanoiPos,
  ): Record<HanoiPos, number[]> {
    return {
      [to]: state[from].slice(0, n).concat(state[to]),
      [from]: state[from].slice(n),
      [stage]: state[stage],
    } as Record<HanoiPos, number[]>
  }
  function count(state: Record<HanoiPos, number[]>): number {
    const arr: HanoiPos[] = ['a', 'b', 'c']
    return arr.map((i) => state[i].length).reduce((a, b) => a + b)
  }
  function iter(state: Record<HanoiPos, number[]>): [HanoiPos, HanoiPos][] {
    // 寻找小的连续圆盘
    const from = findPos(state, 1)
    const n = findContinuousCount(state[from])
    // 判断是否到最终状态了
    // 返回所有步骤
    if (n === count(state)) {
      return []
    }
    // 否则移动所有连续的圆盘到另一个柱子
    // 找到移动的目标
    const to = findPos(state, state[from][n - 1] + 1)
    const stage = findStage(from, to)
    // 移动
    return calcSteps(n, from, to, stage).concat(
      iter(move(state, n, from, to, stage)),
    )
  }
  return iter(state)
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
