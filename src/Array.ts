import { extend } from './Symbol'
import { StringGetter, Getter, Indexed } from './Functional'
import { toBe, Reducer } from 'declarative-js'

export type ArrayExtension<T> = {
    present(): Array<NonNullable<T>>
    uniqueBy<K extends keyof T>(key: K): Array<T>
    uniqueBy(key: StringGetter<T>): Array<T>
    toObject<K>(key: StringGetter<T>, value: Getter<T, K>): Indexed<K>
    toObject(key: StringGetter<T>): Indexed<T>
    toObject(key: StringGetter<T>): Indexed<T>
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
    uniqueBy<T>(this: Array<T>, key: any): Array<T> {
        return this.filter(toBe.uniqueBy(key))
    },
    toObject<T, K>(this: Array<T>, key: StringGetter<T>, value?: Getter<T, K>): Indexed<T> {
        return this.reduce(Reducer.toObject(key, value!), {})
    }
}