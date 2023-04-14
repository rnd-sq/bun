import { html } from "@stricjs/arrow/utils";
import game from "./components/game/main";
import parse from "./game/parser";
import { Direction, Player } from "./game/player";
import { file } from "bun";

export function render() {
    // Create a player for the default rnd structure
    const player = new Player(parse(props));

    // Render the game and the player
    html`${game(player)}`;

    // Handle move events
    document.addEventListener("keyup", e => {
        e.preventDefault();

        player.move(e.key as Direction);
    });
}

// Load map
export function fetch() {
    return file("./src/internals/default.rnd").text();
}

export const title = "Game";
export const description = "Main game";