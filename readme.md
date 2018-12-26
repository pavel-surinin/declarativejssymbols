# declarative-js-symbols

[![npm version](https://badge.fury.io/js/declarative-js-symbols.svg)](https://www.npmjs.com/package/declarative-js-symbols)
[![Build Status](https://travis-ci.org/pavel-surinin/declarativejssymbols.svg?branch=master)](https://travis-ci.org/pavel-surinin/declarative-js-symbols)
[![Coverage Status](https://coveralls.io/repos/github/pavel-surinin/declarativejssymbols/badge.svg?branch=master)](https://coveralls.io/github/pavel-surinin/declarativejssymbols?branch=master)

Symbol that extends `array` and `object` with additional functions from declarative-js package.

## Usage
```javascript
import { extends } from 'declarative-js-symbols'
import { data } from './businessData'

const transformedData = 
    data[extends]() //extending object prototypes
        .values()[extends]() //extending array prototypes
        .present()[extends]()
        .sortBy('severity')[extends]()
        .takeWhile(x => x.severity === 'Critical')
        .map(x => x.task)[extends]()
        .groupBy('taskName')
```

## Array

### equal
Filters out items, that are not equal to provided item in parameters.
Objects are compared to be deep equal.
```typescript
interface ArrayExtension<T> {
    equal(valueToMatch: T): Array<T>
}
```

### notEqual    
 Filters out items, that are equal to provided item in parameters.
 Objects are compared to be deep equal.
```typescript
interface ArrayExtension<T> {
    notEqual(valueToMatch: T): Array<T>
}
```
### unique    
Determines uniqueness of an objects in array. Be aware that if value
is not primitive, deep object equality will be checked to determine
uniqueness.
```typescript
interface ArrayExtension<T> {
    unique(): Array<T>
}
```
```javascript
 [1, 2, 2][extend]().unique()
 // [1, 2]
 [{a: 1}, {a: 1}, {a: 2}][extend]().unique()
 // [{a: 1}, {a: 2}]
```

### notEmpty 
 Filters out items that are empty
```typescript
interface ArrayExtension<T> {
    notEmpty(): Array<T>
}
```
```javascript
 [1, '', [], {}][extend]().notEmpty()
 // [1]
```

### present

Filters out items that are not present `undefined` 
and `null` in array
```typescript
    present(): Array<NonNullable<T>>
```
### uniqueBy
 Determines uniqueness objects key from callback. This value must be
 comparable with strict equals
  
```typescript
interface ArrayExtension<T> {
    uniqueBy<K extends keyof T>(key: K): Array<T>
    uniqueBy(key: StringGetter<T>): Array<T>
}
```
```javascript
 [
  { title: 'Predator', genre: 'sci-fi' },
  { title: 'Predator 2', genre: 'sci-fi' },
  { title: 'Alien vs Predator', genre: 'sci-fi' },
  { title: 'Tom & Jerry', genre: 'cartoon' },
 ][extend]()
        .uniqueBy(movie => movie.genre) 
        .uniqueBy('genre') // overload
 // [
 //  { title: 'Predator', genre: 'sci-fi' },
 //  { title: 'Tom & Jerry', genre: 'cartoon' }
 // ]
```

### takeWhile
 It will pass items from array, while predicate matches. When predicate
 returns `false` none of the items will pass.

```typescript
interface ArrayExtension<T> {
    takeWhile(predicate: Predicate<T>): Array<T>
}
```
```javascript
 [
  { title: 'Predator', genre: 'sci-fi' },
  { title: 'Predator 2', genre: 'sci-fi'},
  { title: 'Tom & Jerry', genre: 'cartoon' },
  { title: 'Alien vs Predator', genre: 'sci-fi' },
 ][extend]()
      .takeWhile(film => film.genre === 'sci-fi')
 // [
 //  { title: 'Predator', genre: 'sci-fi' },
 //  { title: 'Predator 2', genre: 'sci-fi' }
 // ]
```
### groupBy
 Function to group by provided key.

```typescript
interface ArrayExtension<T> {
    groupBy<K extends keyof T>(key: K): Indexed<T[]>
    groupBy(getKey: StringGetter<T>): Indexed<T[]>
}
```
```javascript
 [
  { title: 'Predator', genre: 'sci-fi' },
  { title: 'Predator 2', genre: 'sci-fi'},
  { title: 'Alien vs Predator', genre: 'sci-fi' },
  { title: 'Tom & Jerry', genre: 'cartoon' },
 ][extend]()
      .groupBy('genre')
    // overload  
    //.groupBy(movie => movie.genre) 
```
### flat
Function to make from 2d array simple array
```typescript
interface ArrayExtension<T> {
    flat(): Array<T>
}
```
```javascript
[[1,2],[3,4]][extend]()
    .flat() 
// [1,2,3,4]
```
### toObject
 Collects items to object by key from callback. If function resolves key,
 that already exists it will throw an Error. Second callback is value mapper.
```typescript
interface ArrayExtension<T> {
    toObject<K>(
        getKey: (value: T) => string, 
        getValue: (value: T) => K
    ): Indexed<K>
}
```
```javascript
[
    { title: 'Predator', genre: 'sci-fi' },
    { title: 'Predator 2', genre: 'sci-fi'},
    { title: 'Alien vs Predator', genre: 'sci-fi' },
    { title: 'Tom & Jerry', genre: 'cartoon' },
][extend]()
    .toObject(movie => movie.title, movie => movie.genre)
```
 Collects items to object by key from callback. If function resolves
 key, that already exists it will throw an `Error`
```typescript
interface ArrayExtension<T> {
    toObject(key: (value: T) => string): Indexed<T>
}
```
```javascript
 [
  { title: 'Predator', genre: 'sci-fi' },
  { title: 'Predator 2', genre: 'sci-fi'},
  { title: 'Alien vs Predator', genre: 'sci-fi' },
  { title: 'Tom & Jerry', genre: 'cartoon' },
 ][extend]()
      .toObject(movie => movie.title)
```
### merge
Reduces array of objects to one object, There is three merge strategies

`@see` Reducer.MergeStrategy (declarative-js)

`@param` merge {@link MergeStrategy} = default is OVERRIDE
```typescript
interface ArrayExtension<T> {
    merge<R extends object>(strategy?: Reducer.MergeStrategy): T & R
}
```
### ascendingBy
 Sorts array in ascending order by values provided.
 First value has highest priority in sorting and so on.
 It accepts as many value resolvers as You need.
```typescript
interface ArrayExtension<T> {
    ascendingBy<K extends keyof T>(...keys: K[]): Array<T>
    ascendingBy(...getters: ((val: T) => string | number)[]): Array<T>
}
```
```javascript
persons[extend]().ascendingBy(
    x => x.name,
    x => x.lastName,
    x => x.age
)
//overload
persons[extend]().ascendingBy(
    'name',
    'lastName',
    'age'
)
 // [
 //  { name: 'andrew', lastName: 'Aa', age: 1 },
 //  { name: 'andrew', lastName: 'Bb', age: 1 },
 //  { name: 'andrew', lastName: 'Bb', age: 2 },
 //  { name: 'billy', lastName: 'Cc', age: 1 },
 //  { name: 'billy', lastName: 'Cc', age: 5 },
 // ]
```
### descendingBy
 Sorts array in descending order by values provided.
 First value has highest priority in sorting and so on.
 It accepts as many values as You need.
```typescript
interface ArrayExtension<T> {
    descendingBy<K extends keyof T>(...keys: K[]): Array<T>
    descendingBy(...getters: ((val: T) => string | number)[]): Array<T>
}
```
```javascript
 persons[extend]().ascendingBy(
    x => x.name,
    x => x.lastName,
    x => x.age
)
// overload
persons[extend]().ascendingBy(
    'name',
    'lastName',
    'age'
)
 // [
 //  { name: 'billy', lastName: 'Cc', age: 5 },
 //  { name: 'billy', lastName: 'Cc', age: 1 },
 //  { name: 'andrew', lastName: 'Bb', age: 2 },
 //  { name: 'andrew', lastName: 'Bb', age: 1 },
 //  { name: 'andrew', lastName: 'Aa', age: 1 },
 // ]
```
### sortBy
Function that will sort items in array with custom values, by provided order.
It accepts as a parameter object with valueToOrderElement mapper and array of custom order rule
```typescript
import { Sort } from 'declarative-js'

interface ArrayExtension<T> {
    sortBy(...conditions: Sort.SortingCondition<T, any>[]): Array<T>
    sortBy<K extends keyof T>(key: K, values: T[K][]): Array<T>
}
```
```javascript
testTodoData[extend]().sortBy(
    { toValue: x => x.severity, order: ['low', 'medium', 'high'] },
    { toValue: x => x.task, order: ['Sleep', 'Drink'] }
)
// overload with one sorting condition
testTodoData[extend]().sortBy('severity', ['low', 'medium', 'high'])
      // { task: 'Sleep', severity: 'low' },
      // { task: 'Drink', severity: 'low' },
      // { task: 'Eat', severity: 'medium' },
      // { task: 'Code', severity: 'high' },
```
### orderedBy
Function that will sort items in array, by provided order.
It accepts as a parameter array of custom order rule.
Element, that are not present in order array will be at he the end of the sorted list.
```typescript
interface ArrayExtension<T> {
    orderedBy(order: Array<T>): Array<T>
}
```
```javascript
 const testData =
   ['bar', 'medium', 'foo', 'low']
 const result =
   testData[extend]()
      .orderedBy(['low', 'medium', 'high'])
 // ['low', 'medium', 'bar', 'foo', ]
```

## Object

### keys 
Returns object keys
```typescript
interface ObjectExtension<T> {
    keys(): string[]
}
```
Returns object values
### values 
```typescript
interface ObjectExtension<T> {
    values(): T[]
}
```
### entries 
Returns object entries as a {key, value} objects array
```typescript
interface ObjectExtension<T> {
    entries(): ObjectEntry<T>[]
}
interface ObjectEntry<T> {
    key: PropertyKey,
    value: T
}
```
### containsKey 
Is object contains key
```typescript
interface ObjectExtension<T> {
    containsKey(key: string): boolean
}
```
### containsValue 
Is object contains value
```typescript
interface ObjectExtension<T> {
    containsValue(value: T): boolean
}
```