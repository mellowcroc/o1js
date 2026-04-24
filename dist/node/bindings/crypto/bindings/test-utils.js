import { equivalent } from '../../../lib/testing/equivalent.js';
export { equivalentRecord };
function equivalentRecord(t, s, specs) {
    for (let key in specs) {
        let spec = specs[key];
        if (spec === undefined)
            continue;
        equivalent(spec)(t[key], s[key], key);
    }
}
//# sourceMappingURL=test-utils.js.map