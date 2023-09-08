import { generate } from "./mod.tsx";

Deno.serve(async (req) => {
  const { searchParams } = new URL(req.url);
  const params = Object.fromEntries(searchParams.entries());

  const headers: HeadersInit = {
    "Content-Type": "image/svg+xml",
  };

  return new Response(await generate(params), { headers });
});
