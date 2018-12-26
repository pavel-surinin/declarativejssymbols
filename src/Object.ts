import { Indexed } from './types/CommonTypes'
import { ObjectExtension, ObjectEntry } from './types/ObjectTypes'

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
