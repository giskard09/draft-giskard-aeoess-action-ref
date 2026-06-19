# APS, action_ref-v1 conformance set

An independent author-set of conformance vectors for `draft-giskard-aeoess-action-ref` Section 3
(../../draft-giskard-aeoess-action-ref-00.txt), contributed by APS by AEOESS (`agent-passport-system`).

Derivation: `action_ref = lowercase-hex(SHA-256(JCS({agent_id, action_type, scope, timestamp})))`,
RFC 8785 JCS, timestamp in RFC 3339 millisecond string form.

Run:

    node verify.mjs

Relationship to the draft. The construction is defined by `draft-giskard-aeoess-action-ref` Section 3.
This directory is APS's independent implementation of that construction, recorded alongside the AgentGraph
set in `../agentgraph`. It is an implementation record, not a comparison surface, and neither set is the
origin of the spec. APS keeps its canonical vectors in its own home, the APS SDK
(`agent-passport-system/conformance/action-ref-v1`) and the APS conformance suite
(`aeoess/aps-conformance-suite`); the set here is reproduced verbatim from that home.

What it shows. The spec anchor reproduces the draft's Appendix A Vector 1 byte-for-byte (`fdd7f810...`),
independently of the AgentGraph set in `../agentgraph`, so two implementations agree on the draft's
canonical vector. The set also carries the empty-scope edge (scope distinct from absent), a Unicode
preimage (JCS hashes the literal UTF-8 bytes with no normalization), millisecond rollover edges, and
reject vectors that fail the timestamp grammar rather than being coerced.
