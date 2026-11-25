# ui-sdk-kit

A design kit for [UI SDK](https://ui-sdk.dev): its React components and its
default stylesheet, tuned to look like the UI SDK website.

The kit is one file, [`kit/ui-sdk-kit.css`](kit/ui-sdk-kit.css). Install
instructions are in [`kit/README.md`](kit/README.md). The short version:

```bash
npm install @ui-sdk/react @ui-sdk/core
curl -fsSo src/ui-sdk-kit.css https://raw.githubusercontent.com/theo-letts/ui-sdk-kit/main/kit/ui-sdk-kit.css
```

Then import `@ui-sdk/core/web.css` and the kit, in that order, and load Geist
and Geist Mono.

```bash
npm install
npm run dev   # specimen page: tokens, type and every covered component
npm run ci    # types, contrast, format, build
```
