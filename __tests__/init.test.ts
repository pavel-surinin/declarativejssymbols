import { extend } from '../src/Symbol'

describe('Initialization', () => {
    it('should init', () => {
        expect(Array.prototype[extend]).toBeDefined()
        expect(Object.prototype[extend]).toBeDefined()
        expect(typeof Array.prototype[extend]).toBe('function')
        expect(typeof Object.prototype[extend]).toBe('function')
        expect(Array.prototype[extend].name).toBe('extendArrayPrototypes')
        expect(Object.prototype[extend].name).toBe('extendObjectPrototypes')
    })
})
