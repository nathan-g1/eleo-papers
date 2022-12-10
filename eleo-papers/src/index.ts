import cors from 'cors';
import { json } from 'express';
import App from "./app";
import PaperController from "./controllers/paper";
import { ensureEnvVar } from "./utils/util";

const PORT = ensureEnvVar("PORT");

const controllers = [
    new PaperController()
];

const middlewares = [
    json(),
    cors()
];

// Create app
const app = new App({
    port: Number(PORT),
    middlewares,
    controllers
});

// Start the app
app.listen();
