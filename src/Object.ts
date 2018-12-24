import { extend } from './Symbol'
import { Indexed } from './Functional'

declare global {
    interface Object {
        [extend](): ObjectExtension<any>
    }
}

export type ObjectExtension<T> = {
    keys(): string[]
    values(): T[]
    entries(): ObjectEntry<T>[]
    containsKey(key: string): boolean
    containsValue(value: T): boolean
}

export interface ObjectEntry<T> {
    key: PropertyKey,
    value: T
}

export const objectFx: ObjectExtension<any> = {
    containsKey(this: Indexed<any>, key: PropertyKey): boolean {
        return Object.keys(this).some(k => k === key)
    },
    containsValue(this: Indexed<any>, value: any): boolean {
        return Object.keys(this).some(k => this[k] === value)
    },
    keys(this: Indexed<any>): string[] {
        return Object.keys(this)
    },
    values<T>(this: Indexed<any>): T[] {
        return Object.keys(this).map(k => (this as any)[k])
    },
    entries<T>(this: Indexed<any>): ObjectEntry<T>[] {
        return Object.keys(this).map(k => ({ key: k, value: this[k] }))
    }
}
