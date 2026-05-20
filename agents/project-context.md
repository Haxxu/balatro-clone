# Project Context

## Current Goal

Build the first app flow for a browser-based Balatro-inspired Angular game:

1. App boot
2. Loading page
3. Main menu
4. Game page placeholder

The immediate focus is architecture and flow correctness, not gameplay implementation yet.

## Immediate Milestones

1. Finalize boot routing so `/` redirects to `/loading`, with lazy-loaded routes for `/loading`, `/menu`, and `/game`.
2. Implement a real preload pipeline that loads settings, checks save metadata, and preloads important images.
3. Build the main menu with `New Run`, `Continue`, and music controls.
4. Add a simple game page placeholder to prove page flow and routing.
5. Keep gameplay systems out of components until the shell flow is stable.

## Questions To Answer During Development

- Which parts will match Balatro closely and which parts will be original?
- Will the run be stored locally only, or synced to a backend later?
- Will animation be CSS-first or canvas/WebGL-assisted?
- How should seeded randomness be exposed for replay and debugging?

## Technical Direction

- Angular standalone components.
- Feature-first folder structure.
- Signals for view state and computed values.
- RxJS for persistence, effects, timers, and async orchestration.
- Pure game-engine modules under a framework-agnostic `core` area.
- Tailwind CSS for page UI.
- Static assets stored in `public/assets` and referenced in the browser as `/assets/...`.

## First App Flow

- `app.html` should contain only `<router-outlet></router-outlet>`.
- Routes should use lazy-loaded standalone pages.
- `/` redirects to `/loading`.
- `/loading` runs preload and navigates to `/menu` on success.
- `/menu` is the first user interaction page and owns music start controls.
- `/game` is a placeholder page for now and only proves the route transition works.
- Wildcard routes should redirect back to `/loading`.

## Preload Architecture

- `PreloadService` is `providedIn: 'root'`.
- `PreloadService` owns a private signal state and exposes a readonly signal plus computed helpers like `isLoading`, `isSuccess`, and `isError`.
- Loading state shape:
  - `status`: `idle | loading | success | error`
  - `currentStepLabel`
  - `progress` from `0` to `100`
  - optional `errorMessage`
- Preload steps for the first flow:
  1. Load settings
  2. Check save metadata
  3. Load important images
  4. Optionally preload small SFX later
- The loading screen should be real architecture, not fake-only UI.
- Small artificial delay is acceptable for settings/save checks so the loading screen does not flash too quickly.

## Save And Audio Rules

- `SaveService` currently only checks local storage metadata for key `balatro-angular-clone.save`.
- Keep save metadata lightweight for now:
  - `exists`
  - optional `version`
  - optional `savedAt`
- Do not preload the main theme during the loading page.
- `AudioService` should lazy-create an `HTMLAudioElement` for the main theme only after user interaction.
- Browser autoplay restrictions are expected, so play attempts should catch failures and `console.warn`.
- Main menu should provide a user-click control such as `Enable Music` or `Play/Pause Music`.

## Asset Notes

- Source asset files live under `public/assets/...`.
- Runtime asset URLs must use `/assets/...`.
- Initial manifest direction:
  - one main theme mp3
  - important UI images for loading and menu
  - optional empty SFX list during early flow work
