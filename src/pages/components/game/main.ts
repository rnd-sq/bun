import { template } from "@stricjs/arrow/utils";
import repeat from "../../utils/repeat";

import { size } from "../../game/constants";
import { Player } from "../../game/player";

import navbar from "./navbar";
import block from "../block/main";

import "./game.css";
import "../block/block.css";

import getMovesSound from "../../game/sounds/getmoves.mp3";
import failSound from "../../game/sounds/fail.mp3";
import restartSound from "../../game/sounds/restart.mp3";
import completeSound from "../../game/sounds/complete.mp3";

/**
 * Render the game with a player
 * @param player 
 */
export default function game(player: Player) {
    const sounds: Sounds = {
        getmoves: new Audio(getMovesSound),
        fail: new Audio(failSound),
        restart: new Audio(restartSound),
        complete: new Audio(completeSound)
    };

    // Play sound effects
    player.on("getmoves", () => sounds.getmoves.play());
    player.on("fail", () => sounds.fail.play());
    player.on("restart", () => sounds.restart.play());
    player.on("complete", () => sounds.complete.play());

    return template`<main id="game">
        ${navbar(player)}
        ${
            // This is static so it's fine to not use template tag
            player ? repeat(size, i => 
                template`<div class="rw" index="${i}">
                    ${repeat(size, y => {
                        const pos = i + " " + y;
                        return block(
                            // Check the current player position
                            y, pos === player.pos,
                            player.struct[pos]?.[0] as SquareType
                        );
                    })}
                </div>`
            ) : ""
        }
    </main>`;
}