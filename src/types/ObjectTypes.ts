import { extend } from '../Symbol'
declare global {
    interface Object {
        [extend]<T>(): ObjectExtension<T>
    }
}
export type ObjectExtension<T> = {
    /** Returns object keys */
    keys(): string[];
    /** Returns object values */
    values(): T[];
    /** Returns object entries as a {key, value} objects array */
    entries(): ObjectEntry<T>[];
    /**
     * Is object contains key
     * @param {string} key to search
     * @returns {boolean}
     */
    containsKey(key: string): boolean;
    /**
     * Is object contains value
     * @param {T} value to search
     * @returns {boolean}
     */
    containsValue(value: T): boolean;
}
export interface ObjectEntry<T> {
    key: PropertyKey
    value: T
}
