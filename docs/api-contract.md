# API contract

**Status: DRAFT, version 0.1, 13 October 2026. No phase contract is approved and no endpoint is verified.** This is a concrete starting proposal for the phase meeting, not a claim about current routes. Required behaviour comes from the [SRS](srs.md).

## Conventions to agree

Proposed base path: `/api/v1`. JSON bodies and responses; UTC ISO-8601 strings for server dates, milliseconds for event times, WPM as numbers and accuracy percentages in `[0,100]`. Unknown metrics are `null`, not zero or 100. IDs are opaque strings. Authentication uses a cookie, not a JSON bearer token. Apply the selected CSRF mechanism to state-changing authenticated routes.

The team must agree pagination, body limits, identifier format, CSRF transport, expiry/timing tolerances, rounding for display, canonical submission hashing and complete schemas before the relevant phase. Shared Zod schemas will enforce the agreed shapes; these examples are not substitutes for schemas.

Proposed error envelope:

```json
{
  "error": {
    "code": "SESSION_CONFLICT",
    "message": "This session already has a different submitted result.",
    "requestId": "example-request-id",
    "retryable": false
  }
}
```

Proposed statuses: 400 malformed input, 401 unauthenticated, 403 forbidden/CSRF failure, 404 unavailable resource, 409 conflicting state, 422 invalid exercise submission, 429 rate limit, 503 temporary dependency failure. Never expose stack traces or another user's resource details. Agree whether inaccessible owned resources uniformly return 404 to limit disclosure.

## Route inventory

All names are proposed; freeze routes and full shapes per phase, not all at once.

| Method/path (under base path) | Access | Input/output intent |
| --- | --- | --- |
| `POST /auth/register` | Public, rate-limited | Email/password → verification-needed acknowledgement |
| `POST /auth/verify-email` | Public, rate-limited | One-time token → acknowledgement |
| `POST /auth/resend-verification` | Public, rate-limited | Email → safe acknowledgement |
| `POST /auth/login` | Public, rate-limited | Email/password → public user DTO + cookie |
| `POST /auth/logout` | Authenticated | Revoke current session, clear cookie |
| `GET /auth/me` | Authenticated | Public user DTO |
| `POST /auth/forgot-password` | Public, rate-limited | Email → same acknowledgement whether account exists or not |
| `POST /auth/reset-password` | Public, rate-limited | Token/new password → acknowledgement; revoke sessions |
| `PATCH /users/me` | Owner | Allowlisted profile/preferences fields → updated DTO |
| `DELETE /users/me` | Owner | Deletion confirmation contract TBD → completion/status |
| `POST /sessions` | Student | Mode/options → server assignment |
| `POST /sessions/:id/submit` | Owner | Events/finish time → official result |
| `POST /sessions/:id/abandon` | Owner | Mark abandoned; no rewards |
| `GET /sessions/:id` | Owner | Status or saved official result |
| `GET /sessions` | Owner | Paginated history; filters TBD |
| `GET /path` | Student | Keyboard state, due reviews and next activity/reason |
| `GET /progress` | Student | Mode-aware trends and key heat map |
| `GET /gamification` | Student | XP, level, goals, streak and badges |
| `GET /certificates` | Owner | Certificate list |
| `GET /certificates/:id/pdf` | Owner | Downloadable PDF |
| `GET /certificates/verify/:code` | Public | Approved public fields/status only |
| `/forum/*` | Student; public reading TBD | Threads, posts, accepted answer and reports; exact routes TBD |
| `/admin/*` | Admin | Users, content, settings, analytics, moderation, certificates and audit; exact routes TBD |

Outside the base path: proposed `GET /health/live` and `GET /health/ready`. Placement, review and both test types share `/sessions`; mode selects behaviour. No Google-login endpoint.

## Initial JSON examples

### Login

Request to `POST /auth/login`:

```json
{"email":"student@example.com","password":"example-only-not-a-real-password"}
```

Proposed 200 response (authentication cookie is set separately):

```json
{"user":{"id":"example-user","displayName":"Layla","role":"student","emailVerified":true}}
```

### Start

Request to `POST /sessions`:

```json
{"mode":"practice"}
```

Proposed mode values: `placement`, `lesson`, `practice`, `review`, `timed`, `certified`. Timed mode requests `durationSeconds` from the allowed set. Certified duration comes from approved server policy; the client cannot choose certificate thresholds. Theme options, restart replacement and start-request retry behaviour must be agreed before integration.

Illustrative 201 assignment response:

```json
{
  "sessionId": "example-session",
  "mode": "practice",
  "text": "asdf asdf asdf",
  "textSource": "fallback",
  "issuedAt": "2026-10-13T10:00:00Z",
  "expiresAt": "2026-10-13T10:30:00Z",
  "versions": {"scoring":"example-v1","engine":"example-v1","settings":"example-settings"},
  "rules": {"canPause":true,"focusLoss":"pause","durationSeconds":null}
}
```

The example's expiry and short text are illustrative, not adopted policy or production content. The server stores the effective target, exact text and complete scoring settings regardless of which fields the client needs to display.

### Submit

Illustrative **event-shape fragment**, not a complete valid session submission:

```json
{
  "events": [
    {"seq":0,"type":"insert","t":0,"char":"a"},
    {"seq":1,"type":"insert","t":210,"char":"x"},
    {"seq":2,"type":"backspace","t":400},
    {"seq":3,"type":"insert","t":610,"char":"s"},
    {"seq":4,"type":"pause","t":800},
    {"seq":5,"type":"resume","t":1800}
  ],
  "finishTimeMs": 2400
}
```

Only insert carries `char`; pause/resume are valid only in allowed modes. The actual submitted log must meet the assignment's completion rules. `finishTimeMs` measures elapsed time from the first insert; server replay derives active time using permitted pause spans. Do not send an authoritative score, expected key or correctness flag.

Illustrative result shape, independent of the short assignment and event fragment above:

```json
{
  "sessionId": "example-completed-session",
  "status": "completed",
  "metrics": {"grossWpm":20,"netWpm":20,"rawAccuracy":100,"finalAccuracy":100,"activeDurationMs":60000},
  "rewards": [],
  "nextActivity": {"mode":"practice","reason":"More evidence is needed before mastery."},
  "certificate": null
}
```

An identical accepted retry returns the same saved result without side effects; differing resubmission returns a conflict. Agree concrete key-breakdown, reward-event IDs, next-activity payload and certificate DTOs before integration. Clients must deduplicate already-presented reward events.

## Phase agreement record

Fill this for each phase and retain previous agreements when evolving the contract:

| Field | Value |
| --- | --- |
| Phase / contract version | TBD |
| Status | Draft |
| Scope and SYS IDs | TBD |
| Endpoint schemas and positive/error examples | TBD |
| Auth/ownership, limits and retry rules | TBD |
| Frontend/backend owners and reviewers | TBD |
| Agreement date / decision link | TBD |
| Compatibility/migration plan | TBD |
| Verification evidence | Not run |

Before marking agreed, settle required/optional/null fields, time units, permission checks, error codes, pagination, duplicate/concurrent behaviour and matching mocks. A breaking change needs coordination and an updated decision/contract, not a silent field rename.
