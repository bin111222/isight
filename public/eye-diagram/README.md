# Eye diagram assets (optional)

Drop images here and wire them in `src/lib/eyeDiagramImages.ts` to make the **Understand Your Eye** section use your own layers.

## Aspect ratio: 3:2

All images should be **3:2** (e.g. 1200×800 or 900×600). The layout uses 3:2 containers so images fill their boxes with no letterboxing.

## Suggested files

| File | Use |
|------|-----|
| `base.webp` or `base.png` | Full eye diagram (3:2). Fills the left panel. |
| `cornea.webp` | Illustration for Cornea (3:2), shown in info panel when selected |
| `lens.webp` | Illustration for Lens (3:2) |
| `retina.webp` | Illustration for Retina (3:2) |
| `optic-nerve.webp` | Illustration for Optic nerve (3:2) |

## Wiring

In `src/lib/eyeDiagramImages.ts` set paths, for example:

- `base: "/eye-diagram/base.webp"`
- `parts.cornea: "/eye-diagram/cornea.webp"`
- etc.

Leave any value as `""` to keep the default SVG/circles for that part.
