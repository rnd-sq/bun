import Stric from "@stricjs/kit";
import { PageRouter } from "@stricjs/arrow";
import { plugin } from "bun";

// Ignore mp3
plugin({
    setup(builder) {
        builder.onLoad({ filter: /\.mp3$/ }, () => ({
            exports: { "default": "" },
            loader: "object"
        }));
    },
})

// This is a shorthand call, use all the options in ./src/stric.config.json
Stric.boot(new PageRouter({
    loader: { 
        ".ttf": "file",
        ".mp3": "file"
    }
}));

// Log app mode
console.log("App is running in", Bun.env.NODE_ENV || "development", "mode.");
