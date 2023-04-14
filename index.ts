import Stric from "@stricjs/kit";
import { PageRouter, ignoreExts } from "@stricjs/arrow";
import Bun from "bun";

// Ignore mp3
Bun.plugin(ignoreExts("mp3"));

// This is a shorthand call, use all the options in ./src/stric.config.json
Stric.boot(new PageRouter({
    loader: { 
        ".ttf": "file",
        ".mp3": "file"
    }
}));

// Log app mode
console.log("App is running in", Bun.env.NODE_ENV || "development", "mode.");
