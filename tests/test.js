import Immutable from 'immutable'
import {PropTypes} from 'deku-prop-types'
import test from 'ava'

import ImmutablePropTypes from '../lib'

/* eslint-disable array-bracket-spacing */
const listLikeTypes =
 [ 'list'
 , 'set'
 , 'orderedSet'
 , 'seq'
 , 'stack'
 ]

const mapLikeTypes =
  [ 'iterable'
  , 'map'
  , 'orderedMap'
  ]
/* eslint-enable array-bracket-spacing */

mapLikeTypes.concat(listLikeTypes).concat('record').forEach(iType => {
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

listLikeTypes.forEach(listType => {
  test(`validates ${listType}Of`, t => {
    const capitalizedListType = listType[0].toUpperCase() + listType.slice(1, listType.length)
    const types = {
      numbers: ImmutablePropTypes[`${listType}Of`](PropTypes.number),
      names: ImmutablePropTypes[`${listType}Of`](PropTypes.string)
    }

    const props = {
      numbers: Immutable[capitalizedListType].of('hi', 'bye', 'hey'),
      names: Immutable[capitalizedListType].of('dustin', 'matt', 'kira')
    }

    const numbersError = types.numbers.validate(props.numbers, 'numbers')
    t.ok(numbersError instanceof TypeError)
    t.is(numbersError.message, 'numbers does not consist of the correct type')
  })
})

mapLikeTypes.forEach(mapType => {
  test(`validates ${mapType}Of`, t => {
    const capitalizedmapType = mapType[0].toUpperCase() + mapType.slice(1, mapType.length)
    const types = {
      numbers: ImmutablePropTypes[`${mapType}Of`](PropTypes.number),
      names: ImmutablePropTypes[`${mapType}Of`](PropTypes.string)
    }

    const props = {
      numbers: Immutable[capitalizedmapType]({age: 27, year: '1990'}),
      names: Immutable[capitalizedmapType]({first: 'dustin', last: 'specker'})
    }

    const numbersError = types.numbers.validate(props.numbers, 'numbers')
    t.ok(numbersError instanceof TypeError)
    t.is(numbersError.message, 'numbers does not consist of the correct type')
  })
})
