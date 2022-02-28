import ClickOutside from '../../src/directive/click-outside'
import { triggerClick } from '../utils'
const ctx = '@@clickoutsideContext'

describe('Directive:click-outside', () => {
  it('create', () => {
    let count = 0
    const el = document.createElement('div')
    const vnode = {
      context: {
        handleClick: () => count++,
      },
    }
    const binding = {
      expression: 'handleClick',
    }
    ClickOutside.created(el, binding, vnode)
    expect(el[ctx])
  })

  it('context not exist', () => {
    const el = document.createElement('div')
    const vnode = null
    const binding = null
    ClickOutside.created(el, binding, vnode)
    expect(el[ctx])
  })

  it('binding value', async () => {
    let count = 0
    const el = document.createElement('div')
    const vnode = {
      context: {
        handleClick: () => count++,
      },
    }
    const binding = {
      expression: 'handleClick',
    }
    ClickOutside.created(el, binding, vnode)
    triggerClick(document)
    expect(count).toBe(1)
  })
})
