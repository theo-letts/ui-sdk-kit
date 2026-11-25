# UI SDK kit

The look of [ui-sdk.dev](https://ui-sdk.dev) for apps built on
[UI SDK](https://github.com/vercel-labs/ui). Geist, square corners, ink strokes
on a pale canvas, one blue.

It is one stylesheet, `ui-sdk-kit.css`, and it sits on top of UI SDK's own
default style, `@ui-sdk/core/web.css`. web.css draws the components; this file
re-points web.css's `--ui-*` tokens at the website's values and adds the
page-level pieces the site has: display headings, mono eyebrows, the large
call-to-action button, panels and grid paper.

## Install

**1. The components.** React 19 or newer.

```bash
npm install @ui-sdk/react @ui-sdk/core
```

UI SDK is in beta and its APIs still move. Pin the version you tested against.

**2. The stylesheet.** Fetch the current `ui-sdk-kit.css` into the project:

```bash
curl -fsSo src/ui-sdk-kit.css https://raw.githubusercontent.com/theo-letts/ui-sdk-kit/main/kit/ui-sdk-kit.css
```

That is a copy, and it will not update by itself; run the command again to
take a newer kit. The repository has to stay public for the URL to work
without signing in. Then import it after web.css, in your global stylesheet.

Plain CSS:

```css
@layer ui-sdk;
@import "@ui-sdk/core/web.css";
@import "./ui-sdk-kit.css";
```

Tailwind v4, where both go in the components layer so a utility class still
wins:

```css
@layer ui-sdk;
@import "tailwindcss";
@import "@ui-sdk/core/web.css" layer(components);
@import "./ui-sdk-kit.css" layer(components);
```

`@layer ui-sdk;` has to come first. UI SDK injects a little CSS at runtime into
a layer of that name, and declaring it first keeps it beneath your own styles.

**3. The fonts.** Geist and Geist Mono, both on Google Fonts:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap"
  rel="stylesheet"
/>
```

## Using it

Components need nothing extra. Import a part and it is styled:

```tsx
import { Button } from "@ui-sdk/react/button";

<Button>Default</Button>
<Button data-variant="solid">Solid</Button>
<Button data-variant="accent">Accent</Button>   {/* the kit's blue */}
<Button data-variant="destructive">Delete</Button>
<Button data-variant="solid" data-size="lg">Read the docs</Button>
```

`solid` and `destructive` come from web.css. `accent` and `data-size="lg"` come
from this kit, and work on any trigger web.css styles as a button: dialog,
popover, menu and the rest.

Page pieces are classes, because they are not UI SDK parts:

| Class         | What it is                                                   |
| ------------- | ------------------------------------------------------------ |
| `kit-lede`    | The large paragraph under a display heading                  |
| `kit-eyebrow` | Small upper-case Geist Mono label                            |
| `kit-panel`   | White surface with a pale outline, for sitting on the canvas |
| `kit-grid`    | Graph-paper surface, for a stage that shows one component    |

`h1` to `h4` take the site's display type with no class. Links that are not UI
SDK parts get a pale underline that darkens on hover.

### Light and dark

web.css follows the system. To pin a scheme, set `data-color-scheme="light"` or
`"dark"` on `<html>`; remove it to follow the system again. That attribute also
flips the `--lightningcss-*` pair, because Vite and Next lower `light-dark()`
into variables that `color-scheme` alone does not switch.

## Things that are true and easy to get wrong

- **web.css is required.** This file has no component rules of its own beyond
  two button variants. Without web.css you get colours and type, and every
  component renders unstyled.
- **Anything unlayered beats all of web.css.** web.css lives in the `ui-sdk`
  cascade layer, so an unlayered rule wins whatever its specificity. Scope your
  own element rules with `:not([data-slot])`, as this file does, or you will
  restyle UI SDK parts by accident: a navigation-menu link is an `<a>`.
- **Style parts through `data-slot` and state attributes**, such as
  `[data-slot="select-trigger"][data-open]`. They are UI SDK's public styling
  seam. Generated ids are not.
- **Contrast is checked.** Every text pair clears 4.5:1 and every control stroke
  and focus ring 3:1, in both modes; `npm run contrast` in the kit repo proves
  it. If you add a colour, check it against its surface. Blue text (`--kit-accent`)
  clears 4.5:1 on white surfaces, not on the canvas, so keep it on panels.
- **The focus ring is blue, 2px.** web.css's own ring is a pale 4px halo at
  about 1.2:1 against white, below the 3:1 floor, so the kit replaces it.

Check `--kit-version` in a project's copy against this file's to see whether
it is behind.
