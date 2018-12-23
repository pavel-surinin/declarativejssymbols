declare type StringGetter<T> = Getter<T, string>
declare type Getter<O, V> = (value: O) => V
declare interface Indexed<V> {
    [key: string]: V
}
