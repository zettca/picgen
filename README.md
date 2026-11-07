# picgen

A simple placeholder image generator

## Usage

### API

```ts
import { generate } from "./src/picgen.ts";

await generate(); // generates default SVG
await generate({ width: 600, color: "teal" }); // generates SVG with custom parameters
```

### Online

Deployed at https://picgen.zettca.xyz. Configurable via path/search params:

- https://picgen.zettca.xyz/600
- https://picgen.zettca.xyz/600x400?bgcolor=green&text=Hey👋

## Development

Requires Node.js 22.18+ (runs TypeScript natively, no build step).

```sh
pnpm install
pnpm dev     # start the Node server with watch mode (PORT defaults to 8000)
pnpm test    # run tests
pnpm check   # type-check
```

## Deployment

The Hono app in `src/app.ts` is runtime-agnostic and is the entry point for both targets:
`src/server.ts` serves it on Node, and `wrangler.jsonc` configures Cloudflare Workers.

Deploy by connecting the repo to Cloudflare Workers Builds (Workers & Pages → Create → Import a repository).
Cloudflare runs `wrangler deploy` on each push, so Wrangler isn't a project dependency.
