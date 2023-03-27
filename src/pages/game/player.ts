import { ReactiveProxy, reactive } from "@stricjs/arrow/utils";
import { size } from "./constants";

export enum Direction {
    A = "a",
    W = "w",
    S = "s",
    D = "d"
}

function isOpposite(d1: Direction, d2: Direction) {
    return (d1 === "a" && d2 == "d")
        || (d2 === "a" && d1 == "d")
        || (d1 === "s" && d2 == "w")
        || (d2 === "s" && d1 == "w");
}

export const playerDiv = /*html*/`<div id="player"></div>`;

export type PlayerEvent = "restart" | "fail" | "complete" | "getmoves";

export class Player {
    direction?: Direction;
    row: number;
    col: number;
    private readonly startPos: number[];
    readonly movesLeft: ReactiveProxy<{ value: number }>;
    
    private readonly events: Record<string, () => any>;

    /**
     * Create a player for current structure
     * @param struct 
     */
    constructor(public readonly struct: Structure) {
        // Set x, y based on start position
        this.startPos = [this.row, this.col] = struct.start.split(" ").map(Number);
        this.movesLeft = reactive({ value: 0 });
        this.events = {};
    }

    /**
     * Constructor but static
     * @param struct 
     */
    static create(struct: Structure) {
        return new Player(struct);
    }

    /**
     * Check whether a block is not empty
     * @param x 
     * @param y 
     */
    private notEmpty(x: number, y: number) {
        return !!this.struct[`${x} ${y}`];
    }

    /**
     * Check whether move is valid
     * @param direction 
     */
    private isValid(direction: Direction) {
        return (direction === "a" && this.notEmpty(this.row, this.col - 1))
            || (direction === "d" && this.notEmpty(this.row, this.col + 1))
            || (direction === "w" && this.notEmpty(this.row - 1, this.col))
            || (direction === "s" && this.notEmpty(this.row + 1, this.col))
    }

    /**
     * Return the current position of the player
     */
    select() {
        return document
            .querySelector?.(`.rw[index="${this.row}"]`)
            .querySelector?.(`.sq[index="${this.col}"]`);
    }

    /**
     * Get moves for the player
     */
    getMoves() {
        if (this.movesLeft.value)
            return "You still have moves left! Keep going!";

        this.movesLeft.value = Math.round(Math.random() * 5) + 1;
        return this.trigger("getmoves");
    }

    /**
     * Clear the player 
     */
    clear() {
        const selector = this.select();
        if (!selector)
            return;
            
        selector.innerHTML = "";
    }

    /**
     * Update player position
     */
    render() {
        const selector = this.select();
        if (!selector)
            return;

        selector.innerHTML = playerDiv;
    }

    /**
     * Return a message for alerts
     * @param direction 
     */
    move(direction: Direction) {
        if (this.movesLeft.value <= 0)
            return "You have no moves left! Click `Get moves` to continue!";
        if (!this.isValid(direction))
            return "No you cannot move there!";
        if (this.direction && isOpposite(this.direction, direction))
            return "Cannot move to the opposite direction!";
        
        this.direction = direction;

        // Move
        if (direction === "a" && this.col > 0)
            (this.clear(), --this.col);
        else if (direction === "d" && this.col < size)
            (this.clear(), ++this.col);
        else if (direction === "w" && this.row > 0)
            (this.clear(), --this.row);
        else if (this.row < size)
            (this.clear(), ++this.row);

        // Change player position
        this.render();

        --this.movesLeft.value;
        if (this.movesLeft.value === 0)
            return this.checkMove();
    }

    /**
     * Check move
     */
    checkMove() {
        // Finish
        if (this.pos === this.struct.end) {
            this.trigger("complete");
            return "Map completed!";
        }

        // Crash
        else if (this.struct[this.pos][0] === "b") {
            this.trigger("fail");
            this.restart(false);
            return "You touched red! Try again!";
        }
    }

    /**
     * Add an event handler
     * @param e 
     * @param cb 
     */
    on(e: PlayerEvent, cb: () => any) {
        this.events[e] = cb;
    }

    /**
     * Run an event handler
     * @param e 
     */
    trigger(e: PlayerEvent) {
        return this.events[e]?.();
    }

    /**
     * Reset player position
     */
    restart(trigger: boolean = true) {
        this.clear();
        [this.row, this.col] = this.startPos;
        this.render();
        this.movesLeft.value = 0;
        
        if (trigger)
            return this.trigger("restart");
    }

    // @ts-ignore
    readonly get pos() {
        return `${this.row} ${this.col}`;
    }
}