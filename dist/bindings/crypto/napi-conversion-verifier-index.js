import { MlBool, MlOption } from '../../lib/ml/base.js';
import { fieldFromRust, fieldToRust } from './bindings/conversion-base.js';
export { napiVerifierIndexConversion };
function napiVerifierIndexConversion(napi, core) {
    return {
        fp: verifierIndexConversionPerField(napi, core.fp, {
            Domain: napi.WasmFpDomain,
            VerificationEvals: napi.WasmFpPlonkVerificationEvals,
            Shifts: napi.WasmFpShifts,
            VerifierIndex: napi.WasmFpPlonkVerifierIndex,
            LookupVerifierIndex: napi.WasmFpLookupVerifierIndex,
            LookupSelector: napi.WasmFpLookupSelectors,
        }),
        fq: verifierIndexConversionPerField(napi, core.fq, {
            Domain: napi.WasmFqDomain,
            VerificationEvals: napi.WasmFqPlonkVerificationEvals,
            Shifts: napi.WasmFqShifts,
            VerifierIndex: napi.WasmFqPlonkVerifierIndex,
            LookupVerifierIndex: napi.WasmFqLookupVerifierIndex,
            LookupSelector: napi.WasmFqLookupSelectors,
        }),
    };
}
function verifierIndexConversionPerField(napi, core, { Domain, VerificationEvals, Shifts, VerifierIndex, LookupVerifierIndex, LookupSelector, }) {
    function domainToRust([, logSizeOfGroup, groupGen]) {
        // In the NAPI backend these types are `#[napi(object)]`, i.e. plain JS objects
        // (not constructable classes).
        return {
            log_size_of_group: logSizeOfGroup,
            group_gen: fieldToRust(groupGen),
        };
    }
    function domainFromRust(domain) {
        return [0, domain.log_size_of_group, fieldFromRust(domain.group_gen)];
    }
    function verificationEvalsToRust(evals) {
        let sigmaComm = core.polyCommsToRust(evals[1]);
        let coefficientsComm = core.polyCommsToRust(evals[2]);
        let genericComm = core.polyCommToRust(evals[3]);
        let psmComm = core.polyCommToRust(evals[4]);
        let completeAddComm = core.polyCommToRust(evals[5]);
        let mulComm = core.polyCommToRust(evals[6]);
        let emulComm = core.polyCommToRust(evals[7]);
        let endomulScalarComm = core.polyCommToRust(evals[8]);
        let xorComm = MlOption.mapFrom(evals[9], core.polyCommToRust);
        let rangeCheck0Comm = MlOption.mapFrom(evals[10], core.polyCommToRust);
        let rangeCheck1Comm = MlOption.mapFrom(evals[11], core.polyCommToRust);
        let foreignFieldAddComm = MlOption.mapFrom(evals[12], core.polyCommToRust);
        let foreignFieldMulComm = MlOption.mapFrom(evals[13], core.polyCommToRust);
        let rotComm = MlOption.mapFrom(evals[14], core.polyCommToRust);
        return {
            sigma_comm: sigmaComm,
            coefficients_comm: coefficientsComm,
            generic_comm: genericComm,
            psm_comm: psmComm,
            complete_add_comm: completeAddComm,
            mul_comm: mulComm,
            emul_comm: emulComm,
            endomul_scalar_comm: endomulScalarComm,
            xor_comm: xorComm,
            range_check0_comm: rangeCheck0Comm,
            range_check1_comm: rangeCheck1Comm,
            foreign_field_add_comm: foreignFieldAddComm,
            foreign_field_mul_comm: foreignFieldMulComm,
            rot_comm: rotComm,
        };
    }
    function verificationEvalsFromRust(evals) {
        let mlEvals = [
            0,
            core.polyCommsFromRust(evals.sigma_comm),
            core.polyCommsFromRust(evals.coefficients_comm),
            core.polyCommFromRust(evals.generic_comm),
            core.polyCommFromRust(evals.psm_comm),
            core.polyCommFromRust(evals.complete_add_comm),
            core.polyCommFromRust(evals.mul_comm),
            core.polyCommFromRust(evals.emul_comm),
            core.polyCommFromRust(evals.endomul_scalar_comm),
            MlOption.mapTo(evals.xor_comm, core.polyCommFromRust),
            MlOption.mapTo(evals.range_check0_comm, core.polyCommFromRust),
            MlOption.mapTo(evals.range_check1_comm, core.polyCommFromRust),
            MlOption.mapTo(evals.foreign_field_add_comm, core.polyCommFromRust),
            MlOption.mapTo(evals.foreign_field_mul_comm, core.polyCommFromRust),
            MlOption.mapTo(evals.rot_comm, core.polyCommFromRust),
        ];
        return mlEvals;
    }
    function lookupVerifierIndexToRust(lookup) {
        let [, joint_lookup_used, lookup_table, selectors, table_ids, lookup_info, runtime_tables_selector,] = lookup;
        return {
            joint_lookup_used: MlBool.from(joint_lookup_used),
            lookup_table: core.polyCommsToRust(lookup_table),
            lookup_selectors: lookupSelectorsToRust(selectors),
            table_ids: MlOption.mapFrom(table_ids, core.polyCommToRust),
            lookup_info: lookupInfoToRust(lookup_info),
            runtime_tables_selector: MlOption.mapFrom(runtime_tables_selector, core.polyCommToRust),
        };
    }
    function lookupVerifierIndexFromRust(lookup) {
        let mlLookup = [
            0,
            MlBool(lookup.joint_lookup_used),
            core.polyCommsFromRust(lookup.lookup_table),
            lookupSelectorsFromRust(lookup.lookup_selectors),
            MlOption.mapTo(lookup.table_ids, core.polyCommFromRust),
            lookupInfoFromRust(lookup.lookup_info),
            MlOption.mapTo(lookup.runtime_tables_selector, core.polyCommFromRust),
        ];
        return mlLookup;
    }
    function lookupSelectorsToRust([, lookup, xor, range_check, ffmul,]) {
        return new LookupSelector(MlOption.mapFrom(xor, core.polyCommToRust), MlOption.mapFrom(lookup, core.polyCommToRust), MlOption.mapFrom(range_check, core.polyCommToRust), MlOption.mapFrom(ffmul, core.polyCommToRust));
    }
    function lookupSelectorsFromRust(selector) {
        const getField = (camel, snake) => selector[camel] ?? selector[snake];
        let lookup = MlOption.mapTo(getField('lookup', 'lookup'), core.polyCommFromRust);
        let xor = MlOption.mapTo(getField('xor', 'xor'), core.polyCommFromRust);
        let range_check = MlOption.mapTo(getField('rangeCheck', 'range_check'), core.polyCommFromRust);
        let ffmul = MlOption.mapTo(getField('ffmul', 'ffmul'), core.polyCommFromRust);
        return [0, lookup, xor, range_check, ffmul];
    }
    function lookupInfoToRust([, maxPerRow, maxJointSize, features]) {
        let [, patterns, joint_lookup_used, uses_runtime_tables] = features;
        let [, xor, lookup, range_check, foreign_field_mul] = patterns;
        return {
            max_per_row: maxPerRow,
            max_joint_size: maxJointSize,
            features: {
                patterns: {
                    xor: MlBool.from(xor),
                    lookup: MlBool.from(lookup),
                    range_check: MlBool.from(range_check),
                    foreign_field_mul: MlBool.from(foreign_field_mul),
                },
                joint_lookup_used: MlBool.from(joint_lookup_used),
                uses_runtime_tables: MlBool.from(uses_runtime_tables),
            },
        };
    }
    function lookupInfoFromRust(info) {
        let features = info.features;
        let patterns = features.patterns;
        let mlInfo = [
            0,
            info.max_per_row,
            info.max_joint_size,
            [
                0,
                [
                    0,
                    MlBool(patterns.xor),
                    MlBool(patterns.lookup),
                    MlBool(patterns.range_check),
                    MlBool(patterns.foreign_field_mul),
                ],
                MlBool(features.joint_lookup_used),
                MlBool(features.uses_runtime_tables),
            ],
        ];
        return mlInfo;
    }
    let self = {
        shiftsToRust([, ...shifts]) {
            let s = shifts.map((s) => fieldToRust(s));
            return { s0: s[0], s1: s[1], s2: s[2], s3: s[3], s4: s[4], s5: s[5], s6: s[6] };
        },
        shiftsFromRust(s) {
            let shifts = [s.s0, s.s1, s.s2, s.s3, s.s4, s.s5, s.s6];
            return [0, ...shifts.map(fieldFromRust)];
        },
        verifierIndexToRust(vk) {
            let domain = domainToRust(vk[1]);
            let maxPolySize = vk[2];
            let nPublic = vk[3];
            let prevChallenges = vk[4];
            let srs = vk[5];
            let evals = verificationEvalsToRust(vk[6]);
            let shifts = self.shiftsToRust(vk[7]);
            let lookupIndex = MlOption.mapFrom(vk[8], lookupVerifierIndexToRust);
            let zkRows = vk[9];
            return {
                domain,
                max_poly_size: maxPolySize,
                public: nPublic,
                public_: nPublic,
                prevChallenges,
                prev_challenges: prevChallenges,
                srs,
                evals,
                shifts,
                lookup_index: lookupIndex,
                lookupIndex: lookupIndex,
                zkRows,
                zk_rows: zkRows,
            };
        },
        verifierIndexFromRust(vk) {
            let mlVk = [
                0,
                domainFromRust(vk.domain),
                vk.max_poly_size,
                vk.public_,
                vk.prev_challenges,
                vk.srs,
                verificationEvalsFromRust(vk.evals),
                self.shiftsFromRust(vk.shifts),
                MlOption.mapTo(vk.lookup_index, lookupVerifierIndexFromRust),
                vk.zk_rows,
            ];
            return mlVk;
        },
    };
    return self;
}
//# sourceMappingURL=napi-conversion-verifier-index.js.map