# Project Progress

Last updated: 2026-05-20

## Current Phase

Building the first application flow for the Angular Balatro-inspired project:

1. App boot
2. Loading page
3. Main menu
4. Game page placeholder

Gameplay systems are intentionally not started yet.

## Completed

- Angular app is using standalone-style page structure with lazy route entries in `src/app/app.routes.ts`.
- Root app template is reduced to router outlet flow.
- Shared project direction has been updated in `agents/project-context.md`.
- `SaveService` now exposes:
  - `getSaveMetadata()`
  - `hasSave()`
- `SaveService` also stores audio preferences in local storage:
  - `musicEnabled`
  - `musicVolume`
- `PreloadService` now uses signal state with:
  - `status`
  - `currentStepLabel`
  - `progress`
  - optional `errorMessage`
- `PreloadService` now focuses on:
  1. settings
  2. save metadata
  3. important images
- Main theme audio is not preloaded in preload flow.
- Asset manifest now separates:
  - `MAIN_THEME`
  - `IMAGE_ASSETS`
  - `SFX_ASSETS`
- Main menu now has:
  - `New Run`
  - `Continue`
  - `Enable Music`
  - `Play/Disable Music`
  - volume slider
- Audio preferences are restored from local storage through `AudioService`.

## In Progress

- Main menu audio controls are implemented, but the project has not been compile-verified in this Codex shell.
- Loading page exists, but should still be checked end-to-end against the latest preload service changes.

## Next Steps

1. Verify `LoadingPage` end-to-end:
   - calls `preload()` on init
   - shows progress properly
   - shows retry on error
   - navigates to `/menu` on success
2. Compile and run the project on the local machine that has Node/npm available.
3. Fix any Angular template or standalone-component errors from the first real build.
4. Make `GamePage` a cleaner placeholder page for route verification.
5. Decide whether music state should mean:
   - user preference
   - current playback state
   - or both with separate signals later

## Known Risks / Notes

- This Codex environment could not run `npm`, so recent edits were not build-tested here.
- Some earlier files in the repo use non-standard naming like `loading-page.ts` instead of `loading-page.component.ts`. This is acceptable if kept consistent.
- Standalone component metadata should be verified during build if Angular reports missing `standalone: true` or missing `imports`.
- Asset paths must always use browser paths like `/assets/...`, not `public/assets/...`.
- Music should only start from explicit user interaction because browser autoplay may block playback.

## Local Storage Keys

- Save metadata:
  - `balatro-angular-clone.save`
- Settings:
  - `balatro-angular-clone.settings`

## Files Most Recently Updated

- `agents/project-context.md`
- `src/app/core/storage/save.types.ts`
- `src/app/core/storage/save.service.ts`
- `src/app/core/preload/preload.type.ts`
- `src/app/core/preload/preload.service.ts`
- `src/app/core/assets/asset-manifest.ts`
- `src/app/core/audio/audio.service.ts`
- `src/app/shell/pages/main-menu-page/main-menu-page.ts`
- `src/app/shell/pages/main-menu-page/main-menu-page.html`

## Resume Prompt For Future Codex Sessions

Use this when switching PCs:

“Read `agents/project-context.md` and `agents/project-progress.md` first. Continue the Angular Balatro-inspired app shell flow. Do not start gameplay yet. Focus on verifying Loading -> Menu -> Game placeholder, fixing compile/runtime issues, and keeping audio user-initiated with local-storage-backed settings.”
