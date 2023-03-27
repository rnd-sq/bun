import { template } from "@stricjs/arrow/utils";
import { Player } from "../../game/player";

export default function navbar(player: Player) {
    return template`<nav>
        <button @click="${() => player.getMoves()}">Get moves</button>
        <button @click="${() => player.restart()}">Restart</button>
        <p>Moves left: ${() => player.movesLeft.value}</p>
    </nav>`
}