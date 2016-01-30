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

const immutableCheckerFactory = (name, validator, instanceCheck = false) =>
  checkerFactory(name, (prop, key) => {
    const typeError = instanceCheck ? immutableInstanceCheck(name, prop, key)
      : immutableTypeCheck(name, prop, key)

    if (typeError) {
      return typeError
    }

    return validator(prop, key)
  })

const listConsistsOf = immutableType => validator =>
  immutableCheckerFactory(immutableType, (prop, key) => {
    const anyErrors = prop.some(p => validator.validate(p) instanceof Error)
    if (anyErrors) {
      return new TypeError(`${key} does not consist of the correct type`)
    }
  })

const mapConsistsOf = (immutableType, instanceCheck) => validator =>
  immutableCheckerFactory(immutableType, (prop, key) => {
    const anyErrors = prop.some((k, v) => validator.validate(v) instanceof Error)
    if (anyErrors) {
      return new TypeError(`${key} does not consist of the correct type`)
    }
  }, instanceCheck)

module.exports = {
  get iterable() {
    return immutableCheckerFactory('Iterable')
  },
  get iterableOf() {
    return mapConsistsOf('Iterable')
  },
  get list() {
    return immutableCheckerFactory('List')
  },
  get listOf() {
    return listConsistsOf('List')
  },
  get map() {
    return immutableCheckerFactory('Map')
  },
  get mapOf() {
    return mapConsistsOf('Map')
  },
  get orderedMap() {
    return immutableCheckerFactory('OrderedMap')
  },
  get orderedMapOf() {
    return mapConsistsOf('OrderedMap')
  },
  get orderedSet() {
    return immutableCheckerFactory('OrderedSet')
  },
  get orderedSetOf() {
    return listConsistsOf('OrderedSet')
  },
  get record() {
    return immutableCheckerFactory('Record', undefined, true)
  },
  get set() {
    return immutableCheckerFactory('Set')
  },
  get setOf() {
    return listConsistsOf('Set')
  },
  get seq() {
    return immutableCheckerFactory('Seq')
  },
  get seqOf() {
    return listConsistsOf('Seq')
  },
  get shape() {
    return shape =>
      checkerFactory('shape', (prop, key) => {
        const validators = Object.keys(shape)

        for (let i = 0; i < validators.length; i++) {
          const validatorResult = shape[validators[i]].validate(
            prop.get(validators[i]),
            `${key}.${validators[i]}`
          )

          if (validatorResult instanceof Error) {
            return validatorResult
          }
        }
      })
  },
  get stack() {
    return immutableCheckerFactory('Stack')
  },
  get stackOf() {
    return listConsistsOf('Stack')
  }
}
