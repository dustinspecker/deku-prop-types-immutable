import Immutable from 'immutable'
import {PropTypes} from 'deku-prop-types'
import test from 'ava'

import ImmutablePropTypes from '../lib'

const listLikeTypes = [
  'list',
  'set',
  'orderedSet',
  'seq',
  'stack'
]

const mapLikeTypes = [
  'iterable',
  'map',
  'orderedMap'
]

mapLikeTypes.concat(listLikeTypes).forEach(iType => {
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
    t.truthy(numbersError instanceof TypeError)
    t.is(numbersError.message, `Expected numbers to be an \`Immutable ${capitalizedIType}\`, but got \`object\``)
    t.is(types.names.validate(props.names, 'names'), undefined)
  })
})

test('validates Record', t => {
  const types = {
    numbers: ImmutablePropTypes.record,
    names: ImmutablePropTypes.record
  }

  /* eslint-disable new-cap */
  const Record = Immutable.Record({first: 'dustin'})
  /* eslint-enable new-cap */

  const props = {
    numbers: [3, 4, 5],
    names: new Record()
  }

  const numbersError = types.numbers.validate(props.numbers, 'numbers')
  t.truthy(numbersError instanceof TypeError)
  t.is(numbersError.message, 'Expected numbers to be an `Immutable Record`, but got `object`')
  t.is(types.names.validate(props.names, 'names'), undefined)
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
    t.truthy(numbersError instanceof TypeError)
    t.is(numbersError.message, 'numbers does not consist of the correct type')
  })
})

mapLikeTypes.forEach(mapType => {
  const capitalizedmapType = mapType[0].toUpperCase() + mapType.slice(1, mapType.length)

  test(`validates ${mapType}Of`, t => {
    const types = {
      numbers: ImmutablePropTypes[`${mapType}Of`](PropTypes.number),
      names: ImmutablePropTypes[`${mapType}Of`](PropTypes.string)
    }

    const props = {
      numbers: Immutable[capitalizedmapType]({age: 27, year: '1990'}),
      names: Immutable[capitalizedmapType]({first: 'dustin', last: 'specker'})
    }

    const numbersError = types.numbers.validate(props.numbers, 'numbers')
    t.truthy(numbersError instanceof TypeError)
    t.is(numbersError.message, 'numbers does not consist of the correct type')
    t.is(types.names.validate(props.names, 'names'), undefined)
  })

  test(`validate ${mapType} works with shape`, t => {
    const types = {
      config: ImmutablePropTypes.shape({
        host: PropTypes.string,
        port: PropTypes.number
      }),
      person: ImmutablePropTypes.shape({
        name: PropTypes.string,
        age: PropTypes.number
      })
    }

    const props = {
      config: Immutable[capitalizedmapType]({
        host: 'google.com',
        port: '8080'
      }),
      person: Immutable[capitalizedmapType]({
        name: 'dustin',
        age: 25
      })
    }

    const configError = types.config.validate(props.config, 'config')
    t.truthy(configError instanceof TypeError)
    t.is(configError.message, 'Expected config.port to be of type `number`, but got `string`')
    t.is(types.person.validate(props.person, 'person'), undefined)
  })
})

test('validates recordOf', t => {
  const types = {
    numbers: ImmutablePropTypes.recordOf(PropTypes.number),
    names: ImmutablePropTypes.recordOf(PropTypes.string)
  }

  /* eslint-disable new-cap */
  const NumbersRecord = Immutable.Record({age: 99, year: 1900})
  const NamesRecord = Immutable.Record({first: 'john', last: 'doe'})

  const props = {
    numbers: new NumbersRecord({age: 27, year: '1990'}),
    names: new NamesRecord({first: 'dustin', last: 'specker'})
  }

  const numbersError = types.numbers.validate(props.numbers, 'numbers')
  t.truthy(numbersError instanceof TypeError)
  t.is(numbersError.message, 'numbers does not consist of the correct type')
  t.is(types.names.validate(props.names, 'names'), undefined)
})

test('validate record works with shape', t => {
  const types = {
    config: ImmutablePropTypes.shape({
      host: PropTypes.string,
      port: PropTypes.number
    }),
    person: ImmutablePropTypes.shape({
      name: PropTypes.string,
      age: PropTypes.number
    })
  }

  /* eslint-disable new-cap */
  const ConfigRecord = Immutable.Record({host: 'domain', port: 80})
  const PersonRecord = Immutable.Record({name: 'john', age: 99})
  /* eslint-enable new-cap */

  const props = {
    config: new ConfigRecord({
      host: 'google.com',
      port: '8080'
    }),
    person: new PersonRecord({
      name: 'dustin',
      age: 25
    })
  }

  const configError = types.config.validate(props.config, 'config')
  t.truthy(configError instanceof TypeError)
  t.is(configError.message, 'Expected config.port to be of type `number`, but got `string`')
  t.is(types.person.validate(props.person, 'person'), undefined)
})
