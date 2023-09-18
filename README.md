# picgen

A simple placeholder image generator

## Usage

### API

```ts
import { generate } from "https://deno.land/x/picgen/mod.tsx";

await generate(); // generates default SVG
await generate({ width: 600, color: "teal" }); // generates SVG with custom parameters
```

### Online

Deployed at https://picgen.deno.dev. Configurable via path/search params:

- https://picgen.deno.dev/600
- https://picgen.deno.dev/600x400?bgcolor=green&text=Hey👋
