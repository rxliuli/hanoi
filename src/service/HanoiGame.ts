export type HanoiPos = 'a' | 'b' | 'c'

export type HanoiState = Record<HanoiPos, number[]>

export class HanoiGame {
  readonly steps: [HanoiPos, HanoiPos][] = []
  constructor(public state: HanoiState) {}
  check(from: HanoiPos, to: HanoiPos) {
    return (
      this.state[from].length !== 0 &&
      (this.state[to].length === 0 || this.get(from) < this.get(to))
    )
  }
  move(from: HanoiPos, to: HanoiPos) {
    if (!this.check(from, to)) {
      throw new Error(
        `invalid move ${JSON.stringify(this.state)} ${from} ${to}`,
      )
    }
    this.state[to].unshift(this.state[from].shift()!)
    this.steps.push([from, to])
  }
  get(from: HanoiPos) {
    return this.state[from][0]
  }
}
