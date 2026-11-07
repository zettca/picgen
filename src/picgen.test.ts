import assert from "node:assert/strict";
import { test } from "node:test";

import { generate } from "./picgen.ts";

test("generates svg & its elements", async () => {
  const result = await generate();

  assert.match(result, /<svg[^>]*>/);
  assert.match(result, /<rect[^>]*>/);
  assert.match(result, /<text[^>]*>/);
});

test("generates with default width and height", async () => {
  const result = await generate();

  assert.match(result, /width="200"/);
  assert.match(result, /height="200"/);
  assert.match(result, /viewBox="0 0 200 200"/);
});

test("generates with custom width and height", async () => {
  const result = await generate({ width: 300, height: 400 });

  assert.match(result, /width="300"/);
  assert.match(result, /height="400"/);
  assert.match(result, /viewBox="0 0 300 400"/);
});

test("generates with custom text", async () => {
  const result = await generate({ text: "hello" });
  assert.match(result, /hello/);
});

test("generates with custom font", async () => {
  const result = await generate({ font: "Arial" });
  assert.match(result, /font-family="Arial"/);
});

test("generates with custom color", async () => {
  const result = await generate({ color: "red" });
  assert.match(result, /fill="red"/);
});

test("generates with custom background color", async () => {
  const result = await generate({ bgcolor: "orange" });
  assert.match(result, /fill="orange"/);
});

test("escapes untrusted input", async () => {
  const result = await generate({ text: "<script>", color: '"x' });

  assert.doesNotMatch(result, /<script>/);
  assert.match(result, /&lt;script&gt;/);
  assert.match(result, /fill="&quot;x"/);
});
