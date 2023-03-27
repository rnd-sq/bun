export default function repeat<T>(t: number, cb: (i: number) => T) {
    const res = [];
    for (let i = 0; i < t; ++i)
        res.push(cb(i));
    return res;
}