import { addClass, removeClass } from "../dom/index.js"

export function makeHidden(...e) {
  e.forEach((item) => {
    addClass(item, 'hidden')
  })
}

export function makeVisible(...e) {
  e.forEach((item) => {
    removeClass(item, 'hidden')
  })
}