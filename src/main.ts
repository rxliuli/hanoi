import './style.css'
import html from 'html-template-tag'
import { HanoiGame, HanoiOperator, HanoiState } from './service/HanoiGame'

const app = document.querySelector<HTMLDivElement>('#app')!

let game = new HanoiGame({ a: [1, 2, 3, 4], b: [], c: [] })

app.innerHTML = html`<div>
  <h1>汉诺塔</h1>
  <main></main>
</div>`

function renderList(state: HanoiState) {
  return html`${(['a', 'b', 'c'] as HanoiOperator[]).map(
    (operator) => html`<ul class="list ${operator}" data-operator="${operator}">
      ${state[operator].map(
        (v) =>
          html`<li style="width: ${(100 + v * 20).toString()}px">
            ${v.toString()}
          </li>`,
      )}
    </ul>`,
  )}`
}
let select: HanoiOperator | null = null

function selection(operator: HanoiOperator) {
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

function render() {
  document.querySelector('main')!.innerHTML = renderList(game.state)

  document.querySelectorAll('.list').forEach((item) =>
    item.addEventListener('click', (e) => {
      const el = e.currentTarget as HTMLUListElement
      const operator = el.dataset.operator as HanoiOperator
      console.log('move: ', select, operator)
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
    }),
  )
}

render()
