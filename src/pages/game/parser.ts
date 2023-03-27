export default function parse(code: string) {
    // @ts-ignore
    const obj: Structure = {};

    for (const block of code.split(";"))
    {
        const [x, y, type, ...rest] = block.split(".");

        if (!x || !y || !type)
            throw new SyntaxError(`Invalid block properties: ${block}`);

        const key = x + " " + y;
        obj[key] = [type as SquareType, ...rest];

        // Detect start and end block
        if (type === "c") {
            if (obj.start)
                throw new SyntaxError(`Cannot have two or more start block: ${block}`);

            obj.start = key;
        } else if (type === "d") {
            if (obj.end)
                throw new SyntaxError(`Cannot have two or more end block: ${block}`);

            obj.end = key;
        }
    }

    return obj;
}