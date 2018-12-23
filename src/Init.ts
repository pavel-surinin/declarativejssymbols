import { a } from './Symbol'
import { toBe, Reducer } from 'declarative-js'

(Array.prototype as Array<any>)[a] = function <T>() {
    const array = this as Array<T>
    return {
        present(): Array<T> {
            return array.filter(toBe.present)
        },
        uniqueBy(key: any): Array<T> {
            return array.filter(toBe.uniqueBy(key))
        },
        toObject<K>(key: StringGetter<T>, value?: Getter<T, K>): Indexed<T> {
            return array.reduce(Reducer.toObject(key, value!), {})
        }
    }
}
