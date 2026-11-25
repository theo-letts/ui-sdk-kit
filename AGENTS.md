# ui-sdk-kit

A design kit for apps built on UI SDK (`@ui-sdk/react`, by Vercel Labs). It
uses UI SDK's own default stylesheet, `@ui-sdk/core/web.css`, and re-points its
tokens so the result looks like ui-sdk.dev.

## Layout

- `kit/ui-sdk-kit.css` is the kit. It is the only file another project needs
  besides UI SDK itself. `kit/README.md` is its install guide. Projects fetch
  it from `https://raw.githubusercontent.com/theo-letts/ui-sdk-kit/main/kit/ui-sdk-kit.css`,
  so the repository must stay public and the file must stay at that path.
- `src/` is a specimen page that imports the kit the way a project would and
  renders every part it covers, in both schemes.
- `scripts/contrast.mjs` reads the `light-dark(#hex, #hex)` tokens out of the
  kit and checks the pairs it lists.

## Commands

```bash
npm run dev        # the specimen page
npm run contrast   # contrast gate over the kit's tokens
npm run ci         # types, contrast, format, build: run before committing
```

## Rules

- The kit layers over web.css; it does not fork it. Change a token before
  writing a rule, and write a rule only for something web.css has no token for.
- Keep colour tokens as hex inside `light-dark()`. The contrast script only
  reads that form, and a token it cannot read is a token it cannot check.
- Scope every element rule with `:where()` or `:not([data-slot])`. web.css is in
  the `ui-sdk` layer, so an unlayered rule here beats it outright.
- UI SDK is beta. The version is pinned in `package.json`. When bumping it, run
  the specimen and look at every panel and popup in both schemes, because a
  token or slot name can move without a type error.
- Bump `--kit-version` in the kit when its tokens or rules change.

Values were taken from ui-sdk.dev on 2026-11-25: Geist and Geist Mono, radius
0, canvas `#f8f8f8`, ink `#0a0a0a`, blue `#006bff`, display h1 at weight 450
and -0.045em.
