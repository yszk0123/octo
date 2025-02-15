import { open } from '@/router'

import { bind, bindGlobal, unbind } from '@/common/keybindings'

export const DISABLE_LISTENER = 'DISABLE_LISTENER'
export const DISABLE_LISTENERS = 'DISABLE_LISTENERS'
export const ENABLE_LISTENER = 'ENABLE_LISTENER'
export const ENABLE_LISTENERS = 'ENABLE_LISTENERS'
export const KEYBINDINGS_LOADED = 'KEYBINDINGS_LOADED'
export const LOAD_KEYBINDINGS = 'LOAD_KEYBINDINGS'
export const TOGGLE_LISTENERS = 'TOGGLE_LISTENERS'

const goTo = (name) => {
  open({ name })
}

const makeCallback = (callback, context) => {
  return () => {
    callback()

    context.dispatch(DISABLE_LISTENERS)
  }
}

const makeListener = (keybinding, callback, context) => {
  return { keybinding, callback: makeCallback(callback, context) }
}

const makeListeners = (context) => {
  return [
    makeListener('c', () => goTo('context'), context),
    makeListener('d', () => goTo('discarded'), context),
    makeListener('e', () => goTo('graph'), context),
    makeListener('n', () => goTo('dashboard'), context),
    makeListener('p', () => goTo('daily'), context),
    makeListener('r', () => goTo('recent'), context),
    makeListener('s', () => goTo('settings'), context),
    makeListener('t', () => goTo('actionable'), context),
    makeListener('u', () => goTo('untagged'), context),
  ]
}

export default {
  state: () => ({
    activeElement: null,
    listeners: [],
    listening: false,
    loaded: false,
  }),
  getters: {
    // nothing yet
  },
  mutations: {
    [DISABLE_LISTENER] (state, listener) {
      state.listeners = state.listeners.filter(l => l !== listener)
    },
    [DISABLE_LISTENERS] (state) {
      state.listening = false
    },
    [ENABLE_LISTENER] (state, listener) {
      state.listeners.push(listener)
    },
    [ENABLE_LISTENERS] (state) {
      state.listening = true
    },
    [KEYBINDINGS_LOADED] (state) {
      state.loaded = true
    },
  },
  actions: {
    async [LOAD_KEYBINDINGS] (context) {
      bindGlobal('esc', () => context.dispatch(DISABLE_LISTENERS))
      bindGlobal('mod+k', () => context.dispatch(TOGGLE_LISTENERS))
      bindGlobal('mod+s', () => context.dispatch(DISABLE_LISTENERS))
      bindGlobal('mod+shift+f', () => {
        context.dispatch(DISABLE_LISTENERS)

        goTo('documents')
      })

      // disable listeners on any click
      window.addEventListener('click', () => context.dispatch(DISABLE_LISTENERS))

      context.commit(KEYBINDINGS_LOADED)
    },
    async [DISABLE_LISTENER] (context, listener) {
      unbind(listener)

      context.commit(DISABLE_LISTENER, listener)
    },
    async [DISABLE_LISTENERS] (context) {
      await Promise.all(
        context.state.listeners.map((listener) => {
          context.dispatch(DISABLE_LISTENER, listener)
        })
      )

      if (context.state.activeElement) {
        // todo: use mutation
        context.state.activeElement.focus()
        context.state.activeElement = null
      }

      context.commit(DISABLE_LISTENERS)
    },
    async [ENABLE_LISTENER] (context, listener) {
      bind(listener)

      context.commit(ENABLE_LISTENER, listener)
    },
    async [ENABLE_LISTENERS] (context) {
      // todo: use mutation
      context.state.activeElement = document.activeElement
      context.state.activeElement.blur()

      await Promise.all(
        makeListeners(context).map((listener) => {
          context.dispatch(ENABLE_LISTENER, listener)
        })
      )

      context.commit(ENABLE_LISTENERS)
    },
    async [TOGGLE_LISTENERS] (context, settings) {
      if (context.state.listening) {
        return context.dispatch(DISABLE_LISTENERS)
      } else {
        return context.dispatch(ENABLE_LISTENERS)
      }
    },
  },
}
