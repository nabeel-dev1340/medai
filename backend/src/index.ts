import { Hono } from "hono";
import { logger } from "hono/logger";
import router from "./router";

const app = new Hono();

app.use(logger());

app.basePath("/api").route("/", router);

export default app;
