export = std;

declare namespace std {
}
declare namespace std.base {
}
declare namespace std {
    function for_each<T, InputIterator extends IForwardIterator<T>, Func extends (val: T) => any>(first: InputIterator, last: InputIterator, fn: Func): Func;
    function for_each_n<T, InputIterator extends IForwardIterator<T>, Func extends (val: T) => any>(first: InputIterator, n: number, fn: Func): InputIterator;
    function all_of<T, InputIterator extends IForwardIterator<T>>(first: InputIterator, last: InputIterator, pred: (val: T) => boolean): boolean;
    function any_of<T, InputIterator extends IForwardIterator<T>>(first: InputIterator, last: InputIterator, pred: (val: T) => boolean): boolean;
    function none_of<T, InputIterator extends IForwardIterator<T>>(first: InputIterator, last: InputIterator, pred: (val: T) => boolean): boolean;
    function equal<T, InputIterator extends IForwardIterator<T>>(first1: InputIterator, last1: InputIterator, first2: IForwardIterator<T>): boolean;
    function equal<T, InputIterator extends IForwardIterator<T>>(first1: InputIterator, last1: InputIterator, first2: IForwardIterator<T>, pred: (x: T, y: T) => boolean): boolean;
    function lexicographical_compare<T, T1 extends T, T2 extends T, Iterator1 extends IForwardIterator<T1>, Iterator2 extends IForwardIterator<T2>>(first1: Iterator1, last1: Iterator1, first2: Iterator2, last2: Iterator2): boolean;
    function lexicographical_compare<T, T1 extends T, T2 extends T, Iterator1 extends IForwardIterator<T1>, Iterator2 extends IForwardIterator<T2>>(first1: Iterator1, last1: Iterator1, first2: Iterator2, last2: Iterator2, compare: (x: T, y: T) => boolean): boolean;
    function find<T, InputIterator extends IForwardIterator<T>>(first: InputIterator, last: InputIterator, val: T): InputIterator;
    function find_if<T, InputIterator extends IForwardIterator<T>>(first: InputIterator, last: InputIterator, pred: (val: T) => boolean): InputIterator;
    function find_if_not<T, InputIterator extends IForwardIterator<T>>(first: InputIterator, last: InputIterator, pred: (val: T) => boolean): InputIterator;
    function find_end<T, Iterator1 extends IForwardIterator<T>, Iterator2 extends IForwardIterator<T>>(first1: Iterator1, last1: Iterator1, first2: Iterator2, last2: Iterator2): Iterator1;
    function find_end<T, Iterator1 extends IForwardIterator<T>, Iterator2 extends IForwardIterator<T>>(first1: Iterator1, last1: Iterator1, first2: Iterator2, last2: Iterator2, pred: (x: T, y: T) => boolean): Iterator1;
    function find_first_of<T, Iterator1 extends IForwardIterator<T>, Iterator2 extends IForwardIterator<T>>(first1: Iterator1, last1: Iterator1, first2: Iterator2, last2: Iterator2): Iterator1;
    function find_first_of<T, Iterator1 extends IForwardIterator<T>, Iterator2 extends IForwardIterator<T>>(first1: Iterator1, last1: Iterator1, first2: Iterator2, last2: Iterator2, pred: (x: T, y: T) => boolean): Iterator1;
    function adjacent_find<T, InputIterator extends IForwardIterator<T>>(first: InputIterator, last: InputIterator): InputIterator;
    function adjacent_find<T, InputIterator extends IForwardIterator<T>>(first: InputIterator, last: InputIterator, pred: (x: T, y: T) => boolean): InputIterator;
    function search<T, ForwardIterator1 extends IForwardIterator<T>, ForwardIterator2 extends IForwardIterator<T>>(first1: ForwardIterator1, last1: ForwardIterator1, first2: ForwardIterator2, last2: ForwardIterator2): ForwardIterator1;
    function search<T, ForwardIterator1 extends IForwardIterator<T>, ForwardIterator2 extends IForwardIterator<T>>(first1: ForwardIterator1, last1: ForwardIterator1, first2: ForwardIterator2, last2: ForwardIterator2, pred: (x: T, y: T) => boolean): ForwardIterator1;
    function search_n<T, ForwardIterator extends IForwardIterator<T>>(first: ForwardIterator, last: ForwardIterator, count: number, val: T): ForwardIterator;
    function search_n<T, ForwardIterator extends IForwardIterator<T>>(first: ForwardIterator, last: ForwardIterator, count: number, val: T, pred: (x: T, y: T) => boolean): ForwardIterator;
    function mismatch<T, Iterator1 extends IForwardIterator<T>, Iterator2 extends IForwardIterator<T>>(first1: Iterator1, last1: Iterator1, first2: Iterator2): Pair<Iterator1, Iterator2>;
    function mismatch<T, Iterator1 extends IForwardIterator<T>, Iterator2 extends IForwardIterator<T>>(first1: Iterator1, last1: Iterator1, first2: Iterator2, compare: (x: T, y: T) => boolean): Pair<Iterator1, Iterator2>;
    function count<T, InputIterator extends IForwardIterator<T>>(first: InputIterator, last: InputIterator, val: T): number;
    function count_if<T, InputIterator extends IForwardIterator<T>>(first: InputIterator, last: InputIterator, pred: (val: T) => boolean): number;
}
declare namespace std {
    function copy<T, InputIterator extends IForwardIterator<T>, OutputIterator extends base.ILinearIterator<T>>(first: InputIterator, last: InputIterator, result: OutputIterator): OutputIterator;
    function copy_n<T, InputIterator extends IForwardIterator<T>, OutputIterator extends base.ILinearIterator<T>>(first: InputIterator, n: number, result: OutputIterator): OutputIterator;
    function copy_if<T, InputIterator extends IForwardIterator<T>, OutputIterator extends base.ILinearIterator<T>>(first: InputIterator, last: InputIterator, result: OutputIterator, pred: (x: T) => boolean): OutputIterator;
    function copy_backward<T, BidirectionalIterator1 extends IBidirectionalIterator<T>, BidirectionalIterator2 extends base.ILinearIterator<T>>(first: BidirectionalIterator1, last: BidirectionalIterator1, result: BidirectionalIterator2): BidirectionalIterator2;
    function fill<T, ForwardIterator extends base.ILinearIterator<T>>(first: ForwardIterator, last: ForwardIterator, val: T): void;
    function fill_n<T, OutputIterator extends base.ILinearIterator<T>>(first: OutputIterator, n: number, val: T): OutputIterator;
    function transform<T, InputIterator extends IForwardIterator<T>, OutputIterator extends base.ILinearIterator<T>>(first: InputIterator, last: InputIterator, result: OutputIterator, op: (val: T) => T): OutputIterator;
    function transform<T, InputIterator1 extends IForwardIterator<T>, InputIterator2 extends IForwardIterator<T>, OutputIterator extends base.ILinearIterator<T>>(first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, result: OutputIterator, binary_op: (x: T, y: T) => T): OutputIterator;
    function generate<T, ForwardIterator extends base.ILinearIterator<T>>(first: ForwardIterator, last: ForwardIterator, gen: () => T): void;
    function generate_n<T, ForwardIterator extends base.ILinearIterator<T>>(first: ForwardIterator, n: number, gen: () => T): ForwardIterator;
    function unique<T, InputIterator extends base.Iterator<T>>(first: InputIterator, last: InputIterator): InputIterator;
    function unique<t, InputIterator extends base.Iterator<t>>(first: InputIterator, last: InputIterator, pred: (left: t, right: t) => boolean): InputIterator;
    function unique_copy<T, InputIterator extends IForwardIterator<T>, OutputIterator extends base.ILinearIterator<T>>(first: InputIterator, last: InputIterator, result: OutputIterator): OutputIterator;
    function unique_copy<T, InputIterator extends IForwardIterator<T>, OutputIterator extends base.ILinearIterator<T>>(first: InputIterator, last: InputIterator, result: OutputIterator, pred: (x: T, y: T) => boolean): OutputIterator;
    function remove<T, InputIterator extends base.Iterator<T>>(first: InputIterator, last: InputIterator, val: T): InputIterator;
    function remove_if<T, InputIterator extends base.Iterator<T>>(first: InputIterator, last: InputIterator, pred: (left: T) => boolean): InputIterator;
    function remove_copy<T, InputIterator extends IForwardIterator<T>, OutputIterator extends base.ILinearIterator<T>>(first: InputIterator, last: InputIterator, result: OutputIterator, val: T): OutputIterator;
    function remove_copy_if<T, InputIterator extends IForwardIterator<T>, OutputIterator extends base.ILinearIterator<T>>(first: InputIterator, last: InputIterator, result: OutputIterator, pred: (val: T) => boolean): OutputIterator;
    function replace<T, InputIterator extends base.ILinearIterator<T>>(first: InputIterator, last: InputIterator, old_val: T, new_val: T): void;
    function replace_if<T, InputIterator extends base.ILinearIterator<T>>(first: InputIterator, last: InputIterator, pred: (val: T) => boolean, new_val: T): void;
    function replace_copy<T, InputIterator extends IForwardIterator<T>, OutputIterator extends base.ILinearIterator<T>>(first: InputIterator, last: InputIterator, result: OutputIterator, old_val: T, new_val: T): OutputIterator;
    function replace_copy_if<T, InputIterator extends IForwardIterator<T>, OutputIterator extends base.ILinearIterator<T>>(first: InputIterator, last: InputIterator, result: OutputIterator, pred: (val: T) => boolean, new_val: T): OutputIterator;
    function iter_swap<T>(x: base.Iterator<T>, y: base.Iterator<T>): void;
    function swap_ranges<T, ForwardIterator1 extends base.Iterator<T>, ForwardIterator2 extends base.Iterator<T>>(first1: ForwardIterator1, last1: ForwardIterator1, first2: ForwardIterator2): ForwardIterator2;
    function reverse<T, InputIterator extends base.Iterator<T>>(first: InputIterator, last: InputIterator): void;
    function reverse_copy<T, BidirectionalIterator extends IBidirectionalIterator<T>, OutputIterator extends base.ILinearIterator<T>>(first: BidirectionalIterator, last: BidirectionalIterator, result: OutputIterator): OutputIterator;
    function rotate<T, InputIterator extends base.Iterator<T>>(first: InputIterator, middle: InputIterator, last: InputIterator): InputIterator;
    function rotate_copy<T, ForwardIterator extends IForwardIterator<T>, OutputIterator extends base.ILinearIterator<T>>(first: ForwardIterator, middle: ForwardIterator, last: ForwardIterator, result: OutputIterator): OutputIterator;
    function random_shuffle<T, RandomAccessIterator extends base.IArrayIterator<T>>(first: RandomAccessIterator, last: RandomAccessIterator): void;
    function shuffle<T, RandomAccessIterator extends base.IArrayIterator<T>>(first: RandomAccessIterator, last: RandomAccessIterator): void;
}
declare namespace std {
    function sort<T, RandomAccessIterator extends base.IArrayIterator<T>>(first: RandomAccessIterator, last: RandomAccessIterator): void;
    function sort<T, RandomAccessIterator extends base.IArrayIterator<T>>(first: RandomAccessIterator, last: RandomAccessIterator, compare: (left: T, right: T) => boolean): void;
    function stable_sort<T, RandomAccessIterator extends base.IArrayIterator<T>>(first: RandomAccessIterator, last: RandomAccessIterator): void;
    function stable_sort<T, RandomAccessIterator extends base.IArrayIterator<T>>(first: RandomAccessIterator, last: RandomAccessIterator, compare: (left: T, right: T) => boolean): void;
    function partial_sort<T, RandomAccessIterator extends base.IArrayIterator<T>>(first: RandomAccessIterator, middle: RandomAccessIterator, last: RandomAccessIterator): void;
    function partial_sort<T, RandomAccessIterator extends base.IArrayIterator<T>>(first: RandomAccessIterator, middle: RandomAccessIterator, last: RandomAccessIterator, compare: (x: T, y: T) => boolean): void;
    function partial_sort_copy<T, InputIterator extends IForwardIterator<T>, RandomAccessIterator extends base.Iterator<T>>(first: InputIterator, last: InputIterator, result_first: RandomAccessIterator, result_last: RandomAccessIterator): RandomAccessIterator;
    function partial_sort_copy<T, InputIterator extends IForwardIterator<T>, RandomAccessIterator extends base.Iterator<T>>(first: InputIterator, last: InputIterator, result_first: RandomAccessIterator, result_last: RandomAccessIterator, compare: (x: T, y: T) => boolean): RandomAccessIterator;
    function nth_element<T, RandomAccessIterator extends base.IArrayIterator<T>>(first: RandomAccessIterator, nth: RandomAccessIterator, last: RandomAccessIterator): void;
    function nth_element<T, RandomAccessIterator extends base.IArrayIterator<T>>(first: RandomAccessIterator, nth: RandomAccessIterator, last: RandomAccessIterator, compare: (left: T, right: T) => boolean): void;
    function is_sorted<T, ForwardIterator extends IForwardIterator<T>>(first: ForwardIterator, last: ForwardIterator): boolean;
    function is_sorted<T, ForwardIterator extends IForwardIterator<T>>(first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean): boolean;
    function is_sorted_until<T, ForwardIterator extends IForwardIterator<T>>(first: ForwardIterator, last: ForwardIterator): ForwardIterator;
    function is_sorted_until<T, ForwardIterator extends IForwardIterator<T>>(first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean): ForwardIterator;
}
declare namespace std {
    function make_heap<T, RandomAccessIterator extends base.IArrayIterator<T>>(first: RandomAccessIterator, last: RandomAccessIterator): void;
    function make_heap<T, RandomAccessIterator extends base.IArrayIterator<T>>(first: RandomAccessIterator, last: RandomAccessIterator, compare: (x: T, y: T) => boolean): void;
    function push_heap<T, RandomAccessIterator extends base.IArrayIterator<T>>(first: RandomAccessIterator, last: RandomAccessIterator): void;
    function push_heap<T, RandomAccessIterator extends base.IArrayIterator<T>>(first: RandomAccessIterator, last: RandomAccessIterator, compare: (x: T, y: T) => boolean): void;
    function pop_heap<T, RandomAccessIterator extends base.IArrayIterator<T>>(first: RandomAccessIterator, last: RandomAccessIterator): void;
    function pop_heap<T, RandomAccessIterator extends base.IArrayIterator<T>>(first: RandomAccessIterator, last: RandomAccessIterator, compare: (x: T, y: T) => boolean): void;
    function is_heap<T, ForwardIterator extends IForwardIterator<T>>(first: ForwardIterator, last: ForwardIterator): boolean;
    function is_heap<T, ForwardIterator extends IForwardIterator<T>>(first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean): boolean;
    function is_heap_until<T, ForwardIterator extends IForwardIterator<T>>(first: ForwardIterator, last: ForwardIterator): ForwardIterator;
    function is_heap_until<T, ForwardIterator extends IForwardIterator<T>>(first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean): ForwardIterator;
    function sort_heap<T, RandomAccessIterator extends base.IArrayIterator<T>>(first: RandomAccessIterator, last: RandomAccessIterator): void;
    function sort_heap<T, RandomAccessIterator extends base.IArrayIterator<T>>(first: RandomAccessIterator, last: RandomAccessIterator, compare: (x: T, y: T) => boolean): void;
}
declare namespace std {
    function lower_bound<T, ForwardIterator extends IForwardIterator<T>>(first: ForwardIterator, last: ForwardIterator, val: T): ForwardIterator;
    function lower_bound<T, ForwardIterator extends IForwardIterator<T>>(first: ForwardIterator, last: ForwardIterator, val: T, compare: (x: T, y: T) => boolean): ForwardIterator;
    function upper_bound<T, ForwardIterator extends IForwardIterator<T>>(first: ForwardIterator, last: ForwardIterator, val: T): ForwardIterator;
    function upper_bound<T, ForwardIterator extends IForwardIterator<T>>(first: ForwardIterator, last: ForwardIterator, val: T, compare: (x: T, y: T) => boolean): ForwardIterator;
    function equal_range<T, ForwardIterator extends IForwardIterator<T>>(first: ForwardIterator, last: ForwardIterator, val: T): Pair<ForwardIterator, ForwardIterator>;
    function equal_range<T, ForwardIterator extends IForwardIterator<T>>(first: ForwardIterator, last: ForwardIterator, val: T, compare: (x: T, y: T) => boolean): Pair<ForwardIterator, ForwardIterator>;
    function binary_search<T, ForwardIterator extends IForwardIterator<T>>(first: ForwardIterator, last: ForwardIterator, val: T): boolean;
    function binary_search<T, ForwardIterator extends IForwardIterator<T>>(first: ForwardIterator, last: ForwardIterator, val: T, compare: (x: T, y: T) => boolean): boolean;
}
declare namespace std {
    function is_partitioned<T, InputIterator extends IForwardIterator<T>>(first: InputIterator, last: InputIterator, pred: (x: T) => boolean): boolean;
    function partition<T, BidirectionalIterator extends base.Iterator<T>>(first: BidirectionalIterator, last: BidirectionalIterator, pred: (x: T) => boolean): BidirectionalIterator;
    function stable_partition<T, BidirectionalIterator extends base.Iterator<T>>(first: BidirectionalIterator, last: BidirectionalIterator, pred: (x: T) => boolean): BidirectionalIterator;
    function partition_copy<T, InputIterator extends IForwardIterator<T>, OutputIterator1 extends base.ILinearIterator<T>, OutputIterator2 extends base.ILinearIterator<T>>(first: InputIterator, last: InputIterator, result_true: OutputIterator1, result_false: OutputIterator2, pred: (val: T) => T): Pair<OutputIterator1, OutputIterator2>;
    function partition_point<T, ForwardIterator extends IForwardIterator<T>>(first: ForwardIterator, last: ForwardIterator, pred: (x: T) => boolean): ForwardIterator;
}
declare namespace std {
    function merge<T, InputIterator1 extends IForwardIterator<T>, InputIterator2 extends IForwardIterator<T>, OutputIterator extends base.ILinearIterator<T>>(first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2, result: OutputIterator): OutputIterator;
    function merge<T, InputIterator1 extends IForwardIterator<T>, InputIterator2 extends IForwardIterator<T>, OutputIterator extends base.ILinearIterator<T>>(first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2, result: OutputIterator, compare: (x: T, y: T) => boolean): OutputIterator;
    function inplace_merge<T, BidirectionalIterator extends base.Iterator<T>>(first: BidirectionalIterator, middle: BidirectionalIterator, last: BidirectionalIterator): void;
    function inplace_merge<T, BidirectionalIterator extends base.ILinearIterator<T>>(first: BidirectionalIterator, middle: BidirectionalIterator, last: BidirectionalIterator, compare: (x: T, y: T) => boolean): void;
    function includes<T, InputIterator1 extends IForwardIterator<T>, InputIterator2 extends IForwardIterator<T>>(first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2): boolean;
    function includes<T, InputIterator1 extends IForwardIterator<T>, InputIterator2 extends IForwardIterator<T>>(first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2, compare: (x: T, y: T) => boolean): boolean;
    function set_union<T, InputIterator1 extends IForwardIterator<T>, InputIterator2 extends IForwardIterator<T>, OutputIterator extends base.ILinearIterator<T>>(first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2, result: OutputIterator): OutputIterator;
    function set_union<T, InputIterator1 extends IForwardIterator<T>, InputIterator2 extends IForwardIterator<T>, OutputIterator extends base.ILinearIterator<T>>(first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2, result: OutputIterator, compare: (x: T, y: T) => boolean): OutputIterator;
    function set_intersection<T, InputIterator1 extends base.Iterator<T>, InputIterator2 extends base.Iterator<T>, OutputIterator extends base.ILinearIterator<T>>(first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2, result: OutputIterator): OutputIterator;
    function set_intersection<T, InputIterator1 extends base.Iterator<T>, InputIterator2 extends base.Iterator<T>, OutputIterator extends base.ILinearIterator<T>>(first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2, result: OutputIterator, compare: (x: T, y: T) => boolean): OutputIterator;
    function set_difference<T, InputIterator1 extends base.Iterator<T>, InputIterator2 extends base.Iterator<T>, OutputIterator extends base.ILinearIterator<T>>(first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2, result: OutputIterator): OutputIterator;
    function set_difference<T, InputIterator1 extends base.Iterator<T>, InputIterator2 extends base.Iterator<T>, OutputIterator extends base.ILinearIterator<T>>(first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2, result: OutputIterator, compare: (x: T, y: T) => boolean): OutputIterator;
    function set_symmetric_difference<T, InputIterator1 extends base.Iterator<T>, InputIterator2 extends base.Iterator<T>, OutputIterator extends base.ILinearIterator<T>>(first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2, result: OutputIterator): OutputIterator;
    function set_symmetric_difference<T, InputIterator1 extends base.Iterator<T>, InputIterator2 extends base.Iterator<T>, OutputIterator extends base.ILinearIterator<T>>(first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2, result: OutputIterator, compare: (x: T, y: T) => boolean): OutputIterator;
}
declare namespace std {
    function min<T>(...args: T[]): T;
    function max<T>(...args: T[]): T;
    function minmax<T>(...args: T[]): Pair<T, T>;
    function min_element<T, ForwardIterator extends IForwardIterator<T>>(first: ForwardIterator, last: ForwardIterator): ForwardIterator;
    function min_element<T, ForwardIterator extends IForwardIterator<T>>(first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean): ForwardIterator;
    function max_element<T, ForwardIterator extends IForwardIterator<T>>(first: ForwardIterator, last: ForwardIterator): ForwardIterator;
    function max_element<T, ForwardIterator extends IForwardIterator<T>>(first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean): ForwardIterator;
    function minmax_element<T, ForwardIterator extends IForwardIterator<T>>(first: ForwardIterator, last: ForwardIterator): Pair<ForwardIterator, ForwardIterator>;
    function minmax_element<T, ForwardIterator extends IForwardIterator<T>>(first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean): Pair<ForwardIterator, ForwardIterator>;
    function clamp<T>(v: T, lo: T, hi: T): T;
    function clamp<T>(v: T, lo: T, hi: T, comp: (x: T, y: T) => boolean): T;
    function is_permutation<T, Iterator1 extends IForwardIterator<T>, Iterator2 extends IForwardIterator<T>>(first1: Iterator1, last1: Iterator1, first2: Iterator2): boolean;
    function is_permutation<T, Iterator1 extends IForwardIterator<T>, Iterator2 extends IForwardIterator<T>>(first1: Iterator1, last1: Iterator1, first2: Iterator2, pred: (x: T, y: T) => boolean): boolean;
    function prev_permutation<T, BidirectionalIterator extends base.IArrayIterator<T>>(first: BidirectionalIterator, last: BidirectionalIterator): boolean;
    function prev_permutation<T, BidirectionalIterator extends base.IArrayIterator<T>>(first: BidirectionalIterator, last: BidirectionalIterator, compare: (x: T, y: T) => boolean): boolean;
    function next_permutation<T, BidirectionalIterator extends base.IArrayIterator<T>>(first: BidirectionalIterator, last: BidirectionalIterator): boolean;
    function next_permutation<T, BidirectionalIterator extends base.IArrayIterator<T>>(first: BidirectionalIterator, last: BidirectionalIterator, compare: (x: T, y: T) => boolean): boolean;
}
declare namespace std.base {
    abstract class Container<T> implements Iterable<T> {
        protected constructor();
        abstract assign<U extends T, InputIterator extends IForwardIterator<U>>(begin: InputIterator, end: InputIterator): void;
        clear(): void;
        abstract size(): number;
        empty(): boolean;
        abstract begin(): Iterator<T>;
        abstract end(): Iterator<T>;
        abstract rbegin(): IReverseIterator<T>;
        abstract rend(): IReverseIterator<T>;
        [Symbol.iterator](): IterableIterator<T>;
        abstract push(...items: T[]): number;
        abstract insert(position: Iterator<T>, val: T): Iterator<T>;
        abstract erase(position: Iterator<T>): Iterator<T>;
        abstract erase(begin: Iterator<T>, end: Iterator<T>): Iterator<T>;
        swap(obj: Container<T>): void;
    }
    interface IReverseIterator<T> extends ReverseIterator<T, Container<T>, Iterator<T>, IReverseIterator<T>> {
    }
}
declare namespace std.base {
    /**
     * @hidden
     */
    abstract class ArrayContainer<T, Source extends IArrayContainer<T>> extends Container<T> implements IArrayContainer<T> {
        /**
         * @hidden
         */
        private begin_;
        /**
         * @hidden
         */
        private end_;
        /**
         * @hidden
         */
        private rend_;
        protected constructor();
        begin(): ArrayIterator<T, Source>;
        end(): ArrayIterator<T, Source>;
        rbegin(): ArrayReverseIterator<T, Source>;
        rend(): ArrayReverseIterator<T, Source>;
        abstract at(index: number): T;
        abstract set(index: number, val: T): void;
        front(): T;
        front(val: T): void;
        back(): T;
        back(val: T): void;
        abstract push_back(val: T): void;
        insert(pos: ArrayIterator<T, Source>, val: T): ArrayIterator<T, Source>;
        insert(pos: ArrayIterator<T, Source>, n: number, val: T): ArrayIterator<T, Source>;
        insert<U extends T, InputIterator extends IForwardIterator<U>>(pos: ArrayIterator<T, Source>, first: InputIterator, last: InputIterator): ArrayIterator<T, Source>;
        insert(pos: ArrayReverseIterator<T, Source>, val: T): ArrayIterator<T, Source>;
        insert(pos: ArrayReverseIterator<T, Source>, n: number, val: T): ArrayIterator<T, Source>;
        insert<U extends T, InputIterator extends IForwardIterator<U>>(pos: ArrayReverseIterator<T, Source>, first: InputIterator, last: InputIterator): ArrayIterator<T, Source>;
        /**
         * @hidden
         */
        private _Insert_by_val(position, val);
        /**
         * @hidden
         */
        private _Insert_by_repeating_val(position, n, val);
        /**
         * @hidden
         */
        protected abstract _Insert_by_range<U extends T, InputIterator extends IForwardIterator<U>>(pos: ArrayIterator<T, Source>, first: InputIterator, last: InputIterator): ArrayIterator<T, Source>;
        abstract pop_back(): void;
        erase(it: ArrayIterator<T, Source>): ArrayIterator<T, Source>;
        erase(first: ArrayIterator<T, Source>, last: ArrayIterator<T, Source>): ArrayIterator<T, Source>;
        erase(it: ArrayReverseIterator<T, Source>): ArrayReverseIterator<T, Source>;
        erase(first: ArrayReverseIterator<T, Source>, last: ArrayReverseIterator<T, Source>): ArrayReverseIterator<T, Source>;
        /**
         * @hidden
         */
        protected abstract _Erase_by_range(first: ArrayIterator<T, Source>, last: ArrayIterator<T, Source>): ArrayIterator<T, Source>;
    }
}
declare namespace std.base {
    abstract class Iterator<T> implements IBidirectionalIterator<T>, IComparable<Iterator<T>> {
        abstract prev(): Iterator<T>;
        abstract next(): Iterator<T>;
        abstract advance(n: number): Iterator<T>;
        abstract source(): Container<T>;
        abstract equals(obj: Iterator<T>): boolean;
        readonly abstract value: T;
        abstract swap(obj: Iterator<T>): void;
    }
}
declare namespace std.base {
    abstract class ReverseIterator<T, Source extends Container<T>, Base extends Iterator<T>, This extends ReverseIterator<T, Source, Base, This>> extends Iterator<T> implements IForwardIterator<T>, IComparable<ReverseIterator<T, Source, Base, This>> {
        /**
         * @hidden
         */
        protected base_: Base;
        protected constructor(base: Base);
        /**
         * @hidden
         */
        protected abstract _Create_neighbor(base: Base): This;
        source(): Source;
        base(): Base;
        readonly value: T;
        prev(): This;
        next(): This;
        advance(n: number): This;
        equals(obj: This): boolean;
        swap(obj: This): void;
    }
}
declare namespace std.base {
    /**
     * @hidden
     */
    class ArrayIterator<T, Source extends IArrayContainer<T>> extends Iterator<T> implements IArrayIterator<T> {
        /**
         * @hidden
         */
        private source_;
        /**
         * @hidden
         */
        private index_;
        constructor(source: Source, index: number);
        source(): Source;
        index(): number;
        value: T;
        prev(): ArrayIterator<T, Source>;
        next(): ArrayIterator<T, Source>;
        advance(n: number): ArrayIterator<T, Source>;
        equals(obj: ArrayIterator<T, Source>): boolean;
        swap(obj: ArrayIterator<T, Source>): void;
    }
}
declare namespace std.base {
    /**
     * @hidden
     */
    class ArrayReverseIterator<T, Source extends IArrayContainer<T>> extends ReverseIterator<T, Source, ArrayIterator<T, Source>, ArrayReverseIterator<T, Source>> {
        constructor(base: ArrayIterator<T, Source>);
        /**
         * @hidden
         */
        protected _Create_neighbor(base: ArrayIterator<T, Source>): ArrayReverseIterator<T, Source>;
        index(): number;
        value: T;
    }
}
declare namespace std {
    class Vector<T> extends base.ArrayContainer<T, Vector<T>> {
        /**
         * @hidden
         */
        private data_;
        constructor();
        constructor(array: Array<T>);
        constructor(n: number);
        constructor(n: number, val: T);
        constructor(container: Vector<T>);
        constructor(begin: IForwardIterator<T>, end: IForwardIterator<T>);
        assign<U extends T, InputIterator extends IForwardIterator<U>>(begin: InputIterator, end: InputIterator): void;
        assign(n: number, val: T): void;
        clear(): void;
        size(): number;
        empty(): boolean;
        at(index: number): T;
        set(index: number, val: T): T;
        data(): Array<T>;
        [Symbol.iterator](): IterableIterator<T>;
        push(...items: T[]): number;
        push_back(val: T): void;
        /**
         * @hidden
         */
        protected _Insert_by_range<InputIterator extends IForwardIterator<T>>(position: Vector.Iterator<T>, first: InputIterator, last: InputIterator): Vector.Iterator<T>;
        pop_back(): void;
        /**
         * @hidden
         */
        protected _Erase_by_range(first: Vector.Iterator<T>, last: Vector.Iterator<T>): Vector.Iterator<T>;
        equals(obj: Vector<T>): boolean;
        swap(obj: Vector<T>): void;
    }
}
/**
 * @hidden
 */
declare namespace std.Vector {
    type Iterator<T> = base.ArrayIterator<T, Vector<T>>;
    type ReverseIterator<T> = base.ArrayReverseIterator<T, Vector<T>>;
    var Iterator: typeof base.ArrayIterator;
    var ReverseIterator: typeof base.ArrayReverseIterator;
    type iterator<T> = Iterator<T>;
    type reverse_iterator<T> = ReverseIterator<T>;
    var iterator: typeof base.ArrayIterator;
    var reverse_iterator: typeof base.ArrayReverseIterator;
}
declare namespace std {
    class Deque<T> extends base.ArrayContainer<T, Deque<T>> {
        /**
         * @hidden
         */
        private matrix_;
        /**
         * @hidden
         */
        private size_;
        /**
         * @hidden
         */
        private capacity_;
        constructor();
        constructor(items: Array<T>);
        constructor(size: number, val: T);
        constructor(container: Deque<T>);
        constructor(begin: IForwardIterator<T>, end: IForwardIterator<T>);
        assign<U extends T, InputIterator extends IForwardIterator<U>>(begin: InputIterator, end: InputIterator): void;
        assign(n: number, val: T): void;
        reserve(capacity: number): void;
        clear(): void;
        size(): number;
        empty(): boolean;
        capacity(): number;
        [Symbol.iterator](): IterableIterator<T>;
        at(index: number): T;
        set(index: number, val: T): void;
        /**
         * @hidden
         */
        private _Fetch_index(index);
        /**
         * @hidden
         */
        private _Compute_col_size(capacity?);
        push(...items: T[]): number;
        push_front(val: T): void;
        push_back(val: T): void;
        pop_front(): void;
        pop_back(): void;
        /**
         * @hidden
         */
        protected _Insert_by_range<U extends T, InputIterator extends IForwardIterator<U>>(pos: Deque.Iterator<T>, first: InputIterator, last: InputIterator): Deque.Iterator<T>;
        /**
         * @hidden
         */
        private _Insert_to_middle<U, InputIterator>(pos, first, last);
        /**
         * @hidden
         */
        private _Insert_to_end<U, InputIterator>(first, last);
        /**
         * @hidden
         */
        private _Try_expand_capacity(size);
        /**
         * @hidden
         */
        private _Try_add_row_at_front();
        /**
         * @hidden
         */
        private _Try_add_row_at_back();
        /**
         * @hidden
         */
        protected _Erase_by_range(first: Deque.Iterator<T>, last: Deque.Iterator<T>): Deque.Iterator<T>;
        swap(obj: Deque<T>): void;
        /**
         * @hidden
         */
        private static readonly ROW_SIZE;
        /**
         * @hidden
         */
        private static readonly MIN_CAPACITY;
        /**
         * @hidden
         */
        private static readonly MAGNIFIER;
    }
}
/**
 * @hidden
 */
declare namespace std.Deque {
    type Iterator<T> = base.ArrayIterator<T, Deque<T>>;
    type ReverseIterator<T> = base.ArrayReverseIterator<T, Deque<T>>;
    var Iterator: typeof base.ArrayIterator;
    var ReverseIterator: typeof base.ArrayReverseIterator;
    type iterator<T> = Iterator<T>;
    type reverse_iterator<T> = ReverseIterator<T>;
    var iterator: typeof base.ArrayIterator;
    var reverse_iterator: typeof base.ArrayReverseIterator;
}
declare namespace std.base {
    /**
     * @hidden
     */
    abstract class _ListContainer<T, BidirectionalIterator extends _ListIteratorBase<T>> extends Container<T> implements IDequeContainer<T> {
        /**
         * @hidden
         */
        private begin_;
        /**
         * @hidden
         */
        private end_;
        /**
         * @hidden
         */
        private size_;
        protected constructor();
        /**
         * @hidden
         */
        protected abstract _Create_iterator(prev: BidirectionalIterator, next: BidirectionalIterator, val: T): BidirectionalIterator;
        /**
         * @hidden
         */
        protected _Set_begin(it: BidirectionalIterator): void;
        assign<U extends T, InputIterator extends IForwardIterator<U>>(first: InputIterator, last: InputIterator): void;
        clear(): void;
        begin(): BidirectionalIterator;
        end(): BidirectionalIterator;
        size(): number;
        front(): T;
        front(val: T): void;
        back(): T;
        back(val: T): void;
        push_front(val: T): void;
        push_back(val: T): void;
        pop_front(): void;
        pop_back(): void;
        push(...items: T[]): number;
        insert(position: BidirectionalIterator, val: T): BidirectionalIterator;
        insert(position: BidirectionalIterator, size: number, val: T): BidirectionalIterator;
        insert<U extends T, InputIterator extends IForwardIterator<U>>(position: BidirectionalIterator, begin: InputIterator, end: InputIterator): BidirectionalIterator;
        /**
         * @hidden
         */
        private _Insert_by_repeating_val(position, n, val);
        /**
         * @hidden
         */
        protected _Insert_by_range<U extends T, InputIterator extends IForwardIterator<U>>(position: BidirectionalIterator, begin: InputIterator, end: InputIterator): BidirectionalIterator;
        erase(position: BidirectionalIterator): BidirectionalIterator;
        erase(begin: BidirectionalIterator, end: BidirectionalIterator): BidirectionalIterator;
        /**
         * @hidden
         */
        protected _Erase_by_range(first: BidirectionalIterator, last: BidirectionalIterator): BidirectionalIterator;
        swap(obj: _ListContainer<T, BidirectionalIterator>): void;
    }
}
declare namespace std.base {
    /**
     * @hidden
     */
    abstract class _ListIteratorBase<T> extends Iterator<T> implements IComparable<_ListIteratorBase<T>> {
        /**
         * @hidden
         */
        protected prev_: _ListIteratorBase<T>;
        /**
         * @hidden
         */
        protected next_: _ListIteratorBase<T>;
        /**
         * @hidden
         */
        protected value_: T;
        /**
         * @hidden
         */
        protected constructor(prev: _ListIteratorBase<T>, next: _ListIteratorBase<T>, value: T);
        prev(): _ListIteratorBase<T>;
        next(): _ListIteratorBase<T>;
        advance(step: number): _ListIteratorBase<T>;
        readonly value: T;
        equals(obj: _ListIteratorBase<T>): boolean;
        swap(obj: _ListIteratorBase<T>): void;
    }
}
declare namespace std {
    class List<T> extends base._ListContainer<T, List.Iterator<T>> implements base.IDequeContainer<T> {
        /**
         * @hidden
         */
        private ptr_;
        /**
         * @hidden
         */
        private rend_;
        constructor();
        constructor(items: Array<T>);
        constructor(size: number, val: T);
        constructor(container: List<T>);
        constructor(begin: IForwardIterator<T>, end: IForwardIterator<T>);
        /**
         * @hidden
         */
        protected _Create_iterator(prev: List.Iterator<T>, next: List.Iterator<T>, val: T): List.Iterator<T>;
        /**
         * @hidden
         */
        protected _Set_begin(it: List.Iterator<T>): void;
        assign(n: number, val: T): void;
        assign<U extends T, InputIterator extends IForwardIterator<U>>(begin: InputIterator, end: InputIterator): void;
        rbegin(): List.ReverseIterator<T>;
        rend(): List.ReverseIterator<T>;
        insert(position: List.Iterator<T>, val: T): List.Iterator<T>;
        insert(position: List.Iterator<T>, size: number, val: T): List.Iterator<T>;
        insert<U extends T, InputIterator extends IForwardIterator<U>>(position: List.Iterator<T>, begin: InputIterator, end: InputIterator): List.Iterator<T>;
        insert(position: List.ReverseIterator<T>, val: T): List.ReverseIterator<T>;
        insert(position: List.ReverseIterator<T>, size: number, val: T): List.ReverseIterator<T>;
        insert<U extends T, InputIterator extends IForwardIterator<U>>(position: List.ReverseIterator<T>, begin: InputIterator, end: InputIterator): List.ReverseIterator<T>;
        erase(position: List.Iterator<T>): List.Iterator<T>;
        erase(begin: List.Iterator<T>, end: List.Iterator<T>): List.Iterator<T>;
        erase(position: List.ReverseIterator<T>): List.ReverseIterator<T>;
        erase(begin: List.ReverseIterator<T>, end: List.ReverseIterator<T>): List.ReverseIterator<T>;
        unique(): void;
        unique(binary_pred: (left: T, right: T) => boolean): void;
        remove(val: T): void;
        remove_if(pred: (val: T) => boolean): void;
        merge<U extends T>(obj: List<U>): void;
        merge<U extends T>(obj: List<U>, compare: (left: T, right: T) => boolean): void;
        splice<U extends T>(position: List.Iterator<T>, obj: List<U>): void;
        splice<U extends T>(position: List.Iterator<T>, obj: List<U>, it: List.Iterator<U>): void;
        splice<U extends T>(position: List.Iterator<T>, obj: List<U>, begin: List.Iterator<U>, end: List.Iterator<U>): void;
        sort(): void;
        sort(compare: (left: T, right: T) => boolean): void;
        /**
         * @hidden
         */
        private _Quick_sort(first, last, compare);
        /**
         * @hidden
         */
        private _Quick_sort_partition(first, last, compare);
        reverse(): void;
        swap(obj: List<T>): void;
    }
}
declare namespace std.List {
    class Iterator<T> extends base._ListIteratorBase<T> implements IComparable<Iterator<T>> {
        /**
         * @hidden
         */
        private source_ptr_;
        /**
         * @hidden
         */
        constructor(sourcePtr: IPointer<List<T>>, prev: Iterator<T>, next: Iterator<T>, value: T);
        source(): List<T>;
        value: T;
        prev(): Iterator<T>;
        next(): Iterator<T>;
        advance(step: number): Iterator<T>;
        equals(obj: Iterator<T>): boolean;
        swap(obj: Iterator<T>): void;
    }
    class ReverseIterator<T> extends base.ReverseIterator<T, List<T>, Iterator<T>, ReverseIterator<T>> implements base.ILinearIterator<T>, IComparable<ReverseIterator<T>> {
        constructor(base: Iterator<T>);
        /**
         * @hidden
         */
        protected _Create_neighbor(base: Iterator<T>): ReverseIterator<T>;
        value: T;
    }
}
declare namespace std {
    class ForwardList<T> implements Iterable<T> {
        /**
         * @hidden
         */
        private ptr_;
        /**
         * @hidden
         */
        private size_;
        /**
         * @hidden
         */
        private before_begin_;
        /**
         * @hidden
         */
        private end_;
        constructor();
        constructor(items: Array<T>);
        constructor(obj: ForwardList<T>);
        constructor(n: number, val: T);
        constructor(first: IForwardIterator<T>, last: IForwardIterator<T>);
        assign(n: number, val: T): void;
        assign<T, InputIterator extends IForwardIterator<T>>(first: InputIterator, last: InputIterator): void;
        clear(): void;
        size(): number;
        empty(): boolean;
        front(): T;
        before_begin(): ForwardList.Iterator<T>;
        begin(): ForwardList.Iterator<T>;
        end(): ForwardList.Iterator<T>;
        [Symbol.iterator](): IterableIterator<T>;
        push_front(val: T): void;
        insert_after(pos: ForwardList.Iterator<T>, val: T): ForwardList.Iterator<T>;
        insert_after(pos: ForwardList.Iterator<T>, n: number, val: T): ForwardList.Iterator<T>;
        insert_after<T, InputIterator extends IForwardIterator<T>>(pos: ForwardList.Iterator<T>, first: InputIterator, last: InputIterator): ForwardList.Iterator<T>;
        private _Insert_by_repeating_val(pos, n, val);
        private _Insert_by_range<U, InputIterator>(pos, first, last);
        pop_front(): void;
        erase_after(it: ForwardList.Iterator<T>): ForwardList.Iterator<T>;
        erase_after(first: ForwardList.Iterator<T>, last: ForwardList.Iterator<T>): ForwardList.Iterator<T>;
        unique(): void;
        unique(binary_pred: (left: T, right: T) => boolean): void;
        remove(val: T): void;
        remove_if(pred: (val: T) => boolean): void;
        splice_after<U extends T>(pos: ForwardList.Iterator<T>, from: ForwardList<U>): void;
        splice_after<U extends T>(pos: ForwardList.Iterator<T>, from: ForwardList<U>, before: ForwardList.Iterator<U>): void;
        splice_after<U extends T>(pos: ForwardList.Iterator<T>, from: ForwardList<U>, first_before: ForwardList.Iterator<U>, last: ForwardList.Iterator<U>): void;
        merge<U extends T>(from: ForwardList<U>): void;
        merge<U extends T>(from: ForwardList<U>, comp: (x: T, y: T) => boolean): void;
        sort(): void;
        sort(comp: (x: T, y: T) => boolean): void;
        reverse(): void;
        swap(obj: ForwardList<T>): void;
    }
}
declare namespace std.ForwardList {
    class Iterator<T> implements IForwardIterator<T> {
        /**
         * @hidden
         */
        private source_ptr_;
        /**
         * @hidden
         */
        private next_;
        /**
         * @hidden
         */
        private value_;
        constructor(source: IPointer<ForwardList<T>>, next: Iterator<T>, value: T);
        source(): ForwardList<T>;
        value: T;
        next(): Iterator<T>;
        advance(n: number): Iterator<T>;
        equals(obj: Iterator<T>): boolean;
    }
}
declare namespace std.base {
    abstract class SetContainer<T, Source extends ISetContainer<T>> extends Container<T> {
        /**
         * @hidden
         */
        private source_ptr_;
        /**
         * @hidden
         */
        private data_;
        protected constructor();
        assign<U extends T, InputIterator extends IForwardIterator<U>>(begin: InputIterator, end: InputIterator): void;
        clear(): void;
        abstract find(val: T): SetIterator<T, Source>;
        begin(): SetIterator<T, Source>;
        end(): SetIterator<T, Source>;
        rbegin(): SetReverseIterator<T, Source>;
        rend(): SetReverseIterator<T, Source>;
        has(val: T): boolean;
        abstract count(val: T): number;
        size(): number;
        push(...items: T[]): number;
        insert(hint: SetIterator<T, Source>, val: T): SetIterator<T, Source>;
        insert(hint: SetReverseIterator<T, Source>, val: T): SetReverseIterator<T, Source>;
        insert<U extends T, InputIterator extends IForwardIterator<U>>(begin: InputIterator, end: InputIterator): void;
        /**
         * @hidden
         */
        protected abstract _Insert_by_val(val: T): any;
        /**
         * @hidden
         */
        protected abstract _Insert_by_hint(hint: SetIterator<T, Source>, val: T): SetIterator<T, Source>;
        /**
         * @hidden
         */
        protected abstract _Insert_by_range<U extends T, InputIterator extends Iterator<U>>(begin: InputIterator, end: InputIterator): void;
        erase(val: T): number;
        erase(it: SetIterator<T, Source>): SetIterator<T, Source>;
        erase(begin: SetIterator<T, Source>, end: SetIterator<T, Source>): SetIterator<T, Source>;
        erase(it: SetReverseIterator<T, Source>): SetReverseIterator<T, Source>;
        erase(begin: SetReverseIterator<T, Source>, end: SetReverseIterator<T, Source>): SetReverseIterator<T, Source>;
        /**
         * @hidden
         */
        private _Erase_by_iterator(first, last?);
        /**
         * @hidden
         */
        private _Erase_by_val(val);
        /**
         * @hidden
         */
        private _Erase_by_range(first, last);
        /**
         * @hidden
         */
        swap(obj: SetContainer<T, Source>): void;
        abstract merge(source: SetContainer<T, Source>): void;
        /**
         * @hidden
         */
        protected abstract _Handle_insert(first: SetIterator<T, Source>, last: SetIterator<T, Source>): void;
        /**
         * @hidden
         */
        protected abstract _Handle_erase(first: SetIterator<T, Source>, last: SetIterator<T, Source>): void;
    }
}
declare namespace std.base {
    abstract class UniqueSet<T, Source extends IUniqueSet<T>> extends SetContainer<T, Source> {
        count(key: T): number;
        insert(val: T): Pair<SetIterator<T, Source>, boolean>;
        insert(hint: SetIterator<T, Source>, val: T): SetIterator<T, Source>;
        insert(hint: SetReverseIterator<T, Source>, val: T): SetReverseIterator<T, Source>;
        insert<U extends T, InputIterator extends Iterator<U>>(begin: InputIterator, end: InputIterator): void;
        extract(val: T): T;
        extract(it: SetIterator<T, Source>): SetIterator<T, Source>;
        extract(it: SetReverseIterator<T, Source>): SetReverseIterator<T, Source>;
        /**
         * @hidden
         */
        private _Extract_by_key(val);
        /**
         * @hidden
         */
        private _Extract_by_iterator(it);
        /**
         * @hidden
         */
        private _Extract_by_reverse_iterator(it);
        merge(source: SetContainer<T, Source>): void;
    }
}
declare namespace std.base {
    class SetIterator<T, Source extends ISetContainer<T>> extends _ListIteratorBase<T> implements IComparable<SetIterator<T, Source>> {
        /**
         * @hidden
         */
        private source_;
        constructor(source: _SetElementList<T, Source>, prev: SetIterator<T, Source>, next: SetIterator<T, Source>, val: T);
        source(): Source;
        prev(): SetIterator<T, Source>;
        next(): SetIterator<T, Source>;
        advance(size: number): SetIterator<T, Source>;
        less(obj: SetIterator<T, Source>): boolean;
        equals(obj: SetIterator<T, Source>): boolean;
        hashCode(): number;
        swap(obj: SetIterator<T, Source>): void;
    }
}
declare namespace std.base {
    class SetReverseIterator<T, Source extends ISetContainer<T>> extends ReverseIterator<T, SetContainer<T, Source>, SetIterator<T, Source>, SetReverseIterator<T, Source>> implements IComparable<SetReverseIterator<T, Source>> {
        constructor(base: SetIterator<T, Source>);
        /**
         * @hidden
         */
        protected _Create_neighbor(base: SetIterator<T, Source>): SetReverseIterator<T, Source>;
    }
}
declare namespace std {
    class TreeSet<T> extends base.UniqueSet<T, TreeSet<T>> implements base.ITreeSet<T, TreeSet<T>> {
        /**
         * @hidden
         */
        private tree_;
        constructor();
        constructor(compare: (x: T, y: T) => boolean);
        constructor(array: Array<T>);
        constructor(array: Array<T>, compare: (x: T, y: T) => boolean);
        constructor(container: TreeMultiSet<T>);
        constructor(container: TreeMultiSet<T>, compare: (x: T, y: T) => boolean);
        constructor(begin: IForwardIterator<T>, end: IForwardIterator<T>);
        constructor(begin: IForwardIterator<T>, end: IForwardIterator<T>, compare: (x: T, y: T) => boolean);
        clear(): void;
        find(val: T): TreeSet.Iterator<T>;
        key_comp(): (x: T, y: T) => boolean;
        value_comp(): (x: T, y: T) => boolean;
        lower_bound(val: T): TreeSet.Iterator<T>;
        upper_bound(val: T): TreeSet.Iterator<T>;
        equal_range(val: T): Pair<TreeSet.Iterator<T>, TreeSet.Iterator<T>>;
        /**
         * @hidden
         */
        protected _Insert_by_val(val: T): Pair<TreeSet.Iterator<T>, boolean>;
        protected _Insert_by_hint(hint: TreeSet.Iterator<T>, val: T): TreeSet.Iterator<T>;
        /**
         * @hidden
         */
        protected _Insert_by_range<U extends T, InputIterator extends IForwardIterator<U>>(first: InputIterator, last: InputIterator): void;
        /**
         * @hidden
         */
        protected _Handle_insert(first: TreeSet.Iterator<T>, last: TreeSet.Iterator<T>): void;
        /**
         * @hidden
         */
        protected _Handle_erase(first: TreeSet.Iterator<T>, last: TreeSet.Iterator<T>): void;
        swap(obj: TreeSet<T>): void;
    }
}
/**
 * @hidden
 */
declare namespace std.TreeSet {
    type Iterator<T> = base.SetIterator<T, TreeSet<T>>;
    type ReverseIterator<T> = base.SetReverseIterator<T, TreeSet<T>>;
    var Iterator: typeof base.ArrayIterator;
    var ReverseIterator: typeof base.ArrayReverseIterator;
    type iterator<T> = Iterator<T>;
    type reverse_iterator<T> = ReverseIterator<T>;
    var iterator: typeof base.ArrayIterator;
    var reverse_iterator: typeof base.ArrayReverseIterator;
}
declare namespace std {
    class HashSet<T> extends base.UniqueSet<T, HashSet<T>> implements base.IHashSet<T, HashSet<T>> {
        /**
         * @hidden
         */
        private hash_buckets_;
        constructor();
        constructor(items: T[]);
        constructor(container: HashSet<T>);
        constructor(begin: IForwardIterator<T>, end: IForwardIterator<T>);
        clear(): void;
        find(key: T): HashSet.Iterator<T>;
        begin(): HashSet.Iterator<T>;
        begin(index: number): HashSet.Iterator<T>;
        end(): HashSet.Iterator<T>;
        end(index: number): HashSet.Iterator<T>;
        rbegin(): HashSet.ReverseIterator<T>;
        rbegin(index: number): HashSet.ReverseIterator<T>;
        rend(): HashSet.ReverseIterator<T>;
        rend(index: number): HashSet.ReverseIterator<T>;
        bucket_count(): number;
        bucket_size(n: number): number;
        max_load_factor(): number;
        max_load_factor(z: number): void;
        bucket(key: T): number;
        reserve(n: number): void;
        rehash(n: number): void;
        /**
         * @hidden
         */
        protected _Insert_by_val(val: T): Pair<HashSet.Iterator<T>, boolean>;
        /**
         * @hidden
         */
        protected _Insert_by_hint(hint: HashSet.Iterator<T>, val: T): HashSet.Iterator<T>;
        /**
         * @hidden
         */
        protected _Insert_by_range<U extends T, InputIterator extends IForwardIterator<U>>(first: InputIterator, last: InputIterator): void;
        /**
         * @hidden
         */
        protected _Handle_insert(first: HashSet.Iterator<T>, last: HashSet.Iterator<T>): void;
        /**
         * @hidden
         */
        protected _Handle_erase(first: HashSet.Iterator<T>, last: HashSet.Iterator<T>): void;
        swap(obj: HashSet<T>): void;
    }
}
/**
 * @hidden
 */
declare namespace std.HashSet {
    type Iterator<T> = base.SetIterator<T, HashSet<T>>;
    type ReverseIterator<T> = base.SetReverseIterator<T, HashSet<T>>;
    var Iterator: typeof base.ArrayIterator;
    var ReverseIterator: typeof base.ArrayReverseIterator;
    type iterator<T> = Iterator<T>;
    type reverse_iterator<T> = ReverseIterator<T>;
    var iterator: typeof base.ArrayIterator;
    var reverse_iterator: typeof base.ArrayReverseIterator;
}
declare namespace std.base {
    abstract class MultiSet<T, Source extends IMultiSet<T>> extends SetContainer<T, Source> {
        insert(val: T): SetIterator<T, Source>;
        insert(hint: SetIterator<T, Source>, val: T): SetIterator<T, Source>;
        insert(hint: SetReverseIterator<T, Source>, val: T): SetReverseIterator<T, Source>;
        insert<U extends T, InputIterator extends Iterator<U>>(begin: InputIterator, end: InputIterator): void;
        merge(source: SetContainer<T, Source>): void;
    }
}
declare namespace std {
    class TreeMultiSet<T> extends base.MultiSet<T, TreeMultiSet<T>> implements base.ITreeSet<T, TreeMultiSet<T>> {
        /**
         * @hidden
         */
        private tree_;
        constructor();
        constructor(compare: (x: T, y: T) => boolean);
        constructor(array: Array<T>);
        constructor(array: Array<T>, compare: (x: T, y: T) => boolean);
        constructor(container: TreeMultiSet<T>);
        constructor(container: TreeMultiSet<T>, compare: (x: T, y: T) => boolean);
        constructor(begin: IForwardIterator<T>, end: IForwardIterator<T>);
        constructor(begin: IForwardIterator<T>, end: IForwardIterator<T>, compare: (x: T, y: T) => boolean);
        clear(): void;
        find(val: T): TreeMultiSet.Iterator<T>;
        count(val: T): number;
        key_comp(): (x: T, y: T) => boolean;
        value_comp(): (x: T, y: T) => boolean;
        lower_bound(val: T): TreeMultiSet.Iterator<T>;
        upper_bound(val: T): TreeMultiSet.Iterator<T>;
        equal_range(val: T): Pair<TreeMultiSet.Iterator<T>, TreeMultiSet.Iterator<T>>;
        /**
         * @hidden
         */
        protected _Insert_by_val(val: T): TreeMultiSet.Iterator<T>;
        /**
         * @hidden
         */
        protected _Insert_by_hint(hint: TreeMultiSet.Iterator<T>, val: T): TreeMultiSet.Iterator<T>;
        /**
         * @hidden
         */
        protected _Insert_by_range<U extends T, InputIterator extends IForwardIterator<U>>(first: InputIterator, last: InputIterator): void;
        /**
         * @hidden
         */
        protected _Handle_insert(first: TreeMultiSet.Iterator<T>, last: TreeMultiSet.Iterator<T>): void;
        /**
         * @hidden
         */
        protected _Handle_erase(first: TreeMultiSet.Iterator<T>, last: TreeMultiSet.Iterator<T>): void;
        swap(obj: TreeMultiSet<T>): void;
    }
}
/**
 * @hidden
 */
declare namespace std.TreeMultiSet {
    type Iterator<T> = base.SetIterator<T, TreeMultiSet<T>>;
    type ReverseIterator<T> = base.SetReverseIterator<T, TreeMultiSet<T>>;
    var Iterator: typeof base.ArrayIterator;
    var ReverseIterator: typeof base.ArrayReverseIterator;
    type iterator<T> = Iterator<T>;
    type reverse_iterator<T> = ReverseIterator<T>;
    var iterator: typeof base.ArrayIterator;
    var reverse_iterator: typeof base.ArrayReverseIterator;
}
declare namespace std {
    class HashMultiSet<T> extends base.MultiSet<T, HashMultiSet<T>> implements base.IHashSet<T, HashMultiSet<T>> {
        /**
         * @hidden
         */
        private hash_buckets_;
        constructor();
        constructor(items: T[]);
        constructor(container: HashMultiSet<T>);
        constructor(begin: IForwardIterator<T>, end: IForwardIterator<T>);
        clear(): void;
        find(key: T): HashMultiSet.Iterator<T>;
        count(key: T): number;
        begin(): HashMultiSet.Iterator<T>;
        begin(index: number): HashMultiSet.Iterator<T>;
        end(): HashMultiSet.Iterator<T>;
        end(index: number): HashMultiSet.Iterator<T>;
        rbegin(): HashMultiSet.ReverseIterator<T>;
        rbegin(index: number): HashMultiSet.ReverseIterator<T>;
        rend(): HashMultiSet.ReverseIterator<T>;
        rend(index: number): HashMultiSet.ReverseIterator<T>;
        bucket_count(): number;
        bucket_size(n: number): number;
        max_load_factor(): number;
        max_load_factor(z: number): void;
        bucket(key: T): number;
        reserve(n: number): void;
        rehash(n: number): void;
        /**
         * @hidden
         */
        protected _Insert_by_val(val: T): HashMultiSet.Iterator<T>;
        /**
         * @hidden
         */
        protected _Insert_by_hint(hint: HashMultiSet.Iterator<T>, val: T): HashMultiSet.Iterator<T>;
        /**
         * @hidden
         */
        protected _Insert_by_range<U extends T, InputIterator extends IForwardIterator<U>>(first: InputIterator, last: InputIterator): void;
        /**
         * @hidden
         */
        protected _Handle_insert(first: HashMultiSet.Iterator<T>, last: HashMultiSet.Iterator<T>): void;
        /**
         * @hidden
         */
        protected _Handle_erase(first: HashMultiSet.Iterator<T>, last: HashMultiSet.Iterator<T>): void;
        swap(obj: HashMultiSet<T>): void;
    }
}
/**
 * @hidden
 */
declare namespace std.HashMultiSet {
    type Iterator<T> = base.SetIterator<T, HashMultiSet<T>>;
    type ReverseIterator<T> = base.SetReverseIterator<T, HashMultiSet<T>>;
    var Iterator: typeof base.ArrayIterator;
    var ReverseIterator: typeof base.ArrayReverseIterator;
    type iterator<T> = Iterator<T>;
    type reverse_iterator<T> = ReverseIterator<T>;
    var iterator: typeof base.ArrayIterator;
    var reverse_iterator: typeof base.ArrayReverseIterator;
}
declare namespace std.base {
    abstract class MapContainer<Key, T, Source extends IMapContainer<Key, T>> extends Container<Entry<Key, T>> {
        /**
         * @hidden
         */
        private ptr_;
        /**
         * @hidden
         */
        private data_;
        protected constructor();
        assign<L extends Key, U extends T, InputIterator extends IForwardIterator<IPair<L, U>>>(first: InputIterator, last: InputIterator): void;
        clear(): void;
        abstract find(key: Key): MapIterator<Key, T, Source>;
        begin(): MapIterator<Key, T, Source>;
        end(): MapIterator<Key, T, Source>;
        rbegin(): MapReverseIterator<Key, T, Source>;
        rend(): MapReverseIterator<Key, T, Source>;
        has(key: Key): boolean;
        abstract count(key: Key): number;
        size(): number;
        push(...items: IPair<Key, T>[]): number;
        emplace_hint(hint: MapIterator<Key, T, Source>, key: Key, val: T): MapIterator<Key, T, Source>;
        emplace_hint(hint: MapReverseIterator<Key, T, Source>, key: Key, val: T): MapReverseIterator<Key, T, Source>;
        emplace_hint(hint: MapIterator<Key, T, Source>, pair: IPair<Key, T>): MapIterator<Key, T, Source>;
        emplace_hint(hint: MapReverseIterator<Key, T, Source>, pair: IPair<Key, T>): MapReverseIterator<Key, T, Source>;
        insert(hint: MapIterator<Key, T, Source>, pair: IPair<Key, T>): MapIterator<Key, T, Source>;
        insert(hint: MapReverseIterator<Key, T, Source>, pair: IPair<Key, T>): MapReverseIterator<Key, T, Source>;
        insert<L extends Key, U extends T, InputIterator extends IForwardIterator<IPair<L, U>>>(first: InputIterator, last: InputIterator): void;
        /**
         * @hidden
         */
        protected abstract _Emplace(key: Key, val: T): any;
        /**
         * @hidden
         */
        protected abstract _Emplace_hint(hint: MapIterator<Key, T, Source>, key: Key, val: T): MapIterator<Key, T, Source>;
        /**
         * @hidden
         */
        protected abstract _Insert_range<L extends Key, U extends T, InputIterator extends IForwardIterator<IPair<L, U>>>(first: InputIterator, last: InputIterator): void;
        erase(key: Key): number;
        erase(it: MapIterator<Key, T, Source>): MapIterator<Key, T, Source>;
        erase(begin: MapIterator<Key, T, Source>, end: MapIterator<Key, T, Source>): MapIterator<Key, T, Source>;
        erase(it: MapReverseIterator<Key, T, Source>): MapReverseIterator<Key, T, Source>;
        erase(begin: MapReverseIterator<Key, T, Source>, end: MapReverseIterator<Key, T, Source>): MapReverseIterator<Key, T, Source>;
        /**
         * @hidden
         */
        private _Erase_by_key(key);
        /**
         * @hidden
         */
        private _Erase_by_iterator(first, last?);
        /**
         * @hidden
         */
        private _Erase_by_range(first, last);
        /**
         * @hidden
         */
        swap(obj: MapContainer<Key, T, Source>): void;
        abstract merge(source: MapContainer<Key, T, Source>): void;
        /**
         * @hidden
         */
        protected abstract _Handle_insert(first: MapIterator<Key, T, Source>, last: MapIterator<Key, T, Source>): void;
        /**
         * @hidden
         */
        protected abstract _Handle_erase(first: MapIterator<Key, T, Source>, last: MapIterator<Key, T, Source>): void;
    }
}
declare namespace std.base {
    abstract class UniqueMap<Key, T, Source extends IUniqueMap<Key, T>> extends MapContainer<Key, T, Source> {
        count(key: Key): number;
        get(key: Key): T;
        set(key: Key, val: T): void;
        emplace(key: Key, value: T): Pair<MapIterator<Key, T, Source>, boolean>;
        emplace(pair: IPair<Key, T>): Pair<MapIterator<Key, T, Source>, boolean>;
        insert(pair: IPair<Key, T>): Pair<MapIterator<Key, T, Source>, boolean>;
        insert(hint: MapIterator<Key, T, Source>, pair: IPair<Key, T>): MapIterator<Key, T, Source>;
        insert(hint: MapReverseIterator<Key, T, Source>, pair: IPair<Key, T>): MapReverseIterator<Key, T, Source>;
        insert<L extends Key, U extends T, InputIterator extends IForwardIterator<IPair<L, U>>>(first: InputIterator, last: InputIterator): void;
        insert_or_assign(key: Key, value: T): Pair<MapIterator<Key, T, Source>, boolean>;
        insert_or_assign(hint: MapIterator<Key, T, Source>, key: Key, value: T): MapIterator<Key, T, Source>;
        insert_or_assign(hint: MapReverseIterator<Key, T, Source>, key: Key, value: T): MapReverseIterator<Key, T, Source>;
        /**
         * @hidden
         */
        private _Insert_or_assign_with_key_value(key, value);
        /**
         * @hidden
         */
        private _Insert_or_assign_with_hint(hint, key, value);
        extract(key: Key): Entry<Key, T>;
        extract(it: MapIterator<Key, T, Source>): MapIterator<Key, T, Source>;
        extract(it: MapReverseIterator<Key, T, Source>): MapReverseIterator<Key, T, Source>;
        /**
         * @hidden
         */
        private _Extract_by_key(key);
        /**
         * @hidden
         */
        private _Extract_by_iterator(it);
        /**
         * @hidden
         */
        private _Extract_by_reverse_iterator(it);
        merge(source: MapContainer<Key, T, Source>): void;
    }
}
declare namespace std.base {
    class MapIterator<Key, T, Source extends IMapContainer<Key, T>> extends base._ListIteratorBase<Entry<Key, T>> implements IComparable<MapIterator<Key, T, Source>> {
        /**
         * @hidden
         */
        private source_;
        /**
         * @hidden
         */
        constructor(associative: base._MapElementList<Key, T, Source>, prev: MapIterator<Key, T, Source>, next: MapIterator<Key, T, Source>, val: Pair<Key, T>);
        prev(): MapIterator<Key, T, Source>;
        next(): MapIterator<Key, T, Source>;
        advance(step: number): MapIterator<Key, T, Source>;
        /**
         * @hidden
         */
        source(): Source;
        readonly first: Key;
        second: T;
        less(obj: MapIterator<Key, T, Source>): boolean;
        equals(obj: MapIterator<Key, T, Source>): boolean;
        hashCode(): number;
        swap(obj: MapIterator<Key, T, Source>): void;
    }
}
declare namespace std.base {
    class MapReverseIterator<Key, T, Source extends IMapContainer<Key, T>> extends base.ReverseIterator<Pair<Key, T>, base.MapContainer<Key, T, Source>, MapIterator<Key, T, Source>, MapReverseIterator<Key, T, Source>> implements IComparable<MapReverseIterator<Key, T, Source>> {
        constructor(base: MapIterator<Key, T, Source>);
        /**
         * @hidden
         */
        protected _Create_neighbor(base: MapIterator<Key, T, Source>): MapReverseIterator<Key, T, Source>;
        readonly first: Key;
        second: T;
    }
}
declare namespace std {
    class TreeMap<Key, T> extends base.UniqueMap<Key, T, TreeMap<Key, T>> implements base.ITreeMap<Key, T, TreeMap<Key, T>> {
        /**
         * @hidden
         */
        private tree_;
        constructor();
        constructor(compare: (x: Key, y: Key) => boolean);
        constructor(array: Array<IPair<Key, T>>);
        constructor(array: Array<IPair<Key, T>>, compare: (x: Key, y: Key) => boolean);
        constructor(container: TreeMap<Key, T>);
        constructor(container: TreeMap<Key, T>, compare: (x: Key, y: Key) => boolean);
        constructor(begin: IForwardIterator<IPair<Key, T>>, end: IForwardIterator<IPair<Key, T>>);
        constructor(begin: IForwardIterator<IPair<Key, T>>, end: IForwardIterator<IPair<Key, T>>, compare: (x: Key, y: Key) => boolean);
        clear(): void;
        find(key: Key): TreeMap.Iterator<Key, T>;
        key_comp(): (x: Key, y: Key) => boolean;
        value_comp(): (x: IPair<Key, T>, y: IPair<Key, T>) => boolean;
        lower_bound(key: Key): TreeMap.Iterator<Key, T>;
        upper_bound(key: Key): TreeMap.Iterator<Key, T>;
        equal_range(key: Key): Pair<TreeMap.Iterator<Key, T>, TreeMap.Iterator<Key, T>>;
        /**
         * @hidden
         */
        protected _Emplace(key: Key, val: T): Pair<TreeMap.Iterator<Key, T>, boolean>;
        /**
         * @hidden
         */
        protected _Emplace_hint(hint: TreeMap.Iterator<Key, T>, key: Key, val: T): TreeMap.Iterator<Key, T>;
        /**
         * @hidden
         */
        protected _Insert_range<L extends Key, U extends T, InputIterator extends IForwardIterator<IPair<L, U>>>(first: InputIterator, last: InputIterator): void;
        /**
         * @hidden
         */
        protected _Handle_insert(first: TreeMap.Iterator<Key, T>, last: TreeMap.Iterator<Key, T>): void;
        /**
         * @hidden
         */
        protected _Handle_erase(first: TreeMap.Iterator<Key, T>, last: TreeMap.Iterator<Key, T>): void;
        swap(obj: TreeMap<Key, T>): void;
    }
}
declare namespace std.TreeMap {
    type Iterator<Key, T> = base.MapIterator<Key, T, TreeMap<Key, T>>;
    type ReverseIterator<Key, T> = base.MapReverseIterator<Key, T, TreeMap<Key, T>>;
    var Iterator: typeof base.MapIterator;
    var ReverseIterator: typeof base.MapReverseIterator;
    type iterator<Key, T> = Iterator<Key, T>;
    type reverse_iterator<Key, T> = ReverseIterator<Key, T>;
    var iterator: typeof base.MapIterator;
    var reverse_iterator: typeof base.MapReverseIterator;
}
declare namespace std {
    class HashMap<Key, T> extends base.UniqueMap<Key, T, HashMap<Key, T>> implements base.IHashMap<Key, T, HashMap<Key, T>> {
        /**
         * @hidden
         */
        private hash_buckets_;
        constructor();
        constructor(items: Array<IPair<Key, T>>);
        constructor(container: HashMap<Key, T>);
        constructor(begin: IForwardIterator<IPair<Key, T>>, end: IForwardIterator<IPair<Key, T>>);
        clear(): void;
        find(key: Key): HashMap.Iterator<Key, T>;
        begin(): HashMap.Iterator<Key, T>;
        begin(index: number): HashMap.Iterator<Key, T>;
        end(): HashMap.Iterator<Key, T>;
        end(index: number): HashMap.Iterator<Key, T>;
        rbegin(): HashMap.ReverseIterator<Key, T>;
        rbegin(index: number): HashMap.ReverseIterator<Key, T>;
        rend(): HashMap.ReverseIterator<Key, T>;
        rend(index: number): HashMap.ReverseIterator<Key, T>;
        bucket_count(): number;
        bucket_size(index: number): number;
        max_load_factor(): number;
        max_load_factor(z: number): void;
        bucket(key: Key): number;
        reserve(n: number): void;
        rehash(n: number): void;
        /**
         * @hidden
         */
        protected _Emplace(key: Key, val: T): Pair<HashMap.Iterator<Key, T>, boolean>;
        /**
         * @hidden
         */
        protected _Emplace_hint(hint: HashMap.Iterator<Key, T>, key: Key, val: T): HashMap.Iterator<Key, T>;
        /**
         * @hidden
         */
        protected _Insert_range<L extends Key, U extends T, InputIterator extends IForwardIterator<IPair<L, U>>>(first: InputIterator, last: InputIterator): void;
        /**
         * @hidden
         */
        protected _Handle_insert(first: HashMap.Iterator<Key, T>, last: HashMap.Iterator<Key, T>): void;
        /**
         * @hidden
         */
        protected _Handle_erase(first: HashMap.Iterator<Key, T>, last: HashMap.Iterator<Key, T>): void;
        swap(obj: HashMap<Key, T>): void;
    }
}
declare namespace std.HashMap {
    type Iterator<Key, T> = base.MapIterator<Key, T, HashMap<Key, T>>;
    type ReverseIterator<Key, T> = base.MapReverseIterator<Key, T, HashMap<Key, T>>;
    var Iterator: typeof base.MapIterator;
    var ReverseIterator: typeof base.MapReverseIterator;
    type iterator<Key, T> = Iterator<Key, T>;
    type reverse_iterator<Key, T> = ReverseIterator<Key, T>;
    var iterator: typeof base.MapIterator;
    var reverse_iterator: typeof base.MapReverseIterator;
}
declare namespace std.base {
    abstract class MultiMap<Key, T, Source extends IMultiMap<Key, T>> extends MapContainer<Key, T, Source> {
        emplace(key: Key, value: T): MapIterator<Key, T, Source>;
        emplace(pair: IPair<Key, T>): MapIterator<Key, T, Source>;
        insert(pair: IPair<Key, T>): MapIterator<Key, T, Source>;
        insert(hint: MapIterator<Key, T, Source>, pair: IPair<Key, T>): MapIterator<Key, T, Source>;
        insert(hint: MapReverseIterator<Key, T, Source>, pair: IPair<Key, T>): MapReverseIterator<Key, T, Source>;
        insert<L extends Key, U extends T, InputIterator extends IForwardIterator<IPair<L, U>>>(first: InputIterator, last: InputIterator): void;
        merge(source: MapContainer<Key, T, Source>): void;
    }
}
declare namespace std {
    class TreeMultiMap<Key, T> extends base.MultiMap<Key, T, TreeMultiMap<Key, T>> implements base.ITreeMap<Key, T, TreeMultiMap<Key, T>> {
        /**
         * @hidden
         */
        private tree_;
        constructor();
        constructor(compare: (x: Key, y: Key) => boolean);
        constructor(array: Array<IPair<Key, T>>);
        constructor(array: Array<IPair<Key, T>>, compare: (x: Key, y: Key) => boolean);
        constructor(container: TreeMultiMap<Key, T>);
        constructor(container: TreeMultiMap<Key, T>, compare: (x: Key, y: Key) => boolean);
        constructor(begin: IForwardIterator<IPair<Key, T>>, end: IForwardIterator<IPair<Key, T>>);
        constructor(begin: IForwardIterator<IPair<Key, T>>, end: IForwardIterator<IPair<Key, T>>, compare: (x: Key, y: Key) => boolean);
        clear(): void;
        find(key: Key): TreeMultiMap.Iterator<Key, T>;
        count(key: Key): number;
        key_comp(): (x: Key, y: Key) => boolean;
        value_comp(): (x: IPair<Key, T>, y: IPair<Key, T>) => boolean;
        lower_bound(key: Key): TreeMultiMap.Iterator<Key, T>;
        upper_bound(key: Key): TreeMultiMap.Iterator<Key, T>;
        equal_range(key: Key): Pair<TreeMultiMap.Iterator<Key, T>, TreeMultiMap.Iterator<Key, T>>;
        /**
         * @hidden
         */
        protected _Emplace(key: Key, val: T): TreeMultiMap.Iterator<Key, T>;
        /**
         * @hidden
         */
        protected _Emplace_hint(hint: TreeMultiMap.Iterator<Key, T>, key: Key, val: T): TreeMultiMap.Iterator<Key, T>;
        /**
         * @hidden
         */
        protected _Insert_range<L extends Key, U extends T, InputIterator extends IForwardIterator<IPair<L, U>>>(first: InputIterator, last: InputIterator): void;
        /**
         * @hidden
         */
        protected _Handle_insert(first: TreeMultiMap.Iterator<Key, T>, last: TreeMultiMap.Iterator<Key, T>): void;
        /**
         * @hidden
         */
        protected _Handle_erase(first: TreeMultiMap.Iterator<Key, T>, last: TreeMultiMap.Iterator<Key, T>): void;
        swap(obj: TreeMultiMap<Key, T>): void;
    }
}
declare namespace std.TreeMultiMap {
    type Iterator<Key, T> = base.MapIterator<Key, T, TreeMultiMap<Key, T>>;
    type ReverseIterator<Key, T> = base.MapReverseIterator<Key, T, TreeMultiMap<Key, T>>;
    var Iterator: typeof base.MapIterator;
    var ReverseIterator: typeof base.MapReverseIterator;
    type iterator<Key, T> = Iterator<Key, T>;
    type reverse_iterator<Key, T> = ReverseIterator<Key, T>;
    var iterator: typeof base.MapIterator;
    var reverse_iterator: typeof base.MapReverseIterator;
}
declare namespace std {
    class HashMultiMap<Key, T> extends base.MultiMap<Key, T, HashMultiMap<Key, T>> implements base.IHashMap<Key, T, HashMultiMap<Key, T>> {
        /**
         * @hidden
         */
        private hash_buckets_;
        constructor();
        constructor(items: Array<IPair<Key, T>>);
        constructor(container: HashMultiMap<Key, T>);
        constructor(begin: IForwardIterator<IPair<Key, T>>, end: IForwardIterator<IPair<Key, T>>);
        clear(): void;
        find(key: Key): HashMultiMap.Iterator<Key, T>;
        count(key: Key): number;
        begin(): HashMultiMap.Iterator<Key, T>;
        begin(index: number): HashMultiMap.Iterator<Key, T>;
        end(): HashMultiMap.Iterator<Key, T>;
        end(index: number): HashMultiMap.Iterator<Key, T>;
        rbegin(): HashMultiMap.ReverseIterator<Key, T>;
        rbegin(index: number): HashMultiMap.ReverseIterator<Key, T>;
        rend(): HashMultiMap.ReverseIterator<Key, T>;
        rend(index: number): HashMultiMap.ReverseIterator<Key, T>;
        bucket_count(): number;
        bucket_size(n: number): number;
        max_load_factor(): number;
        max_load_factor(z: number): void;
        bucket(key: Key): number;
        reserve(n: number): void;
        rehash(n: number): void;
        /**
         * @hidden
         */
        protected _Emplace(key: Key, val: T): HashMultiMap.Iterator<Key, T>;
        /**
         * @hidden
         */
        protected _Emplace_hint(hint: HashMultiMap.Iterator<Key, T>, key: Key, val: T): HashMultiMap.Iterator<Key, T>;
        /**
         * @hidden
         */
        protected _Insert_range<L extends Key, U extends T, InputIterator extends IForwardIterator<IPair<L, U>>>(first: InputIterator, last: InputIterator): void;
        /**
         * @hidden
         */
        protected _Handle_insert(first: HashMultiMap.Iterator<Key, T>, last: HashMultiMap.Iterator<Key, T>): void;
        /**
         * @hidden
         */
        protected _Handle_erase(first: HashMultiMap.Iterator<Key, T>, last: HashMultiMap.Iterator<Key, T>): void;
        swap(obj: HashMultiMap<Key, T>): void;
    }
}
declare namespace std.HashMultiMap {
    type Iterator<Key, T> = base.MapIterator<Key, T, HashMultiMap<Key, T>>;
    type ReverseIterator<Key, T> = base.MapReverseIterator<Key, T, HashMultiMap<Key, T>>;
    var Iterator: typeof base.MapIterator;
    var ReverseIterator: typeof base.MapReverseIterator;
    type iterator<Key, T> = Iterator<Key, T>;
    type reverse_iterator<Key, T> = ReverseIterator<Key, T>;
    var iterator: typeof base.MapIterator;
    var reverse_iterator: typeof base.MapReverseIterator;
}
declare namespace std {
    class Stack<T> {
        private container_;
        constructor();
        constructor(stack: Stack<T>);
        size(): number;
        empty(): boolean;
        top(): T;
        push(val: T): void;
        pop(): void;
        swap(obj: Stack<T>): void;
    }
}
declare namespace std {
    class Queue<T> {
        private container_;
        constructor();
        constructor(container: Queue<T>);
        size(): number;
        empty(): boolean;
        front(): T;
        back(): T;
        push(val: T): void;
        pop(): void;
        swap(obj: Queue<T>): void;
    }
}
declare namespace std {
    class PriorityQueue<T> {
        /**
         * @hidden
         */
        private container_;
        constructor();
        constructor(compare: (left: T, right: T) => boolean);
        constructor(array: Array<T>);
        constructor(array: Array<T>, compare: (left: T, right: T) => boolean);
        constructor(container: base.Container<T>);
        constructor(container: base.Container<T>, compare: (left: T, right: T) => boolean);
        constructor(begin: IForwardIterator<T>, end: IForwardIterator<T>);
        constructor(begin: IForwardIterator<T>, end: IForwardIterator<T>, compare: (left: T, right: T) => boolean);
        size(): number;
        empty(): boolean;
        top(): T;
        push(val: T): void;
        pop(): void;
        swap(obj: PriorityQueue<T>): void;
    }
}
declare namespace std {
    class Exception extends Error {
        constructor();
        constructor(message: string);
        what(): string;
    }
}
declare namespace std {
    class LogicError extends Exception {
        constructor(message: string);
    }
    class DomainError extends LogicError {
        constructor(message: string);
    }
    class InvalidArgument extends LogicError {
        constructor(message: string);
    }
    class LengthError extends LogicError {
        constructor(message: string);
    }
    class OutOfRange extends LogicError {
        constructor(message: string);
    }
}
declare namespace std {
    class RuntimeError extends Exception {
        constructor(message: string);
    }
    class OverflowError extends RuntimeError {
        constructor(message: string);
    }
    class UnderflowError extends RuntimeError {
        constructor(message: string);
    }
    class RangeError extends RuntimeError {
        constructor(message: string);
    }
}
declare namespace std.base {
    abstract class ErrorInstance {
        /**
         * @hidden
         */
        protected category_: ErrorCategory;
        /**
         * @hidden
         */
        protected value_: number;
        constructor();
        constructor(val: number, category: ErrorCategory);
        assign(val: number, category: ErrorCategory): void;
        clear(): void;
        category(): ErrorCategory;
        value(): number;
        message(): string;
        default_error_condition(): ErrorCondition;
        to_bool(): boolean;
    }
}
declare namespace std {
    class SystemError extends RuntimeError {
        /**
         * @hidden
         */
        protected code_: ErrorCode;
        constructor(code: ErrorCode);
        constructor(code: ErrorCode, message: string);
        constructor(val: number, category: ErrorCategory);
        constructor(val: number, category: ErrorCategory, message: string);
        code(): ErrorCode;
    }
}
declare namespace std {
    abstract class ErrorCategory {
        constructor();
        abstract name(): string;
        abstract message(val: number): string;
        default_error_condition(val: number): ErrorCondition;
        equivalent(val_code: number, cond: ErrorCondition): boolean;
        equivalent(code: ErrorCode, val_cond: number): boolean;
    }
}
declare namespace std {
    class ErrorCondition extends base.ErrorInstance {
        constructor();
        constructor(val: number, category: ErrorCategory);
    }
}
declare namespace std {
    class ErrorCode extends base.ErrorInstance {
        constructor();
        constructor(val: number, category: ErrorCategory);
    }
}
declare namespace std {
    function terminate(): void;
    function set_terminate(f: () => void): void;
    function get_terminate(): () => void;
}
declare namespace std {
    function bind<Ret>(fn: (...args: any[]) => Ret, ...args: any[]): (...args: any[]) => Ret;
    function bind<Ret, T>(fn: (...args: any[]) => Ret, thisArg: T, ...args: any[]): (...args: any[]) => Ret;
}
declare namespace std.placeholders {
    /**
     * @hidden
     */
    class PlaceHolder {
        private index_;
        constructor(index: number);
        index(): number;
    }
    const _1: PlaceHolder;
    const _2: PlaceHolder;
    const _3: PlaceHolder;
    const _4: PlaceHolder;
    const _5: PlaceHolder;
    const _6: PlaceHolder;
    const _7: PlaceHolder;
    const _8: PlaceHolder;
    const _9: PlaceHolder;
    const _10: PlaceHolder;
    const _11: PlaceHolder;
    const _12: PlaceHolder;
    const _13: PlaceHolder;
    const _14: PlaceHolder;
    const _15: PlaceHolder;
    const _16: PlaceHolder;
    const _17: PlaceHolder;
    const _18: PlaceHolder;
    const _19: PlaceHolder;
    const _20: PlaceHolder;
}
declare namespace std {
    function logical_and<T>(x: T, y: T): boolean;
    function logical_or<T>(x: T, y: T): boolean;
    function logical_not<T>(x: T): boolean;
    function bit_and(x: number, y: number): number;
    function bit_or(x: number, y: number): number;
    function bit_xor(x: number, y: number): number;
}
declare namespace std {
    function equal_to<T>(x: T, y: T): boolean;
    function not_equal_to<T>(x: T, y: T): boolean;
    function less<T>(x: T, y: T): boolean;
    function less_equal<T>(x: T, y: T): boolean;
    function greater<T>(x: T, y: T): boolean;
    function greater_equal<T>(x: T, y: T): boolean;
}
declare namespace std {
    function hash<T>(val: T, ...args: any[]): number;
}
declare namespace std {
    function swap<T>(left: base.Container<T>, right: base.Container<T>): void;
}
declare namespace std {
    function size<T>(container: base.Container<T>): number;
    function empty<T>(container: base.Container<T>): boolean;
    function distance<T, InputIterator extends IForwardIterator<T>>(first: InputIterator, last: InputIterator): number;
    function advance<T, InputIterator extends IForwardIterator<T>>(it: InputIterator, n: number): InputIterator;
    function prev<T, BidirectionalIterator extends IBidirectionalIterator<T>>(it: BidirectionalIterator, n?: number): BidirectionalIterator;
    function next<T, ForwardIterator extends IForwardIterator<T>>(it: ForwardIterator, n?: number): ForwardIterator;
    function begin<T>(container: Array<T>): JSArray.Iterator<T>;
    function begin<T, Source extends base.IArrayContainer<T>>(container: base.ArrayContainer<T, Source>): base.ArrayReverseIterator<T, Source>;
    function begin<T>(container: List<T>): List.Iterator<T>;
    function begin<T>(container: ForwardList<T>): ForwardList.Iterator<T>;
    function begin<T, Source extends base.ISetContainer<T>>(container: base.SetContainer<T, Source>): base.SetIterator<T, Source>;
    function begin<Key, T, Source extends base.IMapContainer<Key, T>>(container: base.MapContainer<Key, T, Source>): base.MapIterator<Key, T, Source>;
    function end<T>(container: Array<T>): JSArray.Iterator<T>;
    function end<T, Source extends base.IArrayContainer<T>>(container: base.ArrayContainer<T, Source>): base.ArrayReverseIterator<T, Source>;
    function end<T>(container: List<T>): List.ReverseIterator<T>;
    function end<T>(container: ForwardList<T>): ForwardList.Iterator<T>;
    function end<T, Source extends base.ISetContainer<T>>(container: base.SetContainer<T, Source>): base.SetIterator<T, Source>;
    function end<Key, T, Source extends base.IMapContainer<Key, T>>(container: base.MapContainer<Key, T, Source>): base.MapIterator<Key, T, Source>;
    function make_reverse_iterator<T, Source extends base.IArrayContainer<T>>(it: base.ArrayIterator<T, Source>): base.ArrayReverseIterator<T, Source>;
    function make_reverse_iterator<T>(it: List.Iterator<T>): List.ReverseIterator<T>;
    function make_reverse_iterator<T, Source extends base.ISetContainer<T>>(it: base.SetIterator<T, Source>): base.SetReverseIterator<T, Source>;
    function make_reverse_iterator<Key, T, Source extends base.IMapContainer<Key, T>>(it: base.MapIterator<Key, T, Source>): base.MapReverseIterator<Key, T, Source>;
    function rbegin<T, Source extends base.IArrayContainer<T>>(container: base.ArrayContainer<T, Source>): base.ArrayReverseIterator<T, Source>;
    function rbegin<T>(container: List<T>): List.ReverseIterator<T>;
    function rbegin<T, Source extends base.ISetContainer<T>>(container: base.SetContainer<T, Source>): base.SetIterator<T, Source>;
    function rbegin<Key, T, Source extends base.IMapContainer<Key, T>>(container: base.MapContainer<Key, T, Source>): base.MapIterator<Key, T, Source>;
    function rend<T, Source extends base.IArrayContainer<T>>(container: base.ArrayContainer<T, Source>): base.ArrayReverseIterator<T, Source>;
    function rend<T>(container: List<T>): List.ReverseIterator<T>;
    function rend<T, Source extends base.ISetContainer<T>>(container: base.SetContainer<T, Source>): base.SetIterator<T, Source>;
    function rend<Key, T, Source extends base.IMapContainer<Key, T>>(container: base.MapContainer<Key, T, Source>): base.MapIterator<Key, T, Source>;
}
declare namespace std {
    class Mutex implements ILockable {
        /**
         * @hidden
         */
        private lock_count_;
        /**
         * @hidden
         */
        private resolvers_;
        constructor();
        lock(): Promise<void>;
        try_lock(): boolean;
        unlock(): Promise<void>;
    }
}
declare namespace std {
    class SharedMutex implements ILockable {
        /**
         * @hidden
         */
        private read_lock_count_;
        /**
         * @hidden
         */
        private write_lock_count_;
        /**
         * @hidden
         */
        private resolvers_;
        constructor();
        lock(): Promise<void>;
        try_lock(): boolean;
        unlock(): Promise<void>;
        lock_shared(): Promise<void>;
        try_lock_shared(): boolean;
        unlock_shared(): Promise<void>;
    }
}
declare namespace std {
    class TimedMutex implements ILockable {
        /**
         * @hidden
         */
        private lock_count_;
        /**
         * @hidden
         */
        private resolvers_;
        constructor();
        lock(): Promise<void>;
        try_lock(): boolean;
        unlock(): Promise<void>;
        try_lock_for(ms: number): Promise<boolean>;
        try_lock_until(at: Date): Promise<boolean>;
    }
}
declare namespace std {
    class SharedTimedMutex implements ILockable {
        /**
         * @hidden
         */
        private read_lock_count_;
        /**
         * @hidden
         */
        private write_lock_count_;
        /**
         * @hidden
         */
        private resolvers_;
        constructor();
        lock(): Promise<void>;
        try_lock(): boolean;
        try_lock_for(ms: number): Promise<boolean>;
        try_lock_until(at: Date): Promise<boolean>;
        unlock(): Promise<void>;
        lock_shared(): Promise<void>;
        try_lock_shared(): boolean;
        try_lock_shared_for(ms: number): Promise<boolean>;
        try_lock_shared_until(at: Date): Promise<boolean>;
        unlock_shared(): Promise<void>;
    }
}
declare namespace std {
    class ConditionVariable {
        /**
         * @hidden
         */
        private resolvers_;
        constructor();
        wait(): Promise<void>;
        wait_for(ms: number): Promise<boolean>;
        wait_until(at: Date): Promise<boolean>;
        notify_one(): Promise<void>;
        notify_all(): Promise<void>;
    }
}
declare namespace std.experiments {
    class Semaphore implements ILockable {
        /**
         * @hidden
         */
        private hold_count_;
        /**
         * @hidden
         */
        private locked_count_;
        /**
         * @hidden
         */
        private size_;
        /**
         * @hidden
         */
        private listeners_;
        constructor(size: number);
        size(): number;
        /**
         * @hidden
         */
        private _Compute_excess_count(count);
        lock(): Promise<void>;
        lock(count: number): Promise<void>;
        try_lock(): boolean;
        try_lock(count: number): boolean;
        unlock(): Promise<void>;
        unlock(count: number): Promise<void>;
    }
}
declare namespace std.experiments {
    class TimedSemaphore implements ILockable {
        /**
         * @hidden
         */
        private hold_count_;
        /**
         * @hidden
         */
        private locked_count_;
        /**
         * @hidden
         */
        private size_;
        /**
         * @hidden
         */
        private resolvers_;
        constructor(size: number);
        size(): number;
        /**
         * @hidden
         */
        private _Compute_excess_count(count);
        private _Compute_resolve_count(count);
        lock(): Promise<void>;
        lock(count: number): Promise<void>;
        try_lock(): boolean;
        try_lock(count: number): boolean;
        unlock(): Promise<void>;
        unlock(count: number): Promise<void>;
        private _Unlock(resolved_count);
        try_lock_for(ms: number): Promise<boolean>;
        try_lock_for(ms: number, count: number): Promise<boolean>;
        try_lock_until(at: Date): Promise<boolean>;
        try_lock_until(at: Date, count: number): Promise<boolean>;
    }
}
declare namespace std {
    function sleep_for(ms: number): Promise<void>;
    function sleep_until(at: Date): Promise<void>;
    function lock(...items: ILockable[]): Promise<void>;
    function try_lock(...items: ILockable[]): number;
}
declare namespace std {
    class Pair<T1, T2> implements IPair<T1, T2>, IComparable<Pair<T1, T2>> {
        first: T1;
        second: T2;
        constructor(first: T1, second: T2);
        equals<U1 extends T1, U2 extends T2>(pair: Pair<U1, U2>): boolean;
        less<U1 extends T1, U2 extends T2>(pair: Pair<U1, U2>): boolean;
        hashCode(): number;
    }
}
declare namespace std {
    class Entry<Key, T> implements IPair<Key, T>, IComparable<Entry<Key, T>> {
        readonly first: Key;
        second: T;
        constructor(first: Key, second: T);
        equals(obj: Entry<Key, T>): boolean;
        less(obj: Entry<Key, T>): boolean;
        hashCode(): number;
    }
}
declare namespace std {
    function is_node(): boolean;
    function make_pair<T1, T2>(x: T1, y: T2): Pair<T1, T2>;
}
declare namespace std.base {
    /**
     * @hidden
     */
    class _MapElementList<Key, T, Source extends IMapContainer<Key, T>> extends _ListContainer<Entry<Key, T>, MapIterator<Key, T, Source>> {
        /**
         * @hidden
         */
        private associative_;
        /**
         * @hidden
         */
        private rend_;
        constructor(associative: Source);
        protected _Create_iterator(prev: MapIterator<Key, T, Source>, next: MapIterator<Key, T, Source>, val: Entry<Key, T>): MapIterator<Key, T, Source>;
        protected _Set_begin(it: MapIterator<Key, T, Source>): void;
        associative(): Source;
        rbegin(): MapReverseIterator<Key, T, Source>;
        rend(): MapReverseIterator<Key, T, Source>;
    }
}
declare namespace std.base {
    /**
     * @hidden
     */
    class _SetElementList<T, Source extends ISetContainer<T>> extends _ListContainer<T, SetIterator<T, Source>> {
        /**
         * @hidden
         */
        private associative_;
        /**
         * @hidden
         */
        private rend_;
        constructor(associative: Source);
        protected _Create_iterator(prev: SetIterator<T, Source>, next: SetIterator<T, Source>, val: T): SetIterator<T, Source>;
        protected _Set_begin(it: SetIterator<T, Source>): void;
        associative(): Source;
        rbegin(): SetReverseIterator<T, Source>;
        rend(): SetReverseIterator<T, Source>;
    }
}
declare namespace std.base {
    /**
     * @hidden
     */
    enum _Hash {
        MIN_SIZE = 10,
        RATIO = 1,
        MAX_RATIO = 2,
    }
    /**
     * @hidden
     */
    abstract class _HashBuckets<T> {
        private buckets_;
        private item_size_;
        protected constructor();
        rehash(size: number): void;
        clear(): void;
        size(): number;
        item_size(): number;
        capacity(): number;
        at(index: number): Vector<T>;
        hash_index(val: T): number;
        insert(val: T): void;
        erase(val: T): void;
    }
}
declare namespace std.base {
    /**
     * @hidden
     */
    class _MapHashBuckets<Key, T, Source extends IMapContainer<Key, T>> extends _HashBuckets<MapIterator<Key, T, Source>> {
        private source_;
        constructor(map: IHashMap<Key, T, Source>);
        find(key: Key): MapIterator<Key, T, Source>;
    }
}
declare namespace std.base {
    /**
     * @hidden
     */
    class _SetHashBuckets<T, Source extends ISetContainer<T>> extends _HashBuckets<SetIterator<T, Source>> {
        private source_;
        constructor(set: IHashSet<T, Source>);
        find(val: T): SetIterator<T, Source>;
    }
}
declare namespace std.base {
    interface IArrayContainer<T> extends ILinearContainer<T> {
        at(index: number): T;
        set(index: number, val: T): void;
    }
    interface IArrayIterator<T> extends ILinearIterator<T> {
        source(): IArrayContainer<T>;
        index(): number;
        prev(): IArrayIterator<T>;
        next(): IArrayIterator<T>;
    }
}
declare namespace std.base {
    interface IDequeContainer<T> extends ILinearContainer<T> {
        push_front(val: T): void;
        pop_front(): void;
    }
}
declare namespace std.base {
    interface IHashMap<Key, T, Source extends IMapContainer<Key, T>> extends MapContainer<Key, T, Source> {
        bucket_count(): number;
        bucket_size(n: number): number;
        max_load_factor(): number;
        max_load_factor(z: number): void;
        bucket(key: Key): number;
        reserve(n: number): void;
        rehash(n: number): void;
    }
}
declare namespace std.base {
    interface IHashSet<T, Source extends ISetContainer<T>> extends SetContainer<T, Source> {
        bucket_count(): number;
        bucket_size(n: number): number;
        max_load_factor(): number;
        max_load_factor(z: number): void;
        bucket(key: T): number;
        reserve(n: number): void;
        rehash(n: number): void;
    }
}
declare namespace std.base {
    interface ILinearContainer<T> extends Container<T> {
        assign<U extends T, InputIterator extends Iterator<U>>(begin: InputIterator, end: InputIterator): void;
        assign(n: number, val: T): void;
        front(): T;
        front(val: T): void;
        back(): T;
        back(val: T): void;
        push_back(val: T): void;
        pop_back(): void;
        insert(position: Iterator<T>, val: T): Iterator<T>;
        insert(position: Iterator<T>, n: number, val: T): Iterator<T>;
        insert<U extends T, InputIterator extends Iterator<U>>(position: Iterator<T>, first: InputIterator, last: InputIterator): Iterator<T>;
    }
    interface ILinearIterator<T> extends Iterator<T> {
        source(): ILinearContainer<T>;
        value: T;
        prev(): ILinearIterator<T>;
        next(): ILinearIterator<T>;
    }
}
declare namespace std.base {
    interface IMapContainer<Key, T> extends MapContainer<Key, T, IMapContainer<Key, T>> {
    }
    interface IUniqueMap<Key, T> extends UniqueMap<Key, T, IUniqueMap<Key, T>> {
    }
    interface IMultiMap<Key, T> extends MultiMap<Key, T, IMultiMap<Key, T>> {
    }
}
declare namespace std.base {
    interface ISetContainer<T> extends SetContainer<T, ISetContainer<T>> {
    }
    interface IUniqueSet<T> extends UniqueSet<T, IUniqueSet<T>> {
    }
    interface IMultiSet<T> extends MultiSet<T, IMultiSet<T>> {
    }
}
declare namespace std.base {
    interface ITreeMap<Key, T, Source extends IMapContainer<Key, T>> extends MapContainer<Key, T, Source> {
        key_comp(): (x: Key, y: Key) => boolean;
        value_comp(): (x: IPair<Key, T>, y: IPair<Key, T>) => boolean;
        lower_bound(key: Key): MapIterator<Key, T, Source>;
        upper_bound(key: Key): MapIterator<Key, T, Source>;
        equal_range(key: Key): Pair<MapIterator<Key, T, Source>, MapIterator<Key, T, Source>>;
    }
}
declare namespace std.base {
    interface ITreeSet<T, Source extends ISetContainer<T>> extends SetContainer<T, Source> {
        key_comp(): (x: T, y: T) => boolean;
        value_comp(): (x: T, y: T) => boolean;
        lower_bound(val: T): SetIterator<T, Source>;
        upper_bound(val: T): SetIterator<T, Source>;
        equal_range(val: T): Pair<SetIterator<T, Source>, SetIterator<T, Source>>;
    }
}
declare namespace std.base {
    /**
     * @hidden
     */
    class _DequeForOfAdaptor<T> implements IterableIterator<T> {
        private matrix_;
        private row_;
        private col_;
        constructor(matrix: T[][]);
        next(): IteratorResult<T>;
        [Symbol.iterator](): IterableIterator<T>;
    }
}
declare namespace std.base {
    /**
     * @hidden
     */
    class _NativeArrayIterator<T> extends Iterator<T> {
        private data_;
        private index_;
        constructor(data: Array<T>, index: number);
        source(): Container<T>;
        index(): number;
        readonly value: T;
        prev(): _NativeArrayIterator<T>;
        next(): _NativeArrayIterator<T>;
        advance(n: number): _NativeArrayIterator<T>;
        equals(obj: _NativeArrayIterator<T>): boolean;
        swap(obj: _NativeArrayIterator<T>): void;
    }
}
declare namespace std.base {
    /**
     * @hidden
     */
    class _Repeater<T> extends Iterator<T> {
        private index_;
        private value_;
        constructor(index: number, value?: T);
        source(): base.Container<T>;
        index(): number;
        readonly value: T;
        prev(): _Repeater<T>;
        next(): _Repeater<T>;
        advance(n: number): _Repeater<T>;
        equals(obj: _Repeater<T>): boolean;
        swap(obj: _Repeater<T>): void;
    }
}
declare namespace std.base {
    class ForOfAdaptor<T> implements IterableIterator<T> {
        private it_;
        private last_;
        constructor(first: IForwardIterator<T>, last: IForwardIterator<T>);
        next(): IteratorResult<T>;
        [Symbol.iterator](): IterableIterator<T>;
    }
}
declare namespace std.base {
    /**
     * @hidden
     */
    class _LockType {
        static readonly WRITE: boolean;
        static readonly READ: boolean;
        static readonly LOCK: boolean;
        static readonly TRY_LOCK: boolean;
    }
}
declare namespace std.base {
    /**
     * @hidden
     */
    enum _Color {
        BLACK = 0,
        RED = 1,
    }
}
declare namespace std.base {
    /**
     * @hidden
     */
    abstract class _XTree<T> {
        protected root_: _XTreeNode<T>;
        private compare_;
        protected constructor();
        protected constructor(compare: (x: T, y: T) => boolean);
        clear(): void;
        root(): _XTreeNode<T>;
        find(val: T): _XTreeNode<T>;
        protected _Fetch_maximum(node: _XTreeNode<T>): _XTreeNode<T>;
        insert(val: T): void;
        private _Insert_case1(N);
        private _Insert_case2(N);
        private _Insert_case3(N);
        private _Insert_case4(node);
        private _Insert_case5(node);
        erase(val: T): void;
        private _Erase_case1(N);
        private _Erase_case2(N);
        private _Erase_case3(N);
        private _Erase_case4(N);
        private _Erase_case5(N);
        private _Erase_case6(node);
        protected _Rotate_left(node: _XTreeNode<T>): void;
        protected _Rotate_right(node: _XTreeNode<T>): void;
        protected _Replace_node(oldNode: _XTreeNode<T>, newNode: _XTreeNode<T>): void;
        private _Fetch_color(node);
    }
}
declare namespace std.base {
    /**
     * @hidden
     */
    abstract class _MapTree<Key, T, Source extends IMapContainer<Key, T>> extends _XTree<MapIterator<Key, T, Source>> {
        private source_;
        private key_compare_;
        private value_compare_;
        constructor(source: Source, compare: (x: Key, y: Key) => boolean, itCompare: (x: MapIterator<Key, T, Source>, y: MapIterator<Key, T, Source>) => boolean);
        abstract find_by_key(key: Key): _XTreeNode<MapIterator<Key, T, Source>>;
        lower_bound(key: Key): MapIterator<Key, T, Source>;
        abstract upper_bound(key: Key): MapIterator<Key, T, Source>;
        equal_range(key: Key): Pair<MapIterator<Key, T, Source>, MapIterator<Key, T, Source>>;
        source(): Source;
        key_comp(): (x: Key, y: Key) => boolean;
        value_comp(): (x: IPair<Key, T>, y: IPair<Key, T>) => boolean;
    }
}
declare namespace std.base {
    class _MultiMapTree<Key, T, Source extends IMultiMap<Key, T>> extends _MapTree<Key, T, Source> {
        constructor(map: Source, compare: (x: Key, y: Key) => boolean);
        insert(val: MapIterator<Key, T, Source>): void;
        find_by_key(key: Key): _XTreeNode<MapIterator<Key, T, Source>>;
        upper_bound(key: Key): MapIterator<Key, T, Source>;
    }
}
declare namespace std.base {
    /**
     * @hidden
     */
    abstract class _SetTree<T, Source extends ISetContainer<T>> extends _XTree<SetIterator<T, Source>> {
        private source_;
        private key_comp_;
        constructor(set: Source, compare: (x: T, y: T) => boolean, itCompare: (x: SetIterator<T, Source>, y: SetIterator<T, Source>) => boolean);
        abstract find_by_val(val: T): _XTreeNode<SetIterator<T, Source>>;
        lower_bound(val: T): SetIterator<T, Source>;
        abstract upper_bound(val: T): SetIterator<T, Source>;
        equal_range(val: T): Pair<SetIterator<T, Source>, SetIterator<T, Source>>;
        source(): Source;
        key_comp(): (x: T, y: T) => boolean;
        value_comp(): (x: T, y: T) => boolean;
    }
}
declare namespace std.base {
    /**
     * @hidden
     */
    class _MultiSetTree<T, Source extends IMultiSet<T>> extends _SetTree<T, Source> {
        constructor(set: Source, compare: (x: T, y: T) => boolean);
        insert(val: SetIterator<T, Source>): void;
        find_by_val(val: T): _XTreeNode<SetIterator<T, Source>>;
        upper_bound(val: T): SetIterator<T, Source>;
    }
}
declare namespace std.base {
    /**
     * @hidden
     */
    class _UniqueMapTree<Key, T, Source extends IUniqueMap<Key, T>> extends _MapTree<Key, T, Source> {
        constructor(map: Source, compare: (x: Key, y: Key) => boolean);
        find_by_key(key: Key): _XTreeNode<MapIterator<Key, T, Source>>;
        upper_bound(key: Key): MapIterator<Key, T, Source>;
    }
}
declare namespace std.base {
    /**
     * @hidden
     */
    class _UniqueSetTree<T, Source extends IUniqueSet<T>> extends _SetTree<T, Source> {
        constructor(set: Source, compare: (x: T, y: T) => boolean);
        find_by_val(val: T): _XTreeNode<SetIterator<T, Source>>;
        upper_bound(val: T): SetIterator<T, Source>;
    }
}
declare namespace std.base {
    /**
     * @hidden
     */
    class _XTreeNode<T> {
        private static sequence;
        uid: number;
        parent: _XTreeNode<T>;
        left: _XTreeNode<T>;
        right: _XTreeNode<T>;
        value: T;
        color: _Color;
        constructor(value: T, color: _Color);
        readonly grandParent: _XTreeNode<T>;
        readonly sibling: _XTreeNode<T>;
        readonly uncle: _XTreeNode<T>;
    }
}
declare namespace std {
    export import vector = Vector;
    export import deque = Deque;
    export import list = List;
    export import forward_list = ForwardList;
    type stack<T> = Stack<T>;
    type queue<T> = Queue<T>;
    type priority_queue<T> = PriorityQueue<T>;
    var stack: typeof Stack;
    var queue: typeof Queue;
    var priority_queue: typeof PriorityQueue;
    export import set = TreeSet;
    export import multiset = TreeMultiSet;
    export import unordered_set = HashSet;
    export import unordered_multiset = HashMultiSet;
    export import map = TreeMap;
    export import multimap = TreeMultiMap;
    export import unordered_map = HashMap;
    export import unordered_multimap = HashMultiMap;
    type exception = Exception;
    type logic_error = LogicError;
    type domain_error = DomainError;
    type invalid_argument = InvalidArgument;
    type length_error = LengthError;
    type out_of_range = OutOfRange;
    type runtime_error = RuntimeError;
    type overflow_error = OverflowError;
    type underflow_error = UnderflowError;
    type range_error = RangeError;
    type system_error = SystemError;
    type error_category = ErrorCategory;
    type error_condition = ErrorCondition;
    type error_code = ErrorCode;
    var exception: typeof Exception;
    var logic_error: typeof LogicError;
    var domain_error: typeof DomainError;
    var invalid_argument: typeof InvalidArgument;
    var length_error: typeof LengthError;
    var out_of_range: typeof OutOfRange;
    var runtime_error: typeof RuntimeError;
    var overflow_error: typeof OverflowError;
    var underflow_error: typeof UnderflowError;
    var range_error: typeof RangeError;
    var system_error: typeof SystemError;
    var error_category: typeof ErrorCategory;
    var error_condition: typeof ErrorCondition;
    var error_code: typeof ErrorCode;
    type mutex = Mutex;
    type shared_mutex = SharedMutex;
    type timed_mutex = TimedMutex;
    type shared_timed_mutex = SharedTimedMutex;
    type condition_variable = ConditionVariable;
    var mutex: typeof Mutex;
    var shared_mutex: typeof SharedMutex;
    var timed_mutex: typeof TimedMutex;
    var shared_timed_mutex: typeof SharedTimedMutex;
    var condition_variable: typeof ConditionVariable;
}
declare namespace std.experiments {
    type semaphore = Semaphore;
    type timed_semaphore = TimedSemaphore;
    var semaphore: typeof Semaphore;
    var timed_semaphore: typeof TimedSemaphore;
}
declare namespace std {
    interface IComparable<T> {
        equals(obj: T): boolean;
        less?(obj: T): boolean;
        hashCode?(): number;
    }
}
declare namespace std {
    interface IPointer<T> {
        value: T;
    }
}
declare namespace std {
    interface IBidirectionalIterator<T> extends IForwardIterator<T> {
        prev(): IBidirectionalIterator<T>;
    }
}
declare namespace std {
    interface IForwardIterator<T> {
        readonly value: T;
        next(): IForwardIterator<T>;
        advance(n: number): IForwardIterator<T>;
        equals(obj: IForwardIterator<T>): boolean;
    }
}
declare namespace std {
    interface IRandomAccessIterator<T> extends IBidirectionalIterator<T> {
        index(): number;
    }
}
declare namespace std.JSArray {
    type Iterator<T> = Vector.Iterator<T>;
    type ReverseIterator<T> = Vector.ReverseIterator<T>;
    var Iterator: typeof base.ArrayIterator;
    var ReverseIterator: typeof base.ArrayReverseIterator;
}
declare namespace std {
    interface ILockable {
        lock(): Promise<void>;
        try_lock(): boolean;
        unlock(): Promise<void>;
    }
}
declare namespace std {
    interface IPair<T1, T2> {
        first: T1;
        second: T2;
    }
}
