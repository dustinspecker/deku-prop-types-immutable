# deku-prop-types-immutable

[![NPM version](https://badge.fury.io/js/deku-prop-types-immutable.svg)](http://badge.fury.io/js/deku-prop-types-immutable) [![Build Status](https://travis-ci.org/dustinspecker/deku-prop-types-immutable.svg?branch=master)](https://travis-ci.org/dustinspecker/deku-prop-types-immutable) [![Coverage Status](https://img.shields.io/coveralls/dustinspecker/deku-prop-types-immutable.svg)](https://coveralls.io/r/dustinspecker/deku-prop-types-immutable?branch=master)

[![Code Climate](https://codeclimate.com/github/dustinspecker/deku-prop-types-immutable/badges/gpa.svg)](https://codeclimate.com/github/dustinspecker/deku-prop-types-immutable) [![Dependencies](https://david-dm.org/dustinspecker/deku-prop-types-immutable.svg)](https://david-dm.org/dustinspecker/deku-prop-types-immutable/#info=dependencies&view=table) [![DevDependencies](https://david-dm.org/dustinspecker/deku-prop-types-immutable/dev-status.svg)](https://david-dm.org/dustinspecker/deku-prop-types-immutable/#info=devDependencies&view=table)

> Immutable prop type validation for [Deku](https://github.com/dekujs/deku) components

## Install

```bash
npm install --save deku-prop-types-immutable
```

## Usage

**Note: These Prop Type Validators are meant to be used alongside [deku-prop-types](https://github.com/dustinspecker/deku-prop-types)**

`function-component.jsx`
```jsx
import {element} from 'deku'
import ImmutablePropTypes from 'deku-prop-types-immutable'
import {PropTypes, validate} from 'deku-prop-types'

const Counter = ({props}) => <div>{props.count}</div>
Count.propTypes = {
  count: PropTypes.number.isRequired,
  config: ImmutablePropTypes.map
}

export default validate(Counter)
```

`object-component.jsx`
```jsx
import {element} from 'deku'
import ImmutablePropTypes from 'deku-prop-types-immutable'
import {PropTypes, validate} from 'deku-prop-types'

const Counter = {
  propTypes: {
    count: PropTypes.number.isRequired,
    config: ImmutablePropTypes.map
  },
  render({props}) {
    return <div>{props.count}</div>
  }
}

export default validate(Counter)
```

## Supported types
### ImmutablePropTypes.iterable
Validate prop is an [Immutable.Iterable](https://facebook.github.io/immutable-js/docs/#/Iterable)
### ImmutablePropTypes.list
Validate prop is an [Immutable.List](https://facebook.github.io/immutable-js/docs/#/List)
### ImmutablePropTypes.map
Validate prop is an [Immutable.Map](https://facebook.github.io/immutable-js/docs/#/Map)
### ImmutablePropTypes.orderedMap
Validate prop is an [Immutable.OrderedMap](https://facebook.github.io/immutable-js/docs/#/OrderedMap)
### ImmutablePropTypes.orderedSet
Validate prop is an [Immutable.OrderedSet](https://facebook.github.io/immutable-js/docs/#/OrderedSet)
### ImmutablePropTypes.record
Validate prop is an [Immutable.Record](https://facebook.github.io/immutable-js/docs/#/Record)
### ImmutablePropTypes.set
Validate prop is an [Immutable.Set](https://facebook.github.io/immutable-js/docs/#/Set)
### ImmutablePropTypes.seq
Validate prop is an [Immutable.Seq](https://facebook.github.io/immutable-js/docs/#/Seq)
### ImmutablePropTypes.stack
Validate prop is an [Immutable.Stack](https://facebook.github.io/immutable-js/docs/#/Stack)
## License
MIT © [Dustin Specker](https://github.com/dustinspecker)
