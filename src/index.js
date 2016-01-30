import checkerFactory from 'checker-factory'
import Immutable from 'immutable'

const createTypeError = (type, prop, key) => {
  const actualType = typeof prop
  const errMsg = `Expected ${key} to be an \`Immutable ${type}\`, but got \`${actualType}\``
  return new TypeError(errMsg)
}

const immutableInstanceCheck = (type, prop, key) => {
  if (!(prop instanceof Immutable[type])) {
    return createTypeError(type, prop, key)
  }
}

const immutableTypeCheck = (type, prop, key) => {
  if (!Immutable[type][`is${type}`](prop)) {
    return createTypeError(type, prop, key)
  }
}

const immutableCheckerFactory = (name, instanceCheck = false) =>
  checkerFactory(name, (prop, key) =>
    instanceCheck ? immutableInstanceCheck(name, prop, key)
      : immutableTypeCheck(name, prop, key)
  )

module.exports = {
  get iterable() {
    return immutableCheckerFactory('Iterable')
  },
  get list() {
    return immutableCheckerFactory('List')
  },
  get map() {
    return immutableCheckerFactory('Map')
  },
  get orderedMap() {
    return immutableCheckerFactory('OrderedMap')
  },
  get orderedSet() {
    return immutableCheckerFactory('OrderedSet')
  },
  get record() {
    return immutableCheckerFactory('Record', true)
  },
  get set() {
    return immutableCheckerFactory('Set')
  },
  get seq() {
    return immutableCheckerFactory('Seq')
  },
  get stack() {
    return immutableCheckerFactory('Stack')
  }
}
