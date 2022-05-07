import './style.css'
import html from 'html-template-tag'
import { HanoiGame, HanoiPos, HanoiState } from './service/HanoiGame'
import { hanoi, hanoiAny } from './service/hanoiAny'
import { wait } from '@liuli-util/async'

let count = 6

function findPos(state: Record<HanoiPos, number[]>, value: number): HanoiPos {
  const arr: HanoiPos[] = ['a', 'b', 'c']
  const res = arr.map((i) => state[i][0])
  return arr[res.indexOf(value)]
}

function findStage(from: HanoiPos, to: HanoiPos): HanoiPos {
  const arr: HanoiPos[] = ['a', 'b', 'c']
  return arr.find((i) => i !== from && i !== to)!
}

const app = document.querySelector<HTMLDivElement>('#app')!

let game = new HanoiGame({
  a: Array(count)
    .fill(0)
    .map((_, i) => i + 1),
  b: [],
  c: [],
})

function renderList(state: HanoiState) {
  return html`${(['a', 'b', 'c'] as HanoiPos[]).map(
    (operator) => html`<ul class="list ${operator}" data-operator="${operator}">
      ${state[operator].map(
        (v) =>
          html`<li style="width: ${(100 - 10 * (count - v)).toString()}%">
            ${v.toString()}
          </li>`,
      )}
    </ul>`,
  )}`
}
let select: HanoiPos | null = null

function selection(operator: HanoiPos) {
  select = operator
  document.querySelector(`.${operator}`)!.classList.add('selected')
}
function unSelection() {
  if (!select) {
    return
  }
  document.querySelector(`.${select}`)!.classList.remove('selected')
  select = null
}

function click(operator: HanoiPos) {
  if (!select) {
    if (!game.get(operator)) {
      console.log('无法选中')
      return
    }
    selection(operator)
    return
  }
  if (!game.check(select, operator)) {
    console.warn('无法移动')
    unSelection()
    return
  }
  game.move(select, operator)
  select = null
  render()
}

let auto = false

function render() {
  app.innerHTML = html`
    <h1>汉诺塔</h1>
    <main></main>
    <footer></footer>
    <button>自动</button>
  `
  document.querySelector('main')!.innerHTML = renderList(game.state)
  document.querySelector('footer')!.textContent = `步数 ${game.steps.length}`
  document.querySelector('button')!.textContent = auto ? '暂停' : '自动'
  document.querySelector('button')!.addEventListener('click', async () => {
    if (auto) {
      auto = false
      return
    }
    auto = true
    async function exec(steps: [HanoiPos, HanoiPos][]) {
      for (const [from, to] of steps) {
        console.log('form => to: ', from, to)
        if (!auto) {
          break
        }
        click(from)
        await wait(100)
        click(to)
        await wait(100)
      }
    }

    await exec(hanoiAny(game.state))
    const from = findPos(game.state, 1)
    await exec(
      from === 'b'
        ? []
        : hanoi(game.state[from].length, from, 'b', findStage(from, 'b')),
    )

    auto = false
    render()
  })

  document.querySelectorAll('.list').forEach((item) =>
    item.addEventListener('click', (e) => {
      const el = e.currentTarget as HTMLUListElement
      const operator = el.dataset.operator as HanoiPos
      console.log('move: ', select, operator)
      click(operator)
    }),
  )
}

render()
