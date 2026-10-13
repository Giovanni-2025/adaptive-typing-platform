# TypeFlow design specification — template

**Status: TEMPLATE / NOT APPROVED.** No visual identity, palette, typography, page layout or motion system has been selected. Fill this file during design work; a blank field is not permission to invent a permanent design decision.

Owner: TBD · Review date: TBD · Design reference/Figma link: TBD

## Requirements already fixed

These come from the [SRS](docs/srs.md), not a chosen visual style:

- Clear typing focus, accessible keyboard navigation and visible focus indicators.
- Correct/wrong/upcoming characters distinguished by more than colour.
- Large-text option and reduced-pressure mode; hiding the timer does not pause scoring.
- Readable contrast and understandable loading, empty, error and success states.
- Desktop typing with a physical keyboard; non-typing pages should work on narrow screens.
- Label provisional/live scores and official results clearly; certificates say unproctored.

## Visual direction

| Decision | Value | Rationale/reference |
| --- | --- | --- |
| Product name/logo | TBD | TBD |
| Tone and visual references | TBD | TBD |
| Light/dark themes | TBD | TBD |
| Navigation and page shell | TBD | TBD |
| Density and content width | TBD | TBD |

## Token worksheet

| Token group | Values to decide |
| --- | --- |
| Colour | Background, surface, text, muted text, border, accent, success, error, focus |
| Typography | UI and typing fonts, fallback fonts, sizes, line heights, weights |
| Spacing/layout | Spacing scale, container sizes, breakpoints |
| Shape/elevation | Radii, borders, shadows |
| Motion | Durations, easing, reduced-motion behaviour |

All values: **TBD**. Check typing-character alignment and readability before choosing a typing font.

## Component and screen worksheet

For each component record default, hover, focus, disabled, loading and error states where applicable. Start with buttons, inputs, alerts, cards, dialogs, navigation, keyboard keys and typing-character states.

For each screen record:

- Name and linked SRS requirement/use case: TBD
- Primary user action and information hierarchy: TBD
- Wireframe/design reference: TBD
- Loading, empty, error, success and permission-denied states: TBD
- Keyboard/focus behaviour and narrow-screen behaviour: TBD
- Copy, accessibility checks and acceptance evidence: TBD

Use the SRS page inventory for coverage. Start with typing, results and the student dashboard, then accounts, progress, forum and administration.

## Approval and implementation

- [ ] Direction and reference screens reviewed by the team.
- [ ] Tokens and component states specified.
- [ ] Accessibility and typing legibility checked.
- [ ] Responsive rules and edge states reviewed.
- [ ] Decision recorded with owner/date and affected screens.

Approval: TBD. Until then, label experiments as prototypes; do not call them the final design system.
