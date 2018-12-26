import { StringGetter, Getter, Indexed, Predicate } from './types/CommonTypes'
import { toBe, Reducer, Sort } from 'declarative-js'
import { ArrayExtension } from './types/ArrayTypes'

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