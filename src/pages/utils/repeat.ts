export default function repeat<T>(t: number, cb: (i: number) => T) {
    let res = new Array(t), i = 0;
    for (i = 0; i < t; ++i)
        res[i] = cb(i);
    return res;
}