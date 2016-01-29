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
  checkerFactory(name, (prop, key) => {
    const typeError = instanceCheck ? immutableInstanceCheck(name, prop, key)
      : immutableTypeCheck(name, prop, key)
    if (typeError) {
      return typeError
    }
  })

module.exports = {
  get Iterable() {
    return immutableCheckerFactory('Iterable')
  },
  get List() {
    return immutableCheckerFactory('List')
  },
  get Map() {
    return immutableCheckerFactory('Map')
  },
  get OrderedMap() {
    return immutableCheckerFactory('OrderedMap')
  },
  get OrderedSet() {
    return immutableCheckerFactory('OrderedSet')
  },
  get Record() {
    return immutableCheckerFactory('Record', true)
  },
  get Set() {
    return immutableCheckerFactory('Set')
  },
  get Seq() {
    return immutableCheckerFactory('Seq')
  },
  get Stack() {
    return immutableCheckerFactory('Stack')
  }
}
