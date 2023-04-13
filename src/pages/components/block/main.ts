import { template } from "@stricjs/arrow/utils";
import { playerDiv } from "../../game/player";

/**
 * Render a block
 * @param pos 
 * @param havePlayer 
 * @param type 
 */
export default function block(y: number, havePlayer: boolean, type?: SquareType) {
    return template`<div 
        class="sq" 
        ${type ? `type="${type}"` : ""} 
        index="${y}"
    >${havePlayer ? playerDiv : ""}</div>`;
}