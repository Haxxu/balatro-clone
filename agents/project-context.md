# Project Context

## Current Goal

Build a web-based Balatro clone in Angular. The current UI milestone is the first start screen layout with placeholder visuals.

## Immediate Milestones

1. Create the title screen, profile entry point, and main menu layout.
2. Add core data models for cards, hands, jokers, consumables, tags, blinds, and run state.
3. Implement hand evaluation and scoring resolution as pure functions.
4. Add shop, deck, discard, and round flow state machines.
5. Replace placeholder art with final assets when available.

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
