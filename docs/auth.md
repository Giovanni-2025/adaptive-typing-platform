# Authentication and authorisation

**Status: required behaviour and implementation checklist; no implementation verified.** Source: SRS SYS-1–9 and SYS-48–49. Route examples live in the [API contract](api-contract.md); cross-cutting protections live in [security](security.md).

## Account lifecycle

1. Public registration validates email/password and always creates a Student. Ignore submitted roles.
2. Store a bcrypt password hash and a hashed, one-time, expiring email-verification token. Support rate-limited resend.
3. Login requires verified email and an active account. Return a public user DTO and set an httpOnly authentication cookie; never return the token as browser application state.
4. Authenticate every protected request, checking JWT validity, server-side revocation, active account, role and resource ownership.
5. Logout revokes the current session and clears its cookie with matching scope attributes.
6. Reset requests return the same public response for existing and unknown emails. A valid single-use reset updates the password and revokes all sessions.
7. Deactivation and deletion revoke all sessions. Recheck account/session state on subsequent requests; clearing a browser cookie alone is insufficient.

## Authorisation boundaries

Students access their own sessions, statistics and certificates. Admin routes require the Admin role server-side and audit material actions. Public verification returns only approved certificate fields. Frontend guards improve navigation but cannot grant access. Protect creation of additional admins and prevent removing the last active admin.

## Decide before implementation

- Revocation design: server-side session records or equivalent effective strategy; JWT claims and lookup rules.
- Password policy, bcrypt cost, token/session lifetimes and resend throttles.
- Normalised-email rules and handling of duplicate/unverified accounts.
- Cookie name/path/domain/SameSite settings, deployment origins and concrete CSRF mechanism.
- First-admin provisioning and credential handoff without committed credentials.

httpOnly reduces direct token theft through JavaScript reads; it does not eliminate XSS or CSRF. Apply HTTPS/Secure in production, an explicit cookie policy, origin validation and the chosen CSRF protection.

## Acceptance evidence

Verify unverified/deactivated login rejection, expiration/reuse of email tokens, identical reset-request responses, logout/reset revocation, ignored registration roles, student-to-admin denial, cross-user resource denial and CSRF rejection. Include account deletion and the last-admin safeguard. Record evidence in [testing](testing.md).
