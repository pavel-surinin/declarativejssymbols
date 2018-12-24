import { extend } from '../src/Symbol'

interface A {
    person?: P
}
interface P {
    name: string
}
describe('a', () => {
    it('b', () => {
        const arr: A[] = [
            { person: { name: 'John' } },
            { person: { name: 'John' } },
            { person: { name: 'Mike' } },
            { person: undefined },
            { person: { name: 'Mike' } },
            { person: { name: 'Mike' } },
            { person: undefined },
            { person: { name: 'Peter' } },
            { person: { name: 'Peter' } },
            { person: { name: 'Peter' } },
        ]

        const result = arr
            .map(x => x.person)[extend]()
            .present()[extend]()
            .uniqueBy(x => x.name)
            .filter(x => x.name !== 'John')[extend]()
            .toObject(x => x.name, x => x.name)[extend]()
            .values()
            .sort()

        expect(result).toMatchObject(['Peter', 'Mike'].sort())
    })
})