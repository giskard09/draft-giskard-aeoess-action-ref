# Changelog

## draft-etcheverry-action-ref-01

- 2026-07-10 — Added signer-independence invariant to "authorization_ref Derivation"
  (4th invariant): the signer of the Decision record MUST be independent of the
  actor/executor, before the outcome is final. Distinguishes signer-of-record from
  recompute-and-certify/referee (after the fact), which does not satisfy the
  invariant. Text-only clarification of existing normative intent, no behavior
  change. Origin: distinction surfaced in A2A#1734 (babyblueviper1). Commit b60469e.
