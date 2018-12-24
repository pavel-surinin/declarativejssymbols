import { extend } from './Symbol'
import { Reducer } from 'declarative-js'
import { Indexed } from './Functional'
import { ObjectExtension, objectFx } from './Object'
import { ArrayExtension, arrayFx } from './Array'

function bindFunctions(functions: Indexed<Function>, scope: any) {
    const ex = Object.keys(functions).map(k => functions[k])
        .reduce(
            Reducer.toObject(
                fx => (fx as Function).name,
                fx => (fx as Function).bind(scope)),
            {}
        )
    return ex
}

(function () {
    const keys = Reflect.ownKeys(Object.prototype)
    const isExtended = keys.some(k => k === extend)
    if (!isExtended) {
        Array.prototype[extend] = function extendArrayPrototypes() {
            return bindFunctions(arrayFx, this) as ArrayExtension<any>
        }
        Object.prototype[extend] = function extendObjectPrototypes() {
            return bindFunctions(objectFx, this) as ObjectExtension<any>
        }
    }
})()
