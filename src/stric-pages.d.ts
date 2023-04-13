/// <reference types="@stricjs/arrow/global" />
/// <reference types="bun-types" />

/**
 * All sound effects on the client
 */
interface Sounds {
    readonly restart: HTMLAudioElement;
    readonly fail: HTMLAudioElement;
    readonly complete: HTMLAudioElement;
    readonly getmoves: HTMLAudioElement;
}

/**
 * A block in a structure
 */
type Block = [type: SquareType, ...args: string[]];

/**
 * A parsed structure
 */
interface Structure {
    [pos: string]: Block | string;
    /**
     * Start block position
     */
    start: string;
    /**
     * End block position
     */
    end: string;
}

declare module "*.mp3" {
    const src: string;
    export default src;
}