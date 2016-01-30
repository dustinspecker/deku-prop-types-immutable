import Immutable from 'immutable'
import test from 'ava'

import ImmutablePropTypes from '../lib'

/* eslint-disable array-bracket-spacing */
const immutableTypes =
  [ 'iterable'
  , 'list'
  , 'map'
  , 'orderedMap'
  , 'orderedSet'
  , 'record'
  , 'set'
  , 'seq'
  , 'stack'
  ]
/* eslint-enable array-bracket-spacing */

immutableTypes.forEach(iType => {
  test(`validates ${iType}`, t => {
    const capitalizedIType = iType[0].toUpperCase() + iType.slice(1, iType.length)
    const types = {
      numbers: ImmutablePropTypes[iType],
      names: ImmutablePropTypes[iType]
    }

    const props = {
      numbers: [3, 4, 5],
      names: Immutable[capitalizedIType]()
    }

    const numbersError = types.numbers.validate(props.numbers, 'numbers')
    t.ok(numbersError instanceof TypeError)
    t.is(numbersError.message, `Expected numbers to be an \`Immutable ${capitalizedIType}\`, but got \`object\``)
  })
})
