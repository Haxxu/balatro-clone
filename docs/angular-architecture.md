# Angular Structure Recommendations

## High-Signal Architecture

Use a split between UI shell code and game-engine code:

- `src/app/core/`: framework-agnostic game logic, models, scoring, RNG, serializers.
- `src/app/features/run/`: active run screen, hand area, deck area, joker area, HUD.
- `src/app/features/menu/`: title screen, profile, collection, options.
- `src/app/features/shop/`: shop UI and purchase flows.
- `src/app/shared/`: shared UI primitives and small reusable helpers.

## Signals First

Use signals for:

- local component state
- selected cards
- hover/focus state
- visible panels
- derived score previews

Use computed signals for:

- current hand summary
- whether a play is valid
- displayed money, ante, and blind progress

Use signal stores or service-owned signals for:

- current run state
- deck state
- shop state
- profile meta

## RxJS Where It Helps

Use RxJS for:

- save/load streams
- timers and animation sequencing
- keyboard input streams
- background music and SFX coordination
- async asset loading
- future backend sync

Do not wrap every state value in RxJS if a signal is enough. Prefer bridging async streams into signals at the edge.

## State Management Best Practice

- Start with service-owned signals and pure reducers before introducing a large store library.
- Keep mutations centralized in domain services such as `RunStateService` or `ShopStateService`.
- Use immutable updates for top-level run state snapshots.
- Keep derived selectors as computed signals rather than duplicating data.
- If the app grows large, consider `@ngrx/signals` or a signal-store pattern, not classic boilerplate-heavy reducers by default.

## Suggested Folder Sketch

```text
src/app/
  core/
    models/
    scoring/
    rules/
    rng/
    persistence/
  features/
    menu/
    run/
    shop/
    collection/
    options/
  shared/
    ui/
    pipes/
    utils/
```

## Testing Strategy

- Unit test all scoring and rule engines in `core/`.
- Component test menu and run UI separately.
- Keep replay fixtures for joker interaction edge cases.
- Add snapshot-like structured expectations for score breakdowns instead of relying only on totals.
