import { template } from "@stricjs/arrow/utils";
import repeat from "../../utils/repeat";
import { size } from "../../game/constants";
import "./game.css";
import { Player, playerDiv } from "../../game/player";
import navbar from "./navbar";

/**
 * Render a block
 * @param pos 
 * @param havePlayer 
 * @param type 
 */
export function block(y: number, havePlayer: boolean, type?: SquareType) {
    return template`<div 
        class="sq" 
        ${type ? `type="${type}"` : ""} 
        index="${y}"
    >${havePlayer ? playerDiv : ""}</div>`;
}

/**
 * Render the game with a player
 * @param player 
 */
export function game(player: Player, sounds: Sounds) {
    // Play sound effects
    player.on("getmoves", () => sounds.getmoves.play());
    player.on("fail", () => sounds.fail.play());
    player.on("restart", () => sounds.restart.play());
    player.on("complete", () => sounds.complete.play());

    return template`<main id="game">
        ${navbar(player)}
        ${player ? repeat(size, i => 
            template`<div class="rw" index="${i}">
                ${repeat(size, y => {
                    const pos = i + " " + y;

                    return block(
                        // Check the current player position
                        y, pos === player.pos,
                        player.struct[pos]?.[0]
                    )
                })}
            </div>`
        ) : ""}
    </main>`;
}