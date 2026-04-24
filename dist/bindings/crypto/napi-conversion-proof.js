import { MlArray, MlOption, MlTuple } from '../../lib/ml/base.js';
import { fieldFromRust, fieldToRust, fieldsFromRustFlat, fieldsToRustFlat, } from './bindings/conversion-base.js';
export { napiProofConversion };
const fieldToRust_ = (x) => fieldToRust(x);
const proofEvaluationsToRust = mapProofEvaluations(fieldToRust_);
const proofEvaluationsFromRust = mapProofEvaluations(fieldFromRust);
const pointEvalsOptionToRust = mapPointEvalsOption(fieldToRust_);
const pointEvalsOptionFromRust = mapPointEvalsOption(fieldFromRust);
function napiProofConversion(napi, core) {
    return {
        fp: proofConversionPerField(core.fp, {
            ProverCommitments: napi.WasmFpProverCommitments,
            OpeningProof: napi.WasmFpOpeningProof,
            VecVec: napi.WasmVecVecFp,
            ProverProof: napi.WasmFpProverProof,
            LookupCommitments: napi.WasmFpLookupCommitments,
            RuntimeTable: napi.WasmFpRuntimeTable,
            RuntimeTableCfg: napi.WasmPastaFpRuntimeTableCfg,
            LookupTable: napi.WasmPastaFpLookupTable,
        }),
        fq: proofConversionPerField(core.fq, {
            ProverCommitments: napi.WasmFqProverCommitments,
            OpeningProof: napi.WasmFqOpeningProof,
            VecVec: napi.WasmVecVecFq,
            ProverProof: napi.WasmFqProverProof,
            LookupCommitments: napi.WasmFqLookupCommitments,
            RuntimeTable: napi.WasmFqRuntimeTable,
            RuntimeTableCfg: napi.WasmPastaFqRuntimeTableCfg,
            LookupTable: napi.WasmPastaFqLookupTable,
        }),
    };
}
function proofConversionPerField(core, { ProverCommitments, OpeningProof, VecVec, ProverProof, LookupCommitments, RuntimeTable, RuntimeTableCfg, LookupTable, }) {
    function commitmentsToRust(commitments) {
        let wComm = core.polyCommsToRust(commitments[1]);
        let zComm = core.polyCommToRust(commitments[2]);
        let tComm = core.polyCommToRust(commitments[3]);
        let lookup = MlOption.mapFrom(commitments[4], lookupCommitmentsToRust);
        return new ProverCommitments(wComm, zComm, tComm, lookup);
    }
    function commitmentsFromRust(commitments) {
        console.log('DEBUG commitmentsFromRust called');
        console.log('DEBUG commitmentsFromRust: commitments.w_comm:', commitments.w_comm);
        console.log('DEBUG commitmentsFromRust: w_comm length:', commitments.w_comm?.length);
        let wComm = core.polyCommsFromRust(commitments.w_comm);
        console.log('DEBUG commitmentsFromRust: wComm length after conversion:', wComm.length);
        let zComm = core.polyCommFromRust(commitments.z_comm);
        console.log('DEBUG commitmentsFromRust: zComm:', zComm);
        let tComm = core.polyCommFromRust(commitments.t_comm);
        console.log('DEBUG commitmentsFromRust: tComm:', tComm);
        console.log('DEBUG commitmentsFromRust: commitments.lookup:', commitments.lookup);
        // Normalize optional lookup to an MlOption; mapTo expects a value or undefined.
        let lookup = MlOption.mapTo(commitments.lookup ?? undefined, (lk) => lookupCommitmentsFromRust(lk));
        console.log('DEBUG commitmentsFromRust: lookup after conversion:', lookup);
        console.log('DEBUG commitmentsFromRust: returning');
        return [0, wComm, zComm, tComm, lookup];
    }
    function lookupCommitmentsToRust(lookup) {
        let sorted = core.polyCommsToRust(lookup[1]);
        let aggreg = core.polyCommToRust(lookup[2]);
        let runtime = MlOption.mapFrom(lookup[3], core.polyCommToRust);
        return new LookupCommitments(sorted, aggreg, runtime);
    }
    function lookupCommitmentsFromRust(lookup) {
        console.log('DEBUG lookupCommitmentsFromRust: lookup:', lookup);
        if (lookup == null) {
            console.log('DEBUG lookupCommitmentsFromRust: returning undefined');
            return undefined;
        }
        console.log('DEBUG lookupCommitmentsFromRust: lookup.sorted:', lookup.sorted);
        console.log('DEBUG lookupCommitmentsFromRust: lookup.aggreg:', lookup.aggreg);
        console.log('DEBUG lookupCommitmentsFromRust: lookup.runtime:', lookup.runtime);
        let sorted = core.polyCommsFromRust(lookup.sorted);
        let aggreg = core.polyCommFromRust(lookup.aggreg);
        let runtime = MlOption.mapTo(lookup.runtime, core.polyCommFromRust);
        console.log('DEBUG lookupCommitmentsFromRust: returning');
        return [0, sorted, aggreg, runtime];
    }
    function openingProofToRust(proof) {
        let [_, [, ...lr], delta, z1, z2, sg] = proof;
        // We pass l and r as separate vectors over the FFI
        let l = [0];
        let r = [0];
        for (let [, li, ri] of lr) {
            l.push(li);
            r.push(ri);
        }
        return new OpeningProof(core.pointsToRust(l), core.pointsToRust(r), core.pointToRust(delta), fieldToRust(z1), fieldToRust(z2), core.pointToRust(sg));
    }
    function openingProofFromRust(proof) {
        console.log('DEBUG openingProofFromRust: proof:', proof);
        console.log('DEBUG openingProofFromRust: proof.lr_0:', proof?.lr_0);
        console.log('DEBUG openingProofFromRust: proof.lr_1:', proof?.lr_1);
        let [, ...l] = core.pointsFromRust(proof.lr_0);
        let [, ...r] = core.pointsFromRust(proof.lr_1);
        console.log('DEBUG openingProofFromRust: l.length:', l.length, 'r.length:', r.length);
        let n = l.length;
        if (n !== r.length)
            throw Error('openingProofFromRust: l and r length mismatch.');
        let lr = l.map((li, i) => [0, li, r[i]]);
        let delta = core.pointFromRust(proof.delta);
        let z1 = fieldFromRust(proof.z1);
        let z2 = fieldFromRust(proof.z2);
        let sg = core.pointFromRust(proof.sg);
        console.log('DEBUG openingProofFromRust: returning');
        return [0, [0, ...lr], delta, z1, z2, sg];
    }
    function runtimeTableToRust([, id, data]) {
        return new RuntimeTable(id, core.vectorToRust(data));
    }
    function runtimeTableCfgToRust([, id, firstColumn]) {
        return new RuntimeTableCfg(id, core.vectorToRust(firstColumn));
    }
    function lookupTableToRust([, id, [, ...data]]) {
        let n = data.length;
        let wasmData = new VecVec(n);
        for (let i = 0; i < n; i++) {
            wasmData.push(fieldsToRustFlat(data[i]));
        }
        return new LookupTable(id, wasmData);
    }
    return {
        proofToRust([, public_evals, proof]) {
            let commitments = commitmentsToRust(proof[1]);
            let openingProof = openingProofToRust(proof[2]);
            // NAPI expects proof evaluations as a plain object (camelCase keys), not an OCaml tuple.
            // This matches the `#[napi(object)] Wasm*ProofEvaluationsObject` accepted by Rust via
            // `FromNapiValue` for `Wasm*ProofEvaluations`.
            const evalsTuple = proofEvaluationsToRust(proof[3]);
            const publicEvalsTuple = pointEvalsOptionToRust(public_evals);
            const pointEvalsTupleToObject = (pe) => {
                const [, zeta, zeta_omega] = pe;
                const zetaOmega = MlArray.from(zeta_omega);
                return {
                    zeta: MlArray.from(zeta),
                    // napi-rs `#[napi(object)]` usually exposes `zeta_omega` as `zetaOmega`, but
                    // accept both spellings to be robust across versions/bindings.
                    zetaOmega,
                    zeta_omega: zetaOmega,
                };
            };
            const optionPointEvalsToObject = (opt) => {
                if (opt == null || opt === 0)
                    return undefined;
                return pointEvalsTupleToObject(opt[1]);
            };
            const publicObj = publicEvalsTuple === 0 ? undefined : pointEvalsTupleToObject(publicEvalsTuple[1]);
            const [, w, z, s, coefficients, genericSelector, poseidonSelector, completeAddSelector, mulSelector, emulSelector, endomulScalarSelector, rangeCheck0Selector, rangeCheck1Selector, foreignFieldAddSelector, foreignFieldMulSelector, xorSelector, rotSelector, lookupAggregation, lookupTable, lookupSorted, runtimeLookupTable, runtimeLookupTableSelector, xorLookupSelector, lookupGateLookupSelector, rangeCheckLookupSelector, foreignFieldMulLookupSelector,] = evalsTuple;
            const evalsActual = {
                public: publicObj,
                w: w.slice(1).map(pointEvalsTupleToObject),
                z: pointEvalsTupleToObject(z),
                s: s.slice(1).map(pointEvalsTupleToObject),
                coefficients: coefficients.slice(1).map(pointEvalsTupleToObject),
                // Include both camelCase and snake_case keys so `#[napi(object)]` decoding works
                // regardless of whether the binding expects renaming.
                genericSelector: pointEvalsTupleToObject(genericSelector),
                generic_selector: pointEvalsTupleToObject(genericSelector),
                poseidonSelector: pointEvalsTupleToObject(poseidonSelector),
                poseidon_selector: pointEvalsTupleToObject(poseidonSelector),
                completeAddSelector: pointEvalsTupleToObject(completeAddSelector),
                complete_add_selector: pointEvalsTupleToObject(completeAddSelector),
                mulSelector: pointEvalsTupleToObject(mulSelector),
                mul_selector: pointEvalsTupleToObject(mulSelector),
                emulSelector: pointEvalsTupleToObject(emulSelector),
                emul_selector: pointEvalsTupleToObject(emulSelector),
                endomulScalarSelector: pointEvalsTupleToObject(endomulScalarSelector),
                endomul_scalar_selector: pointEvalsTupleToObject(endomulScalarSelector),
                rangeCheck0Selector: optionPointEvalsToObject(rangeCheck0Selector),
                range_check0_selector: optionPointEvalsToObject(rangeCheck0Selector),
                rangeCheck1Selector: optionPointEvalsToObject(rangeCheck1Selector),
                range_check1_selector: optionPointEvalsToObject(rangeCheck1Selector),
                foreignFieldAddSelector: optionPointEvalsToObject(foreignFieldAddSelector),
                foreign_field_add_selector: optionPointEvalsToObject(foreignFieldAddSelector),
                foreignFieldMulSelector: optionPointEvalsToObject(foreignFieldMulSelector),
                foreign_field_mul_selector: optionPointEvalsToObject(foreignFieldMulSelector),
                xorSelector: optionPointEvalsToObject(xorSelector),
                xor_selector: optionPointEvalsToObject(xorSelector),
                rotSelector: optionPointEvalsToObject(rotSelector),
                rot_selector: optionPointEvalsToObject(rotSelector),
                lookupAggregation: optionPointEvalsToObject(lookupAggregation),
                lookup_aggregation: optionPointEvalsToObject(lookupAggregation),
                lookupTable: optionPointEvalsToObject(lookupTable),
                lookup_table: optionPointEvalsToObject(lookupTable),
                lookupSorted: MlArray.from(lookupSorted).map((opt) => opt === 0 ? undefined : pointEvalsTupleToObject(opt[1])),
                lookup_sorted: MlArray.from(lookupSorted).map((opt) => opt === 0 ? undefined : pointEvalsTupleToObject(opt[1])),
                runtimeLookupTable: optionPointEvalsToObject(runtimeLookupTable),
                runtime_lookup_table: optionPointEvalsToObject(runtimeLookupTable),
                runtimeLookupTableSelector: optionPointEvalsToObject(runtimeLookupTableSelector),
                runtime_lookup_table_selector: optionPointEvalsToObject(runtimeLookupTableSelector),
                xorLookupSelector: optionPointEvalsToObject(xorLookupSelector),
                xor_lookup_selector: optionPointEvalsToObject(xorLookupSelector),
                lookupGateLookupSelector: optionPointEvalsToObject(lookupGateLookupSelector),
                lookup_gate_lookup_selector: optionPointEvalsToObject(lookupGateLookupSelector),
                rangeCheckLookupSelector: optionPointEvalsToObject(rangeCheckLookupSelector),
                range_check_lookup_selector: optionPointEvalsToObject(rangeCheckLookupSelector),
                foreignFieldMulLookupSelector: optionPointEvalsToObject(foreignFieldMulLookupSelector),
                foreign_field_mul_lookup_selector: optionPointEvalsToObject(foreignFieldMulLookupSelector),
            };
            let ftEval1 = fieldToRust(proof[4]);
            let public_ = fieldsToRustFlat(proof[5]);
            let [, ...prevChallenges] = proof[6];
            let n = prevChallenges.length;
            let prevChallengeScalars = new VecVec(n);
            let prevChallengeCommsMl = [0];
            for (let [, scalars, comms] of prevChallenges) {
                prevChallengeScalars.push(fieldsToRustFlat(scalars));
                prevChallengeCommsMl.push(comms);
            }
            let prevChallengeComms = core.polyCommsToRust(prevChallengeCommsMl);
            try {
                return new ProverProof(commitments, openingProof, evalsActual, ftEval1, public_, prevChallengeScalars, prevChallengeComms);
            }
            catch (err) {
                const w0 = evalsActual?.w?.[0];
                const z = evalsActual?.z;
                console.error('napi-conversion-proof: ProverProof ctor failed', {
                    err,
                    evalsKeys: Object.keys(evalsActual ?? {}),
                    wIsArray: Array.isArray(evalsActual?.w),
                    wLen: evalsActual?.w?.length,
                    w0Keys: w0 ? Object.keys(w0) : undefined,
                    w0ZetaIsArray: Array.isArray(w0?.zeta),
                    w0ZetaOmegaIsArray: Array.isArray(w0?.zetaOmega),
                    zKeys: z ? Object.keys(z) : undefined,
                    zZetaIsArray: Array.isArray(z?.zeta),
                    zZetaOmegaIsArray: Array.isArray(z?.zetaOmega),
                    lookupSortedIsArray: Array.isArray(evalsActual?.lookupSorted),
                    lookupSortedLen: evalsActual?.lookupSorted?.length,
                });
                throw err;
            }
        },
        proofFromRust(wasmProof) {
            // If we received the full prover proof (with commitments field), use it directly.
            // Otherwise fall back to an older wrapper shape `{ proof, public_input }`.
            const innerProof = wasmProof && wasmProof.commitments ? wasmProof : (wasmProof.proof ?? wasmProof);
            console.log(1);
            let commitments = commitmentsFromRust(innerProof.commitments);
            console.log(2);
            let openingProof = openingProofFromRust(innerProof.proof);
            console.log(3);
            // NAPI returns `evals` as an object with getters; convert it into the OCaml tuple shape
            // expected by `proofEvaluationsFromRust`.
            const evalsSource = innerProof.evals;
            console.log(4);
            // Avoid `getNapi`/`requireNapi` helpers; access fields directly.
            const toArray = (value) => (value == null ? [] : Array.from(value));
            console.log(5);
            const toPointEvals = (pe) => {
                const zeta = MlArray.to(toArray(pe.zeta ?? pe.zeta_));
                const zetaOmega = MlArray.to(toArray(pe.zeta_omega ?? pe.zetaOmega ?? pe.zetaomega));
                return [0, zeta, zetaOmega];
            };
            console.log(6);
            const toMlOption = (value, f) => MlOption.mapTo(value ?? undefined, f);
            console.log(7);
            const publicEvalsBytes = toMlOption(evalsSource.public, toPointEvals);
            console.log(8);
            const publicEvals = pointEvalsOptionFromRust(publicEvalsBytes);
            console.log(7);
            const w = [0, ...toArray(evalsSource.w).map(toPointEvals)];
            console.log(8);
            const z = toPointEvals(evalsSource.z);
            console.log(9);
            const s = [0, ...toArray(evalsSource.s).map(toPointEvals)];
            console.log(10);
            const coefficients = [
                0,
                ...toArray(evalsSource.coefficients).map(toPointEvals),
            ];
            console.log(11);
            const evalsBytes = [
                0,
                w,
                z,
                s,
                coefficients,
                toPointEvals(evalsSource.generic_selector ?? evalsSource.genericSelector),
                toPointEvals(evalsSource.poseidon_selector ?? evalsSource.poseidonSelector),
                toPointEvals(evalsSource.complete_add_selector ?? evalsSource.completeAddSelector),
                toPointEvals(evalsSource.mul_selector ?? evalsSource.mulSelector),
                toPointEvals(evalsSource.emul_selector ?? evalsSource.emulSelector),
                toPointEvals(evalsSource.endomul_scalar_selector ?? evalsSource.endomulScalarSelector),
                toMlOption(evalsSource.range_check0_selector ?? evalsSource.rangeCheck0Selector, toPointEvals),
                toMlOption(evalsSource.range_check1_selector ?? evalsSource.rangeCheck1Selector, toPointEvals),
                toMlOption(evalsSource.foreign_field_add_selector ??
                    evalsSource.foreignFieldAddSelector, toPointEvals),
                toMlOption(evalsSource.foreign_field_mul_selector ??
                    evalsSource.foreignFieldMulSelector, toPointEvals),
                toMlOption(evalsSource.xor_selector ?? evalsSource.xorSelector, toPointEvals),
                toMlOption(evalsSource.rot_selector ?? evalsSource.rotSelector, toPointEvals),
                toMlOption(evalsSource.lookup_aggregation ?? evalsSource.lookupAggregation, toPointEvals),
                toMlOption(evalsSource.lookup_table ?? evalsSource.lookupTable, toPointEvals),
                [
                    0,
                    ...toArray(evalsSource.lookup_sorted ?? evalsSource.lookupSorted).map((x) => toMlOption(x, toPointEvals)),
                ],
                toMlOption(evalsSource.runtime_lookup_table ?? evalsSource.runtimeLookupTable, toPointEvals),
                toMlOption(evalsSource.runtime_lookup_table_selector ??
                    evalsSource.runtimeLookupTableSelector, toPointEvals),
                toMlOption(evalsSource.xor_lookup_selector ?? evalsSource.xorLookupSelector, toPointEvals),
                toMlOption(evalsSource.lookup_gate_lookup_selector ??
                    evalsSource.lookupGateLookupSelector, toPointEvals),
                toMlOption(evalsSource.range_check_lookup_selector ??
                    evalsSource.rangeCheckLookupSelector, toPointEvals),
                toMlOption(evalsSource.foreign_field_mul_lookup_selector ??
                    evalsSource.foreignFieldMulLookupSelector, toPointEvals),
            ];
            console.log(12);
            const evals = proofEvaluationsFromRust(evalsBytes);
            console.log(13);
            let ftEval1 = fieldFromRust(innerProof.ft_eval1);
            console.log(14);
            let public_ = fieldsFromRustFlat(innerProof.public_);
            console.log('DEBUG proofFromRust 15: public_');
            let prevChallengeScalars = innerProof.prev_challenges_scalars;
            console.log('DEBUG proofFromRust 16: prevChallengeScalars:', prevChallengeScalars);
            console.log('DEBUG proofFromRust 16b: innerProof.prev_challenges_comms:', innerProof.prev_challenges_comms);
            let [, ...prevChallengeComms] = core.polyCommsFromRust(innerProof.prev_challenges_comms);
            console.log('DEBUG proofFromRust 17: prevChallengeComms length:', prevChallengeComms.length);
            console.log('DEBUG proofFromRust 17b: prevChallengeComms has undefined?', prevChallengeComms.some((x) => x === undefined));
            let prevChallenges = prevChallengeComms.map((comms, i) => {
                let scalars = fieldsFromRustFlat(prevChallengeScalars.get(i));
                return [0, scalars, comms];
            });
            console.log('DEBUG proofFromRust 18: prevChallenges:', prevChallenges);
            let proof = [
                0,
                commitments,
                openingProof,
                evals,
                ftEval1,
                public_,
                [0, ...prevChallenges],
            ];
            console.log('DEBUG proofFromRust 19: returning proof');
            return [0, publicEvals, proof];
        },
        runtimeTablesToRust([, ...tables]) {
            return tables.map(runtimeTableToRust);
        },
        runtimeTableCfgsToRust([, ...tableCfgs]) {
            return tableCfgs.map(runtimeTableCfgToRust);
        },
        lookupTablesToRust([, ...tables]) {
            return tables.map(lookupTableToRust);
        },
    };
}
function createMapPointEvals(map) {
    return (evals) => {
        let [, zeta, zeta_omega] = evals;
        return [0, MlArray.map(zeta, map), MlArray.map(zeta_omega, map)];
    };
}
function mapPointEvalsOption(map) {
    return (evals) => MlOption.map(evals, createMapPointEvals(map));
}
function mapProofEvaluations(map) {
    const mapPointEvals = createMapPointEvals(map);
    const mapPointEvalsOption = (evals) => MlOption.map(evals, mapPointEvals);
    return function mapProofEvaluations(evals) {
        let [, w, z, s, coeffs, genericSelector, poseidonSelector, completeAddSelector, mulSelector, emulSelector, endomulScalarSelector, rangeCheck0Selector, rangeCheck1Selector, foreignFieldAddSelector, foreignFieldMulSelector, xorSelector, rotSelector, lookupAggregation, lookupTable, lookupSorted, runtimeLookupTable, runtimeLookupTableSelector, xorLookupSelector, lookupGateLookupSelector, rangeCheckLookupSelector, foreignFieldMulLookupSelector,] = evals;
        return [
            0,
            MlTuple.map(w, mapPointEvals),
            mapPointEvals(z),
            MlTuple.map(s, mapPointEvals),
            MlTuple.map(coeffs, mapPointEvals),
            mapPointEvals(genericSelector),
            mapPointEvals(poseidonSelector),
            mapPointEvals(completeAddSelector),
            mapPointEvals(mulSelector),
            mapPointEvals(emulSelector),
            mapPointEvals(endomulScalarSelector),
            mapPointEvalsOption(rangeCheck0Selector),
            mapPointEvalsOption(rangeCheck1Selector),
            mapPointEvalsOption(foreignFieldAddSelector),
            mapPointEvalsOption(foreignFieldMulSelector),
            mapPointEvalsOption(xorSelector),
            mapPointEvalsOption(rotSelector),
            mapPointEvalsOption(lookupAggregation),
            mapPointEvalsOption(lookupTable),
            MlArray.map(lookupSorted, mapPointEvalsOption),
            mapPointEvalsOption(runtimeLookupTable),
            mapPointEvalsOption(runtimeLookupTableSelector),
            mapPointEvalsOption(xorLookupSelector),
            mapPointEvalsOption(lookupGateLookupSelector),
            mapPointEvalsOption(rangeCheckLookupSelector),
            mapPointEvalsOption(foreignFieldMulLookupSelector),
        ];
    };
}
//# sourceMappingURL=napi-conversion-proof.js.map