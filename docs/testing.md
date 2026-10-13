# Testing and acceptance

**Status: verification plan; no application checks have been executed as part of documentation work.** Use [setup](setup.md) for verified commands when available and SRS sections 8–10 and 15 for acceptance rules.

## Test layers

| Layer | Highest-value checks |
| --- | --- |
| Pure unit tests | Replay, scoring denominators, timing, accuracy gate, missing evidence, mastery/review, feasible fallback |
| Database integration | Ownership, atomic rollback, duplicate submission, concurrent updates, unique rewards, revocation, deletion |
| Browser flow | Register/verify → type → official result; focus/pause, restart, deadline, accessibility and network retry |
| Content validation | Word/group/theme references, allowed alphabet, coverage feasibility, blocked text and cache versions |
| Performance | SRS workload and reference environment; warm/cold results separately |

## Fixed scoring examples

Use server-reconstructed counts. These examples illustrate SRS formulas; do not replace them with a library's different WPM convention.

| Case | Inputs | Expected result |
| --- | --- | --- |
| Perfect timed minute | `I=C=B=F=100`, `M=1` | Gross/net 20 WPM; both accuracies 100% |
| Corrected mistakes | `I=110`, `C=100`, `B=F=100`, `M=1` | Gross/net 20; raw about 90.91%; final 100% |
| Five remaining errors | `I=B=100`, `C=F=95`, `M=1` | Gross 20; net 15; both accuracies 95% |
| Unattempted timed suffix | 500 assigned characters; `I=C=B=F=100`, `M=1` | Same as perfect minute; suffix is not an error |
| No printable attempts | `I=B=0` | Accuracy unavailable; no reward/certificate |

Add event-level fixtures for backspace at position zero, incorrect inserts, Shift, held-key repeats, equal timestamps, invalid sequence numbers, pauses, post-deadline events and text exhaustion. Check unrounded threshold comparisons and differences between learning and test modes.

## Acceptance evidence register

For each implemented requirement, add a row or link to a tracked test. Do not mark an entire SYS range passed from one happy-path test.

| SYS ID | Scenario | Test/manual procedure | Result/date | Evidence/owner |
| --- | --- | --- | --- | --- |
| SYS-46 | Lost response, identical retry | TBD | Not run | TBD |
| SYS-47 | Two sessions update the same student | TBD | Not run | TBD |
| SYS-48 | Reset/deactivation invalidates old session | TBD | Not run | TBD |

Expand to cover all requirements before release. Use a dedicated test database with a positive identity check before any reset. Never run destructive test setup against shared development or production data.

## Adaptive evaluation

Compare adaptive and fixed-curriculum policies with identical initial profiles, equal practice budgets and a common held-out assessment. Separate tuning from reporting profiles; run multiple random seeds and report variability. Include novices, slow-accurate, fast-inaccurate and uneven-key typists. Do not build an improvement model that rewards adaptation by definition.

Report simulator assumptions, metrics, seeds, configuration versions and limitations. Simulations validate behaviour under assumptions, not faster human learning. A consented volunteer pilot can provide usability and limited learning evidence; document sample size and duration. Confirm whether the course requires a trained model before finalising evaluation.
