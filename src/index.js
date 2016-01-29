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

const immutableInstanceCheckerFactory = name =>
  checkerFactory(name, (prop, key) => {
    const typeError = immutableInstanceCheck(name, prop, key)
    if (typeError) {
      return typeError
    }
  })

const immutableTypeCheck = (type, prop, key) => {
  if (!Immutable[type][`is${type}`](prop)) {
    return createTypeError(type, prop, key)
  }
}

const immutableTypeCheckerFactory = name =>
  checkerFactory(name, (prop, key) => {
    const typeError = immutableTypeCheck(name, prop, key)
    if (typeError) {
      return typeError
    }
  })

module.exports = {
  get Iterable() {
    return immutableTypeCheckerFactory('Iterable')
  },
  get List() {
    return immutableTypeCheckerFactory('List')
  },
  get Map() {
    return immutableTypeCheckerFactory('Map')
  },
  get OrderedMap() {
    return immutableTypeCheckerFactory('OrderedMap')
  },
  get OrderedSet() {
    return immutableTypeCheckerFactory('OrderedSet')
  },
  get Record() {
    return immutableInstanceCheckerFactory('Record')
  },
  get Set() {
    return immutableTypeCheckerFactory('Set')
  },
  get Seq() {
    return immutableTypeCheckerFactory('Seq')
  },
  get Stack() {
    return immutableTypeCheckerFactory('Stack')
  }
}
