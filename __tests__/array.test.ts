import { extend } from '../src/Symbol'

interface A {
    person?: P
}
interface P {
    name: string
}
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
    { person: { name: 'Peter' } }
]
describe('extend', () => {
    describe('array', () => {
        describe('sort', () => {
            const tasks = [
                { task: 'Sleep', severity: 'low' },
                { task: 'Eat', severity: 'medium' },
                { task: 'Drink', severity: 'low' },
                { task: 'Code', severity: 'high' }
            ]
            it('sortBy key', () => {
                const sorted = tasks[extend]()
                    .sortBy('severity', ['high', 'low', 'medium'])
                expect(sorted).toMatchObject([
                    { task: 'Code', severity: 'high' },
                    { task: 'Sleep', severity: 'low' },
                    { task: 'Drink', severity: 'low' },
                    { task: 'Eat', severity: 'medium' },
                ])
            })
            it('sortBy callback', () => {
                const sorted = tasks[extend]()
                    .sortBy(
                        {
                            toValue: x => x.severity,
                            order: ['high', 'low', 'medium']
                        },
                        {
                            toValue: x => x.task,
                            order: ['Drink', 'Sleep']
                        }
                    )
                expect(sorted).toMatchObject([
                    { task: 'Code', severity: 'high' },
                    { task: 'Drink', severity: 'low' },
                    { task: 'Sleep', severity: 'low' },
                    { task: 'Eat', severity: 'medium' },
                ])
            })
            it('orderedBy', () => {
                const sorted = tasks
                    .map(x => x.severity)[extend]()
                    .orderedBy(['high', 'medium', 'low'])
                expect(sorted).toMatchObject(['high', 'medium', 'low', 'low'])
            })
            it('ascending callback', () => {
                const sorted = tasks[extend]()
                    .ascendingBy(x => x.severity, x => x.task)
                expect(sorted).toMatchObject([
                    { task: 'Code', severity: 'high' },
                    { task: 'Drink', severity: 'low' },
                    { task: 'Sleep', severity: 'low' },
                    { task: 'Eat', severity: 'medium' },
                ])
            })
            it('ascending key', () => {
                const sorted = tasks[extend]()
                    .ascendingBy('severity', 'task')
                expect(sorted).toMatchObject([
                    { task: 'Code', severity: 'high' },
                    { task: 'Drink', severity: 'low' },
                    { task: 'Sleep', severity: 'low' },
                    { task: 'Eat', severity: 'medium' },
                ])
            })
        })
        it('not equal', () => {
            const peter = { name: 'Peter' }
            const result = arr
                .map(x => x.person)[extend]()
                .notEqual(peter)
            expect(result).toHaveLength(7)
        })
        it('unique', () => {
            const result = arr[extend]().unique()
            expect(result).toHaveLength(4)
        })
        it('unique by key', () => {
            const result = arr
                .map(x => x.person)[extend]()
                .present()[extend]()
                .uniqueBy('name')
            expect(result).toHaveLength(3)
        })
        it('unique by cb', () => {
            const result = arr
                .map(x => x.person)[extend]()
                .present()[extend]()
                .uniqueBy(x => x.name)
            expect(result).toHaveLength(3)
        })
        it('group by cb', () => {
            const result = arr
                .map(x => x.person)[extend]()
                .present()[extend]()
                .groupBy(x => x.name)
            expect(result).toMatchSnapshot()
        })
        it('group by key', () => {
            const result = arr
                .map(x => x.person)[extend]()
                .present()[extend]()
                .groupBy('name')
            expect(result).toMatchSnapshot()
        })
        it('notEmpty', () => {
            expect([1, '', [], {}][extend]().notEmpty()).toHaveLength(1)
        })
        it('takeWhile', () => {
            expect([1, 2, 3, 4][extend]().takeWhile(n => n !== 3)).toHaveLength(2)
        })
        it('flat', () => {
            expect([[1], [2]][extend]().flat()).toMatchObject([1, 2])
        })
        it('merge', () => {
            const array = [
                { a: 1 },
                { b: 2 }
            ]
            expect(array[extend]().merge()).toMatchObject({ a: 1, b: 2 })
        })
    })
    it('general', () => {
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
