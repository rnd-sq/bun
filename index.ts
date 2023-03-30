import Stric from "@stricjs/kit";
import { PageRouter } from "@stricjs/arrow";

// This is a shorthand call, use all the options in ./src/stric.config.json
Stric.boot(new PageRouter({
    loader: { ".ttf": "file" }
}));

// Log app mode
console.log("App is running in", Bun.env.NODE_ENV || "development", "mode.");
