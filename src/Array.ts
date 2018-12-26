import { extend } from './Symbol'
import { StringGetter, Getter, Indexed, Predicate } from './Functional'
import { toBe, Reducer, Sort } from 'declarative-js'

export type ArrayExtension<T> = {
    /**
     * Filters out items, that are not equal to provided item in parameters.
     * Objects are compared to be deep equal.
     */
    equal(valueToMatch: T): Array<T>
    /**
     * Filters out items, that are equal to provided item in parameters.
     * Objects are compared to be deep equal.
     */
    notEqual(valueToMatch: T): Array<T>
    /**
     * Determines uniqueness of an objects in array. Be aware that if value
     * is not primitive, deep object equality will be checked to determine
     * uniqueness.
     * @example
     * [1, 2, 2][extend]().unique()
     * // [1, 2]
     * [{a: 1}, {a: 1}, {a: 2}][extend]().unique()
     * // [{a: 1}, {a: 2}]
     */
    unique(): Array<T>
    /** 
     * Filters out items that are empty
     * @example
     * [1, '', [], {}][extend]().notEmpty()
     * // [1]
     */
    notEmpty(): Array<T>
    /** 
     * Filters out items that are not present ({@code undefined} 
     * and {@code null}) in array
     */
    present(): Array<NonNullable<T>>
    /**
     * Determines uniqueness objects key from callback. This value must be
     * comparable with strict equals
     * @param { string } key     callback to resolve comparable value
     * @example
     * [
     *  { title: 'Predator', genre: 'scy-fy' },
     *  { title: 'Predator 2', genre: 'scy-fy' },
     *  { title: 'Alien vs Predator', genre: 'scy-fy' },
     *  { title: 'Tom & Jerry', genre: 'cartoon' },
     * ][extend]()
     *      .uniqueBy('genre')
     * // [
     * //  { title: 'Predator', genre: 'scy-fy' },
     * //  { title: 'Tom & Jerry', genre: 'cartoon' }
     * // ]
     */
    uniqueBy<K extends keyof T>(key: K): Array<T>
    /**
     * Determines uniqueness by value from callback. This value must be
     * comparable with strict equals
     * @param { Function } getValue     callback to resolve comparable value
     * @example
     * [
     *  { title: 'Predator', genre: 'scy-fy' },
     *  { title: 'Predator 2', genre: 'scy-fy' },
     *  { title: 'Alien vs Predator', genre: 'scy-fy' },
     *  { title: 'Tom & Jerry', genre: 'cartoon' },
     * ][extend]()
     *      .uniqueBy(movie => movie.genre)
     * // [
     * //  { title: 'Predator', genre: 'scy-fy' },
     * //  { title: 'Tom & Jerry', genre: 'cartoon' }
     * // ]
     */
    uniqueBy(key: StringGetter<T>): Array<T>
    /**
     * It will pass items from array, while predicate matches. When predicate
     * returns {@code false} none of the items will pass.
     *
     * @param {Function} predicate callback function that returns boolean
     * @example
     * [
     *  { title: 'Predator', genre: 'scy-fy' },
     *  { title: 'Predator 2', genre: 'scy-fy'},
     *  { title: 'Tom & Jerry', genre: 'cartoon' },
     *  { title: 'Alien vs Predator', genre: 'scy-fy' },
     * ][extend]()
     *      .takeWhile(film => film.genre === 'scy-fy')
     * // [
     * //  { title: 'Predator', genre: 'scy-fy' },
     * //  { title: 'Predator 2', genre: 'scy-fy' }
     * // ]
     */
    takeWhile(predicate: Predicate<T>): Array<T>
    /**
     * Function to group by provided key.
     * @param {string}  key     objects key to resolve value,to group by it
     * @throws {Error}          if resolved key from callback is not a string
     * @example
     * [
     *  { title: 'Predator', genre: 'scy-fy },
     *  { title: 'Predator 2', genre: 'scy-fy},
     *  { title: 'Alien vs Predator', genre: 'scy-fy },
     *  { title: 'Tom & Jerry', genre: 'cartoon },
     * ][extend]()
     *      .groupBy('genre')
     */
    groupBy<K extends keyof T>(key: K): Indexed<T[]>
    /**
     * Function to group by provided callback value.
     * @param {Function} getKey              callback to resolve key,to group by it
     * @throws {Error}                       if resolved key from callback is not a string
     * @example
     * [
     *  { title: 'Predator', genre: 'scy-fy },
     *  { title: 'Predator 2', genre: 'scy-fy},
     *  { title: 'Alien vs Predator', genre: 'scy-fy },
     *  { title: 'Tom & Jerry', genre: 'cartoon },
     * ][extend]()
     *      .groupBy(movie => movie.genre)
     */
    groupBy(getKey: StringGetter<T>): Indexed<T[]>
    /**
     * Function to make from 2d array simple array
     * @example
     * [[1,2],[3,4]][extend]().flat() // [1,2,3,4]
     */
    flat(): Array<T>
    /**
     * Collects items to object by key from callback. If function resolves key,
     * that already exists it will throw an Error. Second callback is value mapper.
     * @param {Function} getKey             callback to get key from value
     * @param {Function} getValue           callback to get value to put in object
     * @throws {Error}                      if map has duplicate keys will thrown error
     * @throws {Error}                      if resolved key from callback is not a string      *
     * @example
     * [
     *  { title: 'Predator', genre: 'scy-fy },
     *  { title: 'Predator 2', genre: 'scy-fy},
     *  { title: 'Alien vs Predator', genre: 'scy-fy },
     *  { title: 'Tom & Jerry', genre: 'cartoon },
     * ][extend]()
     *    .toObject(movie => movie.title, movie => movie.genre)
     */
    toObject<K>(getKey: StringGetter<T>, getValue: Getter<T, K>): Indexed<K>
    /**
     * Collects items to object by key from callback. If function resolves
     * key, that already exists it will throw an Error
     * @param {Function} key                  callback to get key from value
     * @throws {Error}                        if map has duplicate keys will thrown error
     * @throws {Error}                        if resolved key from callback is not a string      *   *
     * @example
     * [
     *  { title: 'Predator', genre: 'scy-fy },
     *  { title: 'Predator 2', genre: 'scy-fy},
     *  { title: 'Alien vs Predator', genre: 'scy-fy },
     *  { title: 'Tom & Jerry', genre: 'cartoon },
     * ][extend]()
     *      .toObject(movie => movie.title)
     */
    toObject(key: StringGetter<T>): Indexed<T>
    /**
     * Reduces array of objects to one object, There is three merge strategies
     * @see Reducer.MergeStrategy (declarative-js)
     * @param merge {@link MergeStrategy} = default is OVERRIDE
     */
    merge<R extends object>(strategy?: Reducer.MergeStrategy): T & R
    /**
     * Sorts array in ascending order by values provided from callbacks.
     * First callback has highest priority in sorting and so on.
     * It accepts as many callbacks as You need.
     * @param {...Function} getters     functions to get values to be compared
     * @returns a closure that can be used in array.sort() function
     * @example
     * persons[extend]().ascendingBy(
     *       x => x.name,
     *       x => x.lastName,
     *       x => x.age
     *   )
     * // [
     * //  { name: 'andrew', lastName: 'Aa', age: 1 },
     * //  { name: 'andrew', lastName: 'Bb', age: 1 },
     * //  { name: 'andrew', lastName: 'Bb', age: 2 },
     * //  { name: 'billy', lastName: 'Cc', age: 1 },
     * //  { name: 'billy', lastName: 'Cc', age: 5 },
     * // ]
     */
    ascendingBy(...getters: ((val: T) => string | number)[]): Array<T>
    /**
     * Sorts array in ascending order by values resolved from be key.
     * First resolved value has highest priority in sorting and so on.
     * It accepts as many keys as You need.
     * @param {...string} keys     functions to get values to be compared
     * @returns a closure that can be used in array.sort() function
     * @example
     * persons[extend]().ascendingBy(
     *       'name',
     *       'lastName',
     *       'age'
     *   )
     * // [
     * //  { name: 'andrew', lastName: 'Aa', age: 1 },
     * //  { name: 'andrew', lastName: 'Bb', age: 1 },
     * //  { name: 'andrew', lastName: 'Bb', age: 2 },
     * //  { name: 'billy', lastName: 'Cc', age: 1 },
     * //  { name: 'billy', lastName: 'Cc', age: 5 },
     * // ]
     */
    ascendingBy<K extends keyof T>(...keys: K[]): Array<T>
    /**
     * Sorts array in descending order by values provided from callbacks.
     * First callback has highest priority in sorting and so on.
     * It accepts as many callbacks as You need.
     * @param {...Function} getters     functions to get values to be compared
     * @returns a closure that can be used in array.sort() function
     * @example
     * persons[extend]().ascendingBy(
     *       x => x.name,
     *       x => x.lastName,
     *       x => x.age
     *   )
     * // [
     * //  { name: 'billy', lastName: 'Cc', age: 5 },
     * //  { name: 'billy', lastName: 'Cc', age: 1 },
     * //  { name: 'andrew', lastName: 'Bb', age: 2 },
     * //  { name: 'andrew', lastName: 'Bb', age: 1 },
     * //  { name: 'andrew', lastName: 'Aa', age: 1 },
     * // ]
     */
    descendingBy(...getters: ((val: T) => string | number)[]): Array<T>
    /**
     * Sorts array in descending order by values resolved from be key.
     * First resolved value has highest priority in sorting and so on.
     * It accepts as many keys as You need.
     * @param {...string} keys     functions to get values to be compared
     * @returns a closure that can be used in array.sort() function
     * @example
     * persons[extend]().ascendingBy(
     *       'name',
     *       'lastName',
     *       'age'
     *   )
     * // [
     * //  { name: 'billy', lastName: 'Cc', age: 5 },
     * //  { name: 'billy', lastName: 'Cc', age: 1 },
     * //  { name: 'andrew', lastName: 'Bb', age: 2 },
     * //  { name: 'andrew', lastName: 'Bb', age: 1 },
     * //  { name: 'andrew', lastName: 'Aa', age: 1 },
     * // ]
     */
    descendingBy<K extends keyof T>(...keys: K[]): Array<T>
    /**
     * Function that will sort items in array with custom values, by provided order.
     * It accepts as a parameter object with valueToOrderElement mapper and array of custom order rule
     * @param {toValue: function(T): R, R[]} ...conditions
     * @example
     * const result =
     *       testTodoData[extend]().sortBy(
     *           { toValue: x => x.severity, order: ['low', 'medium', 'high'] },
     *           { toValue: x => x.task, order: ['Sleep', 'Drink'] }
     *       )
     *      // { task: 'Sleep', severity: 'low' },
     *      // { task: 'Drink', severity: 'low' },
     *      // { task: 'Eat', severity: 'medium' },
     *      // { task: 'Code', severity: 'high' },
     */
    sortBy(...conditions: Sort.SortingCondition<T, any>[]): Array<T>
    /**
     * Function that will sort items in array with custom values, by provided order.
     * It accepts as a parameter object with valueToOrderElement mapper and array of custom order rule
     * @param {toValue: function(T): R, R[]} ...conditions
     * @example
     * const result =
     *       testTodoData[extend]().sortBy('severity', ['low', 'medium', 'high'])
     *      // { task: 'Sleep', severity: 'low' },
     *      // { task: 'Eat', severity: 'medium' },
     *      // { task: 'Code', severity: 'high' },
     */
    sortBy<K extends keyof T>(key: K, values: T[K][]): Array<T>
    /**
     * Function that will sort items in array, by provided order.
     * It accepts as a parameter array of custom order rule.
     * Element, that are not present in order array will be at he the end of the sorted list.
     * @param order     array of custom order of items that are being sorted.
     * @example
     * const testData =
     *   ['bar', 'medium', 'foo', 'low']
     * const result =
     *   testData[extend]()
     *      .orderedBy(['low', 'medium', 'high'])
     * // ['low', 'medium', 'bar', 'foo', ]
     */
    orderedBy(order: Array<T>): Array<T>
}

declare global {
    interface Array<T> {
        [extend](): ArrayExtension<T>
    }
}

export const arrayFx: ArrayExtension<any> = {
    present<T>(this: Array<T>): Array<NonNullable<T>> {
        return this.filter(toBe.present) as Array<NonNullable<T>>
    },
    equal<T>(this: Array<T>, valueToMatch: T): Array<T> {
        return this.filter(toBe.equal(valueToMatch))
    },
    notEqual<T>(this: Array<T>, valueToMatch: T): Array<T> {
        return this.filter(toBe.notEqual(valueToMatch))
    },
    notEmpty<T>(this: Array<T>): Array<T> {
        return this.filter(toBe.notEmpty)
    },
    uniqueBy<T>(this: Array<T>, key: any): Array<T> {
        return this.filter(toBe.uniqueBy(key))
    },
    unique<T>(this: Array<T>): Array<T> {
        return this.filter(toBe.unique)
    },
    takeWhile<T>(this: Array<T>, predicate: Predicate<T>): Array<T> {
        return this.filter(toBe.takeWhile(predicate))
    },
    toObject<T, K>(this: Array<T>, key: StringGetter<T>, value?: Getter<T, K>): Indexed<T> {
        return this.reduce(Reducer.toObject(key, value!), {}) as Indexed<T>
    },
    groupBy<T>(this: Array<T>, key: any): Indexed<T[]> {
        return this.reduce(Reducer.groupBy(key), Reducer.Map()).toObject()
    },
    flat<T, A>(this: Array<A extends Array<T> ? Array<T> : never>): Array<T> {
        return this.reduce(Reducer.flat, [])
    },
    merge<T extends object, R extends object>(this: Array<T>, strategy?: Reducer.MergeStrategy): T & R {
        return this.reduce(
            (pv: T & R, cv: T) => Reducer.toMergedObject(strategy)(pv, cv),
            {} as T & R
        )
    },
    ascendingBy<T>(this: Array<T>, ...getters: any[]): Array<T> {
        return this.sort(Sort.ascendingBy(...getters))
    },
    descendingBy<T>(this: Array<T>, ...getters: any[]): Array<T> {
        return this.sort(Sort.descendingBy(...getters))
    },
    orderedBy<T>(this: Array<T>, order: Array<T>): Array<T> {
        return this.sort(Sort.orderedBy(order))
    },
    sortBy<T>(this: Array<T>, ...conditions: any[]): Array<T> {
        return this.sort(Sort.by(...conditions))
    }
}