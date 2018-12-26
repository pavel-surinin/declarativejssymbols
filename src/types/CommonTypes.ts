import { ObjectExtension } from './ObjectTypes'
import { extend } from '../Symbol'

export type StringGetter<T> = Getter<T, string>
export type Getter<O, V> = (value: O) => V
export type Predicate<T> = (value: T) => boolean

export interface Indexed<V> {
    [key: string]: V
    [extend](): ObjectExtension<V>
}
