export type HanoiOperator = 'a' | 'b' | 'c'

export type HanoiState = Record<HanoiOperator, number[]>

export class HanoiGame {
  constructor(public state: HanoiState) {}
  check(from: HanoiOperator, to: HanoiOperator) {
    return (
      this.state[from].length !== 0 &&
      (this.state[to].length === 0 || this.get(from) < this.get(to))
    )
  }
  move(from: HanoiOperator, to: HanoiOperator) {
    if (!this.check(from, to)) {
      throw new Error(
        `invalid move ${JSON.stringify(this.state)} ${from} ${to}`,
      )
    }
    this.state[to].unshift(this.state[from].shift()!)
  }
  get(from: HanoiOperator) {
    return this.state[from][0]
  }
}
