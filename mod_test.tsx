import { assertMatch } from "https://deno.land/std@0.201.0/assert/mod.ts";

import { generate } from "./mod.tsx";

Deno.test("generates svg & its elements", async () => {
  const result = await generate();

  assertMatch(result, /<svg[^>]*>/);
  assertMatch(result, /<rect[^>]*>/);
  assertMatch(result, /<text[^>]*>/);
});

Deno.test("generates with default width and height", async () => {
  const result = await generate();

  assertMatch(result, /width="200"/);
  assertMatch(result, /height="200"/);
  assertMatch(result, /viewBox="0 0 200 200"/);
});

Deno.test("generates with custom width and height", async () => {
  const result = await generate({ width: 300, height: 400 });

  assertMatch(result, /width="300"/);
  assertMatch(result, /height="400"/);
  assertMatch(result, /viewBox="0 0 300 400"/);
});

Deno.test("generates with custom text", async () => {
  const result = await generate({ text: "hello" });
  assertMatch(result, /hello/);
});

Deno.test("generates with custom font", async () => {
  const result = await generate({ font: "Arial" });
  assertMatch(result, /font-family="Arial"/);
});

Deno.test("generates with custom color", async () => {
  const result = await generate({ color: "red" });
  assertMatch(result, /fill="red"/);
});

Deno.test("generates with custom background color", async () => {
  const result = await generate({ bgcolor: "orange" });
  assertMatch(result, /fill="orange"/);
});
