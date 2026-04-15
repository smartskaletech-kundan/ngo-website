# Project Guidance

## User Preferences

- Strict adherence to design system: Forest Green #2E7D32, Light Green #A5D6A7, Earth Brown #6D4C41, Soft Cream #F9F6F0
- No Inter/Roboto fonts — use Playfair Display for headings, DM Sans for body, Noto Sans Devanagari for Hindi
- Premium NGO aesthetic with glassmorphism, organic wave dividers, and micro-animations
- All 12 pages fully built with no deferral
- Secretary photo uses circular crop, displayed naturally without overlays
- Hindi text must render correctly with Noto Sans Devanagari

## Verified Commands

**Frontend** (run from `src/frontend/`):

- **install**: `pnpm install --prefer-offline`
- **typecheck**: `pnpm typecheck`
- **lint fix**: `pnpm fix`
- **build**: `pnpm build`

**Backend** (run from `src/backend/`):

- **install**: `mops install`
- **typecheck**: `mops check --fix`
- **build**: `mops build`

**Backend and frontend integration** (run from root):

- **generate bindings**: `pnpm bindgen` This step is necessary to ensure the frontend can call the backend methods.

## Learnings

- Use `@tanstack/react-router` (not react-router-dom) for routing — createRootRoute + createRoute pattern
- Tailwind custom colors like `bg-forest-green-800` need to be defined in tailwind.config.js under `extend.colors`
- NGO design: OKLCH vars mapped from hex — Forest Green #2E7D32 = oklch(0.46 0.14 145)
- Secretary image copied from .platform/attachments/ to src/frontend/public/assets/secretary.jpeg
- Biome linter requires: button type="button", fieldset+legend for radio groups, role="button" → use actual `<button>` elements, aria-hidden on decorative SVGs
