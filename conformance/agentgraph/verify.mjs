// Zero-dependency conformance check for the AgentGraph action_ref-v1 vector set.
// Recomputes every action_ref and reproduces the draft's Appendix A Vector 1. Run: node verify.mjs
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
const fx = JSON.parse(readFileSync(new URL('./action-ref-v1-vectors.json', import.meta.url)));
const jcs = o => '{' + Object.keys(o).sort().map(k => JSON.stringify(k)+':'+JSON.stringify(o[k])).join(',') + '}';
const ar = p => createHash('sha256').update(jcs({agent_id:p.agent_id,action_type:p.action_type,scope:p.scope,timestamp:p.timestamp})).digest('hex');
let pass=0, fail=0; const ok=(c,m)=>{c?pass++:(fail++,console.log('  ✗',m));};
const a = fx.spec_anchor;
ok(ar(a.preimage)===a.action_ref, 'spec anchor recompute');
ok(a.action_ref==='fdd7f810499f06be24355ca8e2bfb8c4b965cc80c838f41fa074683443d89f5a', 'spec anchor == draft Appendix A Vector 1');
for (const v of fx.vectors) ok(ar(v.preimage)===v.action_ref, v.name);
console.log(fail===0 ? `\n✓ ${pass}/${pass+fail} action_ref vectors reproduce (incl. draft Appendix A Vector 1)` : `\n✗ ${fail} failed`);
process.exit(fail?1:0);
