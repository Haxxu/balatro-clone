# Balatro Clone Systems Overview

## Core Loop

1. Start a run.
2. Enter a blind.
3. Draw a hand from the current deck.
4. Select cards to play or discard.
5. Evaluate the poker hand.
6. Apply card modifiers, enhancements, seals, editions, vouchers, jokers, and tags in a deterministic order.
7. Award chips and multiplier.
8. Repeat until the blind target is reached or the player busts.
9. Move to shop, upgrades, and the next ante.

## Key Systems

### Cards

- Base playing card data: rank, suit, chip value, face-card flags.
- Active modifiers: enhancement, edition, seal, debuffs, temporary effects.
- Zone tracking: draw pile, hand, played cards, discard pile, destroyed, deck list.

### Poker Hands

- Hand detector should produce both the best hand and all matching patterns needed by jokers.
- The detector should be pure and independent from Angular.
- Keep a structured explanation payload for UI previews, logs, and debugging.

### Jokers

- Jokers are persistent rule modifiers with triggers.
- A joker may affect hand detection, played-card scoring, held-card bonuses, shop pricing, economy, discards, or round rules.
- The safest implementation is event-based:
  - `onRoundStart`
  - `onHandDrawn`
  - `onCardScored`
  - `onHandScored`
  - `onDiscard`
  - `onBlindDefeated`
  - `onShopEntered`
- Joker interactions should never directly mutate UI state. They should emit effects into the scoring engine or run-state reducer.

### Tags

- Tags are usually run-level modifiers that alter upcoming rewards, shop state, blind flow, or economy.
- Tags should live beside run progression rather than inside hand scoring.
- Treat them like passive global rules with clear trigger points.

### Blinds And Antes

- Blind definitions should contain target score, reward, modifiers, and boss-rule hooks.
- Boss blind effects should plug into the same event system as jokers, but with higher precedence where required.

### Economy

- Money gain and spend rules should be isolated from scoring math.
- Shop inventory generation should be seed-driven so runs are reproducible.

## Recommended Resolution Order

1. Determine playable hand and selected cards.
2. Build a scoring context.
3. Apply pre-score rule modifiers that can alter the hand.
4. Score cards one by one if needed.
5. Apply hand-level joker and passive modifiers.
6. Apply final multiplier/chip caps or special-case overrides.
7. Persist the final result plus a verbose breakdown for UI.

## Data Modeling Advice

- Prefer discriminated unions for joker effect types.
- Avoid storing derived values in state when they can be computed.
- Keep randomness behind a small interface so replay/debug tools can use seeded output.
- Store effect logs as structured entries, not plain strings.
