import ClickOutside from '../../src/directive/click-outside'
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
      value: 'handleClick',
    }
    ClickOutside.created(el, binding, vnode)
    expect(el[ctx])
  })
})
