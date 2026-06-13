# AgentGraph — `action_ref-v1` conformance set

An independent author-set of conformance vectors for
[`draft-giskard-aeoess-action-ref` §3](../../draft-giskard-aeoess-action-ref-00.txt),
contributed by AgentGraph (`agentgraph-co/agentgraph`).

**Derivation:** `action_ref = lowercase-hex(SHA-256(JCS({agent_id, action_type, scope, timestamp})))`
— RFC 8785 JCS, timestamp in RFC 3339 millisecond string form.

```
node verify.mjs
✓ 7/7 action_ref vectors reproduce (incl. draft Appendix A Vector 1)
```

- The set's **spec anchor reproduces the draft's Appendix A Vector 1 byte-for-byte**
  (`fdd7f810…`), independently re-deriving it with the `rfc8785` Python library + Node
  built-ins — a second implementation lineage agreeing with the reference.
- Coverage includes the empty-scope-distinct-from-absent edge (§3.1) and a `did:key`
  self-certifying agent_id.
- The `payment-charge` vector's `action_ref` is **identical** to the one carried in
  AgentGraph's v0.4 `pre-execution-verdict-v0` verifier fixture, where it is also
  byte-matched across the haroldmalikfrimpong-ops / evidai / azender1 payment seam — so
  this derivation is exercised live across ecosystems, not just specified.
