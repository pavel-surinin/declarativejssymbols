import { extend } from '../src/Symbol'

describe('object', () => {
    const object = {
        'name': 'declarative-js-symbols',
        'version': '0.0.13',
        'main': 'index.js',
    }
    it('should get keys', () => {
        const result = object[extend]().keys()
        expect(result).toMatchObject(['name', 'version', 'main'])
    })
    it('should get values', () => {
        const result = object[extend]().values()
        expect(result).toMatchObject(['declarative-js-symbols', '0.0.13', 'index.js'])
    })
    it('should get entries', () => {
        const result = object[extend]().entries()
        expect(result).toMatchObject([
            { key: 'name', value: 'declarative-js-symbols' },
            { key: 'version', value: '0.0.13' },
            { key: 'main', value: 'index.js' },
        ])
    })
    it('should check is contains keys: true', () => {
        const result = object[extend]().containsKey('name')
        expect(result).toBeTruthy()
    })
    it('should check is contains values: true', () => {
        const result = object[extend]().containsValue('index.js')
        expect(result).toBeTruthy()
    })
    it('should check is contains values: false', () => {
        const result = object[extend]().containsValue('foo')
        expect(result).toBeFalsy()
    })
    it('should check is contains keys: false', () => {
        const result = object[extend]().containsKey('foo')
        expect(result).toBeFalsy()
    })
})