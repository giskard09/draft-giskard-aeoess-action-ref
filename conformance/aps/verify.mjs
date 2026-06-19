// Zero-dependency conformance check for the APS action_ref-v1 vector set.
// Recomputes every action_ref, reproduces the draft's Appendix A Vector 1, and
// confirms each reject vector fails the canonical timestamp grammar. Run: node verify.mjs
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
const fx = JSON.parse(readFileSync(new URL('./action-ref-v1-vectors.json', import.meta.url)));
const jcs = o => '{' + Object.keys(o).sort().map(k => JSON.stringify(k)+':'+JSON.stringify(o[k])).join(',') + '}';
const ar = p => createHash('sha256').update(jcs({agent_id:p.agent_id,action_type:p.action_type,scope:p.scope,timestamp:p.timestamp})).digest('hex');
const STRICT = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}Z$/;
let pass=0, fail=0; const ok=(c,m)=>{c?pass++:(fail++,console.log('  FAIL',m));};
const a = fx.spec_anchor;
ok(ar(a.preimage)===a.action_ref, 'spec anchor recompute');
ok(a.action_ref==='fdd7f810499f06be24355ca8e2bfb8c4b965cc80c838f41fa074683443d89f5a', 'spec anchor == draft Appendix A Vector 1');
for (const v of fx.vectors) {
  if (v.reject) ok(!STRICT.test(v.input.timestamp), v.id + ' rejects non-canonical timestamp');
  else { ok(ar(v.input)===v.expected, v.id); if (v.canonical) ok(jcs(v.input)===v.canonical, v.id + ' canonical bytes'); }
}
console.log(fail===0 ? ('PASS ' + pass + '/' + (pass+fail) + ' APS action_ref-v1 checks (incl. draft Appendix A Vector 1)') : ('FAIL ' + fail + ' of ' + (pass+fail)));
process.exit(fail?1:0);
