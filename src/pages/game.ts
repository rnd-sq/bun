import { html } from "@stricjs/arrow/utils";
import { game } from "./components/game/main";
import parse from "./game/parser";
import { Direction, Player } from "./game/player";

export async function render() {
    // Create a player for the default rnd structure
    const player = new Player(
        await fetch("/default.rnd")
            .then(v => v.text())
            .then(parse)
    );

    // Play sounds
    const sounds: Sounds = {
        restart: new Audio("/sounds/restart.mp3"),
        fail: new Audio("/sounds/fail.mp3"),
        complete: new Audio("/sounds/complete.mp3"),
        getmoves: new Audio("/sounds/getmoves.mp3"),
    };

    // Render the game and the player
    html`${game(player, sounds)}`;

    // Handle move events
    document.addEventListener("keyup", e => {
        e.preventDefault();

        player.move(e.key as Direction);
    });
}