import { Hono } from "https://deno.land/x/hono@v3.6.3/mod.ts";
import { logger } from "https://deno.land/x/hono@v3.6.3/middleware.ts";

import { generate } from "./mod.tsx";

const safeNum = (str: string) => {
  const num = Number(str);
  return Number.isNaN(num) ? 32 : num;
};

const app = new Hono();

app.use("*", logger());

app.get("/", (ctx) => ctx.redirect("/420"));

app.get("/:dims{[0-9]+(?:x[0-9]+)?}", async (ctx) => {
  const dims = ctx.req.param("dims") || "200x200";
  const [width, height] = dims.split("x").map(safeNum);
  const params = { width, height, ...ctx.req.query() };

  ctx.header("Content-Type", "image/svg+xml");
  return ctx.body(await generate(params));
});

app.get("/*", async (ctx) => {
  const params = { ...ctx.req.query() };

  ctx.header("Content-Type", "image/svg+xml");
  return ctx.body(await generate(params));
});

Deno.serve(app.fetch);
