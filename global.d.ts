/**
 * "a": "empty"
 * "b": "x"
 * "c": "start"
 * "d": "end"
 */
type SquareType = "a" | "b" | "c" | "d";

/**
 * A block in a structure
 */
type Block = [type: SquareType, ...args: string[]];

/**
 * A parsed structure
 */
interface Structure {
    [pos: string]: Block;
    /**
     * Start block position
     */
    start: string;
    /**
     * End block position
     */
    end: string;
}