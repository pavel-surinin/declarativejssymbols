import { extend } from '../src/Symbol'
import { ObjectEntry, Indexed } from '../src/types'

describe('General', () => {
    it('should find dependencies with different versions', () => {

        const p1 = {
            'name': 'package1',
            'version': '1.0.0',
            'devDependencies': {
                'jest': '23.6.0',
                'prettier': '1.15.3'
            }
        }

        const p2 = {
            'name': 'package2',
            'version': '1.0.0',
            'devDependencies': {
                'jest': '22.0.0',
                'prettier': '1.15.3'
            }
        }

        function toHaveMoreVersions(entry: ObjectEntry<ObjectEntry<string>[]>): boolean {
            return entry.value[extend]()
                .unique()
                .length > 1
        }

        function toInvalidDependency(entry: ObjectEntry<ObjectEntry<string>[]>) {
            return {
                name: entry.key,
                versions: entry.value.map(e => e.value)
            }
        }

        const invalidDeps = [p1, p2]
            .map(pck => pck.devDependencies as Indexed<string>) // object[]
            .map(pck => pck[extend]().entries())[extend]() // {key, value}[][]
            .flat()[extend]() // {key, value}[]
            .groupBy('key')[extend]() // {dependencyName: {name: version}[]}
            .entries() // {key, value}[]
            .filter(toHaveMoreVersions)
            .map(toInvalidDependency)
        expect(invalidDeps).toHaveLength(1)
        expect(invalidDeps[0].name).toBe('jest')
        expect(invalidDeps[0].versions).toMatchObject(['23.6.0', '22.0.0'])

    })
})