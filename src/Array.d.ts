import { a } from './Symbol'

declare global {
    interface Array<T> {
        [a](): {
            /**
             * docs
             */
            present(): Array<NonNullable<T>>
            /**
             * docs unique by
             */
            uniqueBy<K extends keyof T>(key: K): Array<T>
            uniqueBy<K extends keyof T>(key: StringGetter<T>): Array<T>
            /**
             * docs1
             */
            toObject<K>(key: StringGetter<T>, value: Getter<T, K>): Indexed<T>
            /**
             * docs2
             */
            toObject<K>(key: StringGetter<T>): Indexed<T>
        }
    }

}

