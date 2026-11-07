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

Deployed at https://picgen.zettca.deno.net. Configurable via path/search params:

- https://picgen.zettca.deno.net/600
- https://picgen.zettca.deno.net/600x400?bgcolor=green&text=Hey👋

## Development

Requires Node.js 22.18+ (runs TypeScript natively, no build step).

```sh
pnpm install
pnpm dev     # start the server with watch mode (PORT defaults to 8000)
pnpm test    # run tests
pnpm check   # type-check
```
