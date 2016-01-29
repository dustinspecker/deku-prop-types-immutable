import Immutable from 'immutable'
import test from 'ava'

import ImmutablePropTypes from '../lib'

/* eslint-disable array-bracket-spacing */
const immutableTypes =
  [ 'Iterable'
  , 'List'
  , 'Map'
  , 'OrderedMap'
  , 'OrderedSet'
  , 'Record'
  , 'Set'
  , 'Seq'
  , 'Stack'
  ]
/* eslint-enable array-bracket-spacing */

immutableTypes.forEach(iType => {
  test(`validates ${iType}`, t => {
    const types = {
      numbers: ImmutablePropTypes[iType],
      names: ImmutablePropTypes[iType]
    }

    const props = {
      numbers: [3, 4, 5],
      names: Immutable[iType]()
    }

    const numbersError = types.numbers.validate(props.numbers, 'numbers')
    t.ok(numbersError instanceof TypeError)
    t.is(numbersError.message, `Expected numbers to be an \`Immutable ${iType}\`, but got \`object\``)
  })
})
