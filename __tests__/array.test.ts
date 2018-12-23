import { a } from '../src/Symbol'
import '../src/Init'

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
            .map(x => x.person)[a]()
            .present()[a]()
            .uniqueBy(x => x.name)
            .filter(x => x.name !== 'John')[a]()
            .toObject(x => x.name, x => x.name)

        expect(result).toMatchObject({ Peter: 'Peter', Mike: 'Mike' })
    })
})