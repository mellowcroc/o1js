/* tslint:disable */
/* eslint-disable */
export function caml_vesta_one(): WasmVestaGProjective;
export function caml_vesta_add(x: WasmVestaGProjective, y: WasmVestaGProjective): WasmVestaGProjective;
export function caml_vesta_sub(x: WasmVestaGProjective, y: WasmVestaGProjective): WasmVestaGProjective;
export function caml_vesta_negate(x: WasmVestaGProjective): WasmVestaGProjective;
export function caml_vesta_of_affine_coordinates(x: Uint8Array, y: Uint8Array): WasmVestaGProjective;
export function caml_vesta_affine_deep_copy(x: WasmGVesta): WasmGVesta;
export function caml_vesta_double(x: WasmVestaGProjective): WasmVestaGProjective;
export function caml_vesta_scale(x: WasmVestaGProjective, y: Uint8Array): WasmVestaGProjective;
export function caml_vesta_random(): WasmVestaGProjective;
export function caml_vesta_rng(i: number): WasmVestaGProjective;
export function caml_vesta_endo_base(): Uint8Array;
export function caml_vesta_endo_scalar(): Uint8Array;
export function caml_vesta_to_affine(x: WasmVestaGProjective): WasmGVesta;
export function caml_vesta_of_affine(x: WasmGVesta): WasmVestaGProjective;
export function caml_pallas_one(): WasmPallasGProjective;
export function caml_pallas_add(x: WasmPallasGProjective, y: WasmPallasGProjective): WasmPallasGProjective;
export function caml_pallas_sub(x: WasmPallasGProjective, y: WasmPallasGProjective): WasmPallasGProjective;
export function caml_pallas_negate(x: WasmPallasGProjective): WasmPallasGProjective;
export function caml_pallas_of_affine_coordinates(x: Uint8Array, y: Uint8Array): WasmPallasGProjective;
export function caml_pallas_affine_deep_copy(x: WasmGPallas): WasmGPallas;
export function caml_pallas_double(x: WasmPallasGProjective): WasmPallasGProjective;
export function caml_pallas_scale(x: WasmPallasGProjective, y: Uint8Array): WasmPallasGProjective;
export function caml_pallas_random(): WasmPallasGProjective;
export function caml_pallas_rng(i: number): WasmPallasGProjective;
export function caml_pallas_endo_base(): Uint8Array;
export function caml_pallas_endo_scalar(): Uint8Array;
export function caml_pallas_to_affine(x: WasmPallasGProjective): WasmGPallas;
export function caml_pallas_of_affine(x: WasmGPallas): WasmPallasGProjective;
export function fq_oracles_create(lgr_comm: Uint32Array, index: WasmFqPlonkVerifierIndex, proof: WasmFqProverProof): WasmFqOracles;
export function fq_oracles_dummy(): WasmFqOracles;
export function fq_oracles_deep_copy(x: WasmFqProverProof): WasmFqProverProof;
export function caml_pasta_fq_plonk_index_create(gates: WasmFqGateVector, public_: number, lookup_tables: Uint32Array, runtime_table_cfgs: Uint32Array, prev_challenges: number, srs: WasmFqSrs, lazy_mode: boolean): WasmPastaFqPlonkIndex;
export function caml_pasta_fq_plonk_index_serialize(index: WasmPastaFqPlonkIndex): string;
export function caml_pasta_fq_plonk_index_max_degree(index: WasmPastaFqPlonkIndex): number;
export function caml_pasta_fq_plonk_index_public_inputs(index: WasmPastaFqPlonkIndex): number;
export function caml_pasta_fq_plonk_index_domain_d1_size(index: WasmPastaFqPlonkIndex): number;
export function caml_pasta_fq_plonk_index_domain_d4_size(index: WasmPastaFqPlonkIndex): number;
export function caml_pasta_fq_plonk_index_domain_d8_size(index: WasmPastaFqPlonkIndex): number;
export function caml_pasta_fq_plonk_index_decode(bytes: Uint8Array, srs: WasmFqSrs): WasmPastaFqPlonkIndex;
export function caml_pasta_fq_plonk_index_encode(index: WasmPastaFqPlonkIndex): Uint8Array;
export function caml_pasta_fq_plonk_index_read(offset: number | null | undefined, srs: WasmFqSrs, path: string): WasmPastaFqPlonkIndex;
export function caml_pasta_fq_plonk_index_write(append: boolean | null | undefined, index: WasmPastaFqPlonkIndex, path: string): void;
export function initThreadPool(num_threads: number, worker_source: string): Promise<any>;
export function exitThreadPool(): Promise<any>;
export function wbg_rayon_start_worker(receiver: number): void;
export function caml_pasta_fp_poseidon_block_cipher(state: Uint8Array): Uint8Array;
export function caml_pasta_fq_poseidon_block_cipher(state: Uint8Array): Uint8Array;
export function caml_pasta_fq_plonk_proof_dummy(): WasmFqProverProof;
export function caml_pasta_fq_plonk_proof_deep_copy(x: WasmFqProverProof): WasmFqProverProof;
export function caml_pasta_fq_plonk_proof_create(index: WasmPastaFqPlonkIndex, witness: WasmVecVecFq, wasm_runtime_tables: Uint32Array, prev_challenges: Uint8Array, prev_sgs: Uint32Array): WasmFqProverProof;
export function caml_pasta_fq_plonk_proof_verify(index: WasmFqPlonkVerifierIndex, proof: WasmFqProverProof): boolean;
export function caml_pasta_fq_plonk_proof_batch_verify(indexes: Uint32Array, proofs: Uint32Array): boolean;
export function console_log(s: string): void;
export function create_zero_u32_ptr(): number;
/**
 * Free a pointer. This method is exported in the WebAssembly module to be used
 * on the JavaScript side, see `web-backend.js`.
 *
 * # Safety
 *
 * See
 * `<https://rust-lang.github.io/rust-clippy/master/index.html#not_unsafe_ptr_arg_deref>`
 */
export function free_u32_ptr(ptr: number): void;
/**
 * Set the value of a pointer. This method is exported in the WebAssembly
 * module to be used on the JavaScript side, see `web-backend.js`.
 *
 * # Safety
 *
 * See
 * `<https://rust-lang.github.io/rust-clippy/master/index.html#not_unsafe_ptr_arg_deref>`
 */
export function set_u32_ptr(ptr: number, arg: number): void;
/**
 * This method is exported in the WebAssembly to be used on the JavaScript
 * side, see `web-backend.js`.
 *
 * # Safety
 *
 * See
 * `<https://rust-lang.github.io/rust-clippy/master/index.html#not_unsafe_ptr_arg_deref>`
 */
export function wait_until_non_zero(ptr: number): number;
/**
 * This method is exported in the WebAssembly to check the memory used on the
 * JavaScript
 */
export function get_memory(): any;
/**
 * Returns the number of bytes used by the WebAssembly memory.
 */
export function get_memory_byte_length(): number;
export function caml_pasta_fp_plonk_index_create(gates: WasmFpGateVector, public_: number, lookup_tables: Uint32Array, runtime_table_cfgs: Uint32Array, prev_challenges: number, srs: WasmFpSrs, lazy_mode: boolean): WasmPastaFpPlonkIndex;
export function caml_pasta_fp_plonk_index_serialize(index: WasmPastaFpPlonkIndex): string;
export function caml_pasta_fp_plonk_index_max_degree(index: WasmPastaFpPlonkIndex): number;
export function caml_pasta_fp_plonk_index_public_inputs(index: WasmPastaFpPlonkIndex): number;
export function caml_pasta_fp_plonk_index_domain_d1_size(index: WasmPastaFpPlonkIndex): number;
export function caml_pasta_fp_plonk_index_domain_d4_size(index: WasmPastaFpPlonkIndex): number;
export function caml_pasta_fp_plonk_index_domain_d8_size(index: WasmPastaFpPlonkIndex): number;
export function caml_pasta_fp_plonk_index_decode(bytes: Uint8Array, srs: WasmFpSrs): WasmPastaFpPlonkIndex;
export function caml_pasta_fp_plonk_index_encode(index: WasmPastaFpPlonkIndex): Uint8Array;
export function caml_pasta_fp_plonk_index_read(offset: number | null | undefined, srs: WasmFpSrs, path: string): WasmPastaFpPlonkIndex;
export function caml_pasta_fp_plonk_index_write(append: boolean | null | undefined, index: WasmPastaFpPlonkIndex, path: string): void;
export function prover_to_json(prover_index: WasmPastaFpPlonkIndex): string;
export function caml_pasta_fp_plonk_gate_vector_create(): WasmFpGateVector;
export function caml_pasta_fp_plonk_gate_vector_add(v: WasmFpGateVector, gate: WasmFpGate): void;
export function caml_pasta_fp_plonk_gate_vector_get(v: WasmFpGateVector, i: number): WasmFpGate;
export function caml_pasta_fp_plonk_gate_vector_len(v: WasmFpGateVector): number;
export function caml_pasta_fp_plonk_gate_vector_wrap(v: WasmFpGateVector, t: Wire, h: Wire): void;
export function caml_pasta_fp_plonk_gate_vector_digest(public_input_size: number, v: WasmFpGateVector): Uint8Array;
export function caml_pasta_fp_plonk_circuit_serialize(public_input_size: number, v: WasmFpGateVector): string;
export function caml_pasta_fq_plonk_gate_vector_create(): WasmFqGateVector;
export function caml_pasta_fq_plonk_gate_vector_add(v: WasmFqGateVector, gate: WasmFqGate): void;
export function caml_pasta_fq_plonk_gate_vector_get(v: WasmFqGateVector, i: number): WasmFqGate;
export function caml_pasta_fq_plonk_gate_vector_len(v: WasmFqGateVector): number;
export function caml_pasta_fq_plonk_gate_vector_wrap(v: WasmFqGateVector, t: Wire, h: Wire): void;
export function caml_pasta_fq_plonk_gate_vector_digest(public_input_size: number, v: WasmFqGateVector): Uint8Array;
export function caml_pasta_fq_plonk_circuit_serialize(public_input_size: number, v: WasmFqGateVector): string;
export function caml_pasta_fp_plonk_proof_dummy(): WasmFpProverProof;
export function caml_pasta_fp_plonk_proof_deep_copy(x: WasmFpProverProof): WasmFpProverProof;
export function caml_pasta_fp_plonk_proof_create(index: WasmPastaFpPlonkIndex, witness: WasmVecVecFp, wasm_runtime_tables: Uint32Array, prev_challenges: Uint8Array, prev_sgs: Uint32Array): WasmFpProverProof;
export function caml_pasta_fp_plonk_proof_verify(index: WasmFpPlonkVerifierIndex, proof: WasmFpProverProof): boolean;
export function caml_pasta_fp_plonk_proof_batch_verify(indexes: Uint32Array, proofs: Uint32Array): boolean;
export function caml_pasta_fp_plonk_verifier_index_read(offset: number | null | undefined, srs: WasmFpSrs, path: string): WasmFpPlonkVerifierIndex;
export function caml_pasta_fp_plonk_verifier_index_write(append: boolean | null | undefined, index: WasmFpPlonkVerifierIndex, path: string): void;
export function caml_pasta_fp_plonk_verifier_index_serialize(index: WasmFpPlonkVerifierIndex): string;
export function caml_pasta_fp_plonk_verifier_index_deserialize(srs: WasmFpSrs, index: string): WasmFpPlonkVerifierIndex;
export function caml_pasta_fp_plonk_verifier_index_create(index: WasmPastaFpPlonkIndex): WasmFpPlonkVerifierIndex;
export function caml_pasta_fp_plonk_verifier_index_shifts(log2_size: number): WasmFpShifts;
export function caml_pasta_fp_plonk_verifier_index_dummy(): WasmFpPlonkVerifierIndex;
export function caml_pasta_fp_plonk_verifier_index_deep_copy(x: WasmFpPlonkVerifierIndex): WasmFpPlonkVerifierIndex;
export function caml_pasta_fq_plonk_verifier_index_read(offset: number | null | undefined, srs: WasmFqSrs, path: string): WasmFqPlonkVerifierIndex;
export function caml_pasta_fq_plonk_verifier_index_write(append: boolean | null | undefined, index: WasmFqPlonkVerifierIndex, path: string): void;
export function caml_pasta_fq_plonk_verifier_index_serialize(index: WasmFqPlonkVerifierIndex): string;
export function caml_pasta_fq_plonk_verifier_index_deserialize(srs: WasmFqSrs, index: string): WasmFqPlonkVerifierIndex;
export function caml_pasta_fq_plonk_verifier_index_create(index: WasmPastaFqPlonkIndex): WasmFqPlonkVerifierIndex;
export function caml_pasta_fq_plonk_verifier_index_shifts(log2_size: number): WasmFqShifts;
export function caml_pasta_fq_plonk_verifier_index_dummy(): WasmFqPlonkVerifierIndex;
export function caml_pasta_fq_plonk_verifier_index_deep_copy(x: WasmFqPlonkVerifierIndex): WasmFqPlonkVerifierIndex;
export function caml_fp_srs_create(depth: number): WasmFpSrs;
export function caml_fp_srs_add_lagrange_basis(srs: WasmFpSrs, log2_size: number): void;
export function caml_fp_srs_write(append: boolean | null | undefined, srs: WasmFpSrs, path: string): void;
export function caml_fp_srs_create_parallel(depth: number): WasmFpSrs;
export function caml_fp_srs_get(srs: WasmFpSrs): Uint32Array;
export function caml_fp_srs_set(h_and_gs: Uint32Array): WasmFpSrs;
export function caml_fp_srs_maybe_lagrange_commitment(srs: WasmFpSrs, domain_size: number, i: number): WasmFpPolyComm | undefined;
export function caml_fp_srs_set_lagrange_basis(srs: WasmFpSrs, domain_size: number, input_bases: Uint32Array): void;
export function caml_fp_srs_get_lagrange_basis(srs: WasmFpSrs, domain_size: number): Uint32Array;
export function caml_fp_srs_read(offset: number | null | undefined, path: string): WasmFpSrs | undefined;
export function caml_fp_srs_lagrange_commitments_whole_domain_ptr(srs: WasmFpSrs, domain_size: number): number;
/**
 * Reads the lagrange commitments from a raw pointer.
 *
 * # Safety
 *
 * This function is unsafe because it might dereference a
 * raw pointer.
 */
export function caml_fp_srs_lagrange_commitments_whole_domain_read_from_ptr(ptr: number): Uint32Array;
export function caml_fp_srs_lagrange_commitment(srs: WasmFpSrs, domain_size: number, i: number): WasmFpPolyComm;
export function caml_fp_srs_commit_evaluations(srs: WasmFpSrs, domain_size: number, evals: Uint8Array): WasmFpPolyComm;
export function caml_fp_srs_b_poly_commitment(srs: WasmFpSrs, chals: Uint8Array): WasmFpPolyComm;
export function caml_fp_srs_batch_accumulator_check(srs: WasmFpSrs, comms: Uint32Array, chals: Uint8Array): boolean;
export function caml_fp_srs_batch_accumulator_generate(srs: WasmFpSrs, comms: number, chals: Uint8Array): Uint32Array;
export function caml_fp_srs_h(srs: WasmFpSrs): WasmGVesta;
export function caml_fq_srs_create(depth: number): WasmFqSrs;
export function caml_fq_srs_add_lagrange_basis(srs: WasmFqSrs, log2_size: number): void;
export function caml_fq_srs_write(append: boolean | null | undefined, srs: WasmFqSrs, path: string): void;
export function caml_fq_srs_create_parallel(depth: number): WasmFqSrs;
export function caml_fq_srs_get(srs: WasmFqSrs): Uint32Array;
export function caml_fq_srs_set(h_and_gs: Uint32Array): WasmFqSrs;
export function caml_fq_srs_maybe_lagrange_commitment(srs: WasmFqSrs, domain_size: number, i: number): WasmFqPolyComm | undefined;
export function caml_fq_srs_set_lagrange_basis(srs: WasmFqSrs, domain_size: number, input_bases: Uint32Array): void;
export function caml_fq_srs_get_lagrange_basis(srs: WasmFqSrs, domain_size: number): Uint32Array;
export function caml_fq_srs_read(offset: number | null | undefined, path: string): WasmFqSrs | undefined;
export function caml_fq_srs_lagrange_commitments_whole_domain_ptr(srs: WasmFqSrs, domain_size: number): number;
/**
 * Reads the lagrange commitments from a raw pointer.
 *
 * # Safety
 *
 * This function is unsafe because it might dereference a
 * raw pointer.
 */
export function caml_fq_srs_lagrange_commitments_whole_domain_read_from_ptr(ptr: number): Uint32Array;
export function caml_fq_srs_lagrange_commitment(srs: WasmFqSrs, domain_size: number, i: number): WasmFqPolyComm;
export function caml_fq_srs_commit_evaluations(srs: WasmFqSrs, domain_size: number, evals: Uint8Array): WasmFqPolyComm;
export function caml_fq_srs_b_poly_commitment(srs: WasmFqSrs, chals: Uint8Array): WasmFqPolyComm;
export function caml_fq_srs_batch_accumulator_check(srs: WasmFqSrs, comms: Uint32Array, chals: Uint8Array): boolean;
export function caml_fq_srs_batch_accumulator_generate(srs: WasmFqSrs, comms: number, chals: Uint8Array): Uint32Array;
export function caml_fq_srs_h(srs: WasmFqSrs): WasmGPallas;
export function fp_oracles_create(lgr_comm: Uint32Array, index: WasmFpPlonkVerifierIndex, proof: WasmFpProverProof): WasmFpOracles;
export function fp_oracles_dummy(): WasmFpOracles;
export function fp_oracles_deep_copy(x: WasmFpProverProof): WasmFpProverProof;
export function caml_pallas_affine_one(): WasmGPallas;
export function caml_vesta_affine_one(): WasmGVesta;
export function caml_bigint_256_of_numeral(s: string, _len: number, base: number): Uint8Array;
export function caml_bigint_256_of_decimal_string(s: string): Uint8Array;
export function caml_bigint_256_num_limbs(): number;
export function caml_bigint_256_bytes_per_limb(): number;
export function caml_bigint_256_div(x: Uint8Array, y: Uint8Array): Uint8Array;
export function caml_bigint_256_compare(x: Uint8Array, y: Uint8Array): number;
export function caml_bigint_256_test_bit(x: Uint8Array, i: number): boolean;
export function caml_bigint_256_to_bytes(x: Uint8Array): Uint8Array;
export function caml_bigint_256_of_bytes(x: Uint8Array): Uint8Array;
export function caml_bigint_256_deep_copy(x: Uint8Array): Uint8Array;
/**
 * A row accessible from a given row, corresponds to the fact that we open all polynomials
 * at `zeta` **and** `omega * zeta`.
 */
export enum CurrOrNext {
  Curr = 0,
  Next = 1,
}
/**
 * The different types of gates the system supports.
 * Note that all the gates are mutually exclusive:
 * they cannot be used at the same time on single row.
 * If we were ever to support this feature, we would have to make sure
 * not to re-use powers of alpha across constraints.
 */
export enum GateType {
  /**
   * Zero gate
   */
  Zero = 0,
  /**
   * Generic arithmetic gate
   */
  Generic = 1,
  /**
   * Poseidon permutation gate
   */
  Poseidon = 2,
  /**
   * Complete EC addition in Affine form
   */
  CompleteAdd = 3,
  /**
   * EC variable base scalar multiplication
   */
  VarBaseMul = 4,
  /**
   * EC variable base scalar multiplication with group endomorphim optimization
   */
  EndoMul = 5,
  /**
   * Gate for computing the scalar corresponding to an endoscaling
   */
  EndoMulScalar = 6,
  Lookup = 7,
  /**
   * Range check
   */
  RangeCheck0 = 8,
  RangeCheck1 = 9,
  ForeignFieldAdd = 10,
  ForeignFieldMul = 11,
  Xor16 = 12,
  Rot64 = 13,
}
/**
 * Flags indicating which optional gates are used in a circuit.
 *
 * Kimchi circuits can use a variety of optional gates and lookup patterns.
 * Rather than always including constraints for every possible gate type,
 * these flags track which gates are actually present. This allows the prover
 * and verifier to only compute and check relevant constraints.
 *
 * Flags are typically computed automatically via [`Self::from_gates`], which
 * scans the circuit gates and enables the corresponding flags.
 *
 * When a flag is disabled, the following optimizations apply:
 *
 * - The gate's selector polynomial is not computed
 * - The gate's constraints are excluded from linearization
 * - Associated lookup tables are not included
 */
export class FeatureFlags {
  private constructor();
  free(): void;
  /**
   * Enables [`GateType::RangeCheck0`], which partially constrains one
   * 88-bit value. Can also perform a standalone 64-bit range check by
   * constraining columns 1-2 to zero (removing the two highest 12-bit
   * limbs: 88 - 24 = 64 bits).
   * See [`crate::circuits::polynomials::range_check`] for details.
   */
  range_check0: boolean;
  /**
   * Enables [`GateType::RangeCheck1`], which fully constrains the third
   * value in the multi-range-check gadget and triggers deferred lookups.
   * See [`crate::circuits::polynomials::range_check`] for details.
   */
  range_check1: boolean;
  /**
   * Enables [`GateType::ForeignFieldAdd`] for addition over non-native fields.
   */
  foreign_field_add: boolean;
  /**
   * Enables [`GateType::ForeignFieldMul`] for multiplication over non-native fields.
   */
  foreign_field_mul: boolean;
  /**
   * Enables [`GateType::Xor16`] for 16-bit XOR operations.
   */
  xor: boolean;
  /**
   * Enables [`GateType::Rot64`] for 64-bit rotation operations.
   */
  rot: boolean;
  /**
   * Lookup feature configuration.
   * See [`LookupFeatures`] for details.
   */
  lookup_features: LookupFeatures;
}
/**
 * Configuration for lookup-related features in a circuit.
 *
 * Lookups allow efficient verification that witness values exist in
 * precomputed tables. This struct tracks which lookup capabilities are
 * needed, enabling kimchi to include only the required lookup machinery.
 */
export class LookupFeatures {
  free(): void;
  constructor(patterns: LookupPatterns, joint_lookup_used: boolean, uses_runtime_tables: boolean);
  /**
   * Which lookup patterns are enabled. See [`LookupPatterns`].
   */
  patterns: LookupPatterns;
  /**
   * Whether any enabled pattern uses joint lookups (multiple columns
   * combined into a single lookup value).
   */
  joint_lookup_used: boolean;
  /**
   * Whether the circuit uses runtime lookup tables (tables whose contents
   * are provided at proving time rather than being fixed at setup).
   */
  uses_runtime_tables: boolean;
}
/**
 * Describes the desired lookup configuration.
 */
export class LookupInfo {
  free(): void;
  constructor(max_per_row: number, max_joint_size: number, features: LookupFeatures);
  /**
   * The maximum length of an element of `kinds`. This can be computed from `kinds`.
   */
  max_per_row: number;
  /**
   * The maximum joint size of any joint lookup in a constraint in `kinds`. This can be computed from `kinds`.
   */
  max_joint_size: number;
  /**
   * The features enabled for this lookup configuration
   */
  features: LookupFeatures;
}
/**
 * Flags for each of the built-in lookup patterns.
 *
 * Each pattern corresponds to a specific lookup table and constraint
 * configuration. When enabled, the corresponding lookup table is included
 * in the circuit and lookup constraints are generated.
 *
 * Typically computed via [`Self::from_gates`] by scanning circuit gates.
 */
export class LookupPatterns {
  free(): void;
  constructor(xor: boolean, lookup: boolean, range_check: boolean, foreign_field_mul: boolean);
  /**
   * Enables XOR lookup table for bitwise XOR operations.
   */
  xor: boolean;
  /**
   * Enables generic lookup pattern for user-defined tables.
   */
  lookup: boolean;
  /**
   * Enables range check lookup table for 12-bit range constraints.
   */
  range_check: boolean;
  /**
   * Enables lookup tables for foreign field multiplication.
   */
  foreign_field_mul: boolean;
}
export class PoolBuilder {
  private constructor();
  free(): void;
  numThreads(): number;
  build(): void;
  receiver(): number;
}
export class WasmFpDomain {
  free(): void;
  constructor(log_size_of_group: number, group_gen: Uint8Array);
  log_size_of_group: number;
  group_gen: Uint8Array;
}
export class WasmFpGate {
  free(): void;
  constructor(typ: GateType, wires: WasmGateWires, coeffs: Uint8Array);
  typ: GateType;
  wires: WasmGateWires;
}
export class WasmFpGateVector {
  private constructor();
  free(): void;
}
export class WasmFpLookupCommitments {
  free(): void;
  constructor(sorted: Uint32Array, aggreg: WasmFpPolyComm, runtime?: WasmFpPolyComm | null);
  aggreg: WasmFpPolyComm;
  sorted: Uint32Array;
  get runtime(): WasmFpPolyComm | undefined;
  set runtime(value: WasmFpPolyComm | null | undefined);
}
export class WasmFpLookupSelectors {
  free(): void;
  constructor(xor?: WasmFpPolyComm | null, lookup?: WasmFpPolyComm | null, range_check?: WasmFpPolyComm | null, ffmul?: WasmFpPolyComm | null);
  get lookup(): WasmFpPolyComm | undefined;
  set lookup(value: WasmFpPolyComm | null | undefined);
  get range_check(): WasmFpPolyComm | undefined;
  set range_check(value: WasmFpPolyComm | null | undefined);
  get xor(): WasmFpPolyComm | undefined;
  set xor(value: WasmFpPolyComm | null | undefined);
  get ffmul(): WasmFpPolyComm | undefined;
  set ffmul(value: WasmFpPolyComm | null | undefined);
}
export class WasmFpLookupVerifierIndex {
  free(): void;
  constructor(joint_lookup_used: boolean, lookup_table: Uint32Array, lookup_selectors: WasmFpLookupSelectors, table_ids: WasmFpPolyComm | null | undefined, lookup_info: LookupInfo, runtime_tables_selector?: WasmFpPolyComm | null);
  joint_lookup_used: boolean;
  lookup_info: LookupInfo;
  lookup_table: Uint32Array;
  get table_ids(): WasmFpPolyComm | undefined;
  set table_ids(value: WasmFpPolyComm | null | undefined);
  lookup_selectors: WasmFpLookupSelectors;
  get runtime_tables_selector(): WasmFpPolyComm | undefined;
  set runtime_tables_selector(value: WasmFpPolyComm | null | undefined);
}
export class WasmFpOpeningProof {
  free(): void;
  constructor(lr_0: Uint32Array, lr_1: Uint32Array, delta: WasmGVesta, z1: Uint8Array, z2: Uint8Array, sg: WasmGVesta);
  z1: Uint8Array;
  z2: Uint8Array;
  sg: WasmGVesta;
  lr_0: Uint32Array;
  lr_1: Uint32Array;
  delta: WasmGVesta;
}
export class WasmFpOracles {
  free(): void;
  constructor(o: WasmFpRandomOracles, p_eval0: Uint8Array, p_eval1: Uint8Array, opening_prechallenges: Uint8Array, digest_before_evaluations: Uint8Array);
  o: WasmFpRandomOracles;
  p_eval0: Uint8Array;
  p_eval1: Uint8Array;
  digest_before_evaluations: Uint8Array;
  opening_prechallenges: Uint8Array;
}
export class WasmFpPlonkVerificationEvals {
  free(): void;
  constructor(sigma_comm: Uint32Array, coefficients_comm: Uint32Array, generic_comm: WasmFpPolyComm, psm_comm: WasmFpPolyComm, complete_add_comm: WasmFpPolyComm, mul_comm: WasmFpPolyComm, emul_comm: WasmFpPolyComm, endomul_scalar_comm: WasmFpPolyComm, xor_comm?: WasmFpPolyComm | null, range_check0_comm?: WasmFpPolyComm | null, range_check1_comm?: WasmFpPolyComm | null, foreign_field_add_comm?: WasmFpPolyComm | null, foreign_field_mul_comm?: WasmFpPolyComm | null, rot_comm?: WasmFpPolyComm | null);
  sigma_comm: Uint32Array;
  generic_comm: WasmFpPolyComm;
  mul_comm: WasmFpPolyComm;
  psm_comm: WasmFpPolyComm;
  get rot_comm(): WasmFpPolyComm | undefined;
  set rot_comm(value: WasmFpPolyComm | null | undefined);
  get xor_comm(): WasmFpPolyComm | undefined;
  set xor_comm(value: WasmFpPolyComm | null | undefined);
  emul_comm: WasmFpPolyComm;
  coefficients_comm: Uint32Array;
  complete_add_comm: WasmFpPolyComm;
  get range_check0_comm(): WasmFpPolyComm | undefined;
  set range_check0_comm(value: WasmFpPolyComm | null | undefined);
  get range_check1_comm(): WasmFpPolyComm | undefined;
  set range_check1_comm(value: WasmFpPolyComm | null | undefined);
  endomul_scalar_comm: WasmFpPolyComm;
  get foreign_field_add_comm(): WasmFpPolyComm | undefined;
  set foreign_field_add_comm(value: WasmFpPolyComm | null | undefined);
  get foreign_field_mul_comm(): WasmFpPolyComm | undefined;
  set foreign_field_mul_comm(value: WasmFpPolyComm | null | undefined);
}
export class WasmFpPlonkVerifierIndex {
  free(): void;
  constructor(domain: WasmFpDomain, max_poly_size: number, public_: number, prev_challenges: number, srs: WasmFpSrs, evals: WasmFpPlonkVerificationEvals, shifts: WasmFpShifts, lookup_index: WasmFpLookupVerifierIndex | null | undefined, zk_rows: number);
  domain: WasmFpDomain;
  max_poly_size: number;
  public_: number;
  prev_challenges: number;
  shifts: WasmFpShifts;
  zk_rows: number;
  get lookup_index(): WasmFpLookupVerifierIndex | undefined;
  set lookup_index(value: WasmFpLookupVerifierIndex | null | undefined);
  srs: WasmFpSrs;
  evals: WasmFpPlonkVerificationEvals;
}
export class WasmFpPolyComm {
  free(): void;
  constructor(unshifted: Uint32Array, shifted?: WasmGVesta | null);
  get shifted(): WasmGVesta | undefined;
  set shifted(value: WasmGVesta | null | undefined);
  unshifted: Uint32Array;
}
export class WasmFpProverCommitments {
  free(): void;
  constructor(w_comm: Uint32Array, z_comm: WasmFpPolyComm, t_comm: WasmFpPolyComm, lookup?: WasmFpLookupCommitments | null);
  get lookup(): WasmFpLookupCommitments | undefined;
  set lookup(value: WasmFpLookupCommitments | null | undefined);
  t_comm: WasmFpPolyComm;
  w_comm: Uint32Array;
  z_comm: WasmFpPolyComm;
}
export class WasmFpProverProof {
  free(): void;
  static deserialize(bytes: Uint8Array): WasmFpProverProof;
  constructor(commitments: WasmFpProverCommitments, proof: WasmFpOpeningProof, evals: any, ft_eval1: Uint8Array, public_: Uint8Array, prev_challenges_scalars: WasmVecVecFp, prev_challenges_comms: Uint32Array);
  serialize(): string;
  ft_eval1: Uint8Array;
  commitments: WasmFpProverCommitments;
  public_: Uint8Array;
  prev_challenges_comms: Uint32Array;
  prev_challenges_scalars: WasmVecVecFp;
  evals: any;
  proof: WasmFpOpeningProof;
}
export class WasmFpRandomOracles {
  free(): void;
  constructor(joint_combiner_chal: Uint8Array | null | undefined, joint_combiner: Uint8Array | null | undefined, beta: Uint8Array, gamma: Uint8Array, alpha_chal: Uint8Array, alpha: Uint8Array, zeta: Uint8Array, v: Uint8Array, u: Uint8Array, zeta_chal: Uint8Array, v_chal: Uint8Array, u_chal: Uint8Array);
  get joint_combiner_chal(): Uint8Array | undefined;
  set joint_combiner_chal(value: Uint8Array | null | undefined);
  get joint_combiner(): Uint8Array | undefined;
  set joint_combiner(value: Uint8Array | null | undefined);
  beta: Uint8Array;
  gamma: Uint8Array;
  alpha_chal: Uint8Array;
  alpha: Uint8Array;
  zeta: Uint8Array;
  v: Uint8Array;
  u: Uint8Array;
  zeta_chal: Uint8Array;
  v_chal: Uint8Array;
  u_chal: Uint8Array;
}
export class WasmFpRuntimeTable {
  free(): void;
  constructor(id: number, data: Uint8Array);
}
export class WasmFpShifts {
  free(): void;
  constructor(s0: Uint8Array, s1: Uint8Array, s2: Uint8Array, s3: Uint8Array, s4: Uint8Array, s5: Uint8Array, s6: Uint8Array);
  s0: Uint8Array;
  s1: Uint8Array;
  s2: Uint8Array;
  s3: Uint8Array;
  s4: Uint8Array;
  s5: Uint8Array;
  s6: Uint8Array;
}
export class WasmFpSrs {
  private constructor();
  free(): void;
}
export class WasmFqDomain {
  free(): void;
  constructor(log_size_of_group: number, group_gen: Uint8Array);
  log_size_of_group: number;
  group_gen: Uint8Array;
}
export class WasmFqGate {
  free(): void;
  constructor(typ: GateType, wires: WasmGateWires, coeffs: Uint8Array);
  typ: GateType;
  wires: WasmGateWires;
}
export class WasmFqGateVector {
  private constructor();
  free(): void;
}
export class WasmFqLookupCommitments {
  free(): void;
  constructor(sorted: Uint32Array, aggreg: WasmFqPolyComm, runtime?: WasmFqPolyComm | null);
  aggreg: WasmFqPolyComm;
  sorted: Uint32Array;
  get runtime(): WasmFqPolyComm | undefined;
  set runtime(value: WasmFqPolyComm | null | undefined);
}
export class WasmFqLookupSelectors {
  free(): void;
  constructor(xor?: WasmFqPolyComm | null, lookup?: WasmFqPolyComm | null, range_check?: WasmFqPolyComm | null, ffmul?: WasmFqPolyComm | null);
  get lookup(): WasmFqPolyComm | undefined;
  set lookup(value: WasmFqPolyComm | null | undefined);
  get range_check(): WasmFqPolyComm | undefined;
  set range_check(value: WasmFqPolyComm | null | undefined);
  get xor(): WasmFqPolyComm | undefined;
  set xor(value: WasmFqPolyComm | null | undefined);
  get ffmul(): WasmFqPolyComm | undefined;
  set ffmul(value: WasmFqPolyComm | null | undefined);
}
export class WasmFqLookupVerifierIndex {
  free(): void;
  constructor(joint_lookup_used: boolean, lookup_table: Uint32Array, lookup_selectors: WasmFqLookupSelectors, table_ids: WasmFqPolyComm | null | undefined, lookup_info: LookupInfo, runtime_tables_selector?: WasmFqPolyComm | null);
  joint_lookup_used: boolean;
  lookup_info: LookupInfo;
  lookup_table: Uint32Array;
  get table_ids(): WasmFqPolyComm | undefined;
  set table_ids(value: WasmFqPolyComm | null | undefined);
  lookup_selectors: WasmFqLookupSelectors;
  get runtime_tables_selector(): WasmFqPolyComm | undefined;
  set runtime_tables_selector(value: WasmFqPolyComm | null | undefined);
}
export class WasmFqOpeningProof {
  free(): void;
  constructor(lr_0: Uint32Array, lr_1: Uint32Array, delta: WasmGPallas, z1: Uint8Array, z2: Uint8Array, sg: WasmGPallas);
  z1: Uint8Array;
  z2: Uint8Array;
  sg: WasmGPallas;
  lr_0: Uint32Array;
  lr_1: Uint32Array;
  delta: WasmGPallas;
}
export class WasmFqOracles {
  free(): void;
  constructor(o: WasmFqRandomOracles, p_eval0: Uint8Array, p_eval1: Uint8Array, opening_prechallenges: Uint8Array, digest_before_evaluations: Uint8Array);
  o: WasmFqRandomOracles;
  p_eval0: Uint8Array;
  p_eval1: Uint8Array;
  digest_before_evaluations: Uint8Array;
  opening_prechallenges: Uint8Array;
}
export class WasmFqPlonkVerificationEvals {
  free(): void;
  constructor(sigma_comm: Uint32Array, coefficients_comm: Uint32Array, generic_comm: WasmFqPolyComm, psm_comm: WasmFqPolyComm, complete_add_comm: WasmFqPolyComm, mul_comm: WasmFqPolyComm, emul_comm: WasmFqPolyComm, endomul_scalar_comm: WasmFqPolyComm, xor_comm?: WasmFqPolyComm | null, range_check0_comm?: WasmFqPolyComm | null, range_check1_comm?: WasmFqPolyComm | null, foreign_field_add_comm?: WasmFqPolyComm | null, foreign_field_mul_comm?: WasmFqPolyComm | null, rot_comm?: WasmFqPolyComm | null);
  sigma_comm: Uint32Array;
  generic_comm: WasmFqPolyComm;
  mul_comm: WasmFqPolyComm;
  psm_comm: WasmFqPolyComm;
  get rot_comm(): WasmFqPolyComm | undefined;
  set rot_comm(value: WasmFqPolyComm | null | undefined);
  get xor_comm(): WasmFqPolyComm | undefined;
  set xor_comm(value: WasmFqPolyComm | null | undefined);
  emul_comm: WasmFqPolyComm;
  coefficients_comm: Uint32Array;
  complete_add_comm: WasmFqPolyComm;
  get range_check0_comm(): WasmFqPolyComm | undefined;
  set range_check0_comm(value: WasmFqPolyComm | null | undefined);
  get range_check1_comm(): WasmFqPolyComm | undefined;
  set range_check1_comm(value: WasmFqPolyComm | null | undefined);
  endomul_scalar_comm: WasmFqPolyComm;
  get foreign_field_add_comm(): WasmFqPolyComm | undefined;
  set foreign_field_add_comm(value: WasmFqPolyComm | null | undefined);
  get foreign_field_mul_comm(): WasmFqPolyComm | undefined;
  set foreign_field_mul_comm(value: WasmFqPolyComm | null | undefined);
}
export class WasmFqPlonkVerifierIndex {
  free(): void;
  constructor(domain: WasmFqDomain, max_poly_size: number, public_: number, prev_challenges: number, srs: WasmFqSrs, evals: WasmFqPlonkVerificationEvals, shifts: WasmFqShifts, lookup_index: WasmFqLookupVerifierIndex | null | undefined, zk_rows: number);
  domain: WasmFqDomain;
  max_poly_size: number;
  public_: number;
  prev_challenges: number;
  shifts: WasmFqShifts;
  zk_rows: number;
  get lookup_index(): WasmFqLookupVerifierIndex | undefined;
  set lookup_index(value: WasmFqLookupVerifierIndex | null | undefined);
  srs: WasmFqSrs;
  evals: WasmFqPlonkVerificationEvals;
}
export class WasmFqPolyComm {
  free(): void;
  constructor(unshifted: Uint32Array, shifted?: WasmGPallas | null);
  get shifted(): WasmGPallas | undefined;
  set shifted(value: WasmGPallas | null | undefined);
  unshifted: Uint32Array;
}
export class WasmFqProverCommitments {
  free(): void;
  constructor(w_comm: Uint32Array, z_comm: WasmFqPolyComm, t_comm: WasmFqPolyComm, lookup?: WasmFqLookupCommitments | null);
  get lookup(): WasmFqLookupCommitments | undefined;
  set lookup(value: WasmFqLookupCommitments | null | undefined);
  t_comm: WasmFqPolyComm;
  w_comm: Uint32Array;
  z_comm: WasmFqPolyComm;
}
export class WasmFqProverProof {
  free(): void;
  static deserialize(bytes: Uint8Array): WasmFqProverProof;
  constructor(commitments: WasmFqProverCommitments, proof: WasmFqOpeningProof, evals: any, ft_eval1: Uint8Array, public_: Uint8Array, prev_challenges_scalars: WasmVecVecFq, prev_challenges_comms: Uint32Array);
  serialize(): string;
  ft_eval1: Uint8Array;
  commitments: WasmFqProverCommitments;
  public_: Uint8Array;
  prev_challenges_comms: Uint32Array;
  prev_challenges_scalars: WasmVecVecFq;
  evals: any;
  proof: WasmFqOpeningProof;
}
export class WasmFqRandomOracles {
  free(): void;
  constructor(joint_combiner_chal: Uint8Array | null | undefined, joint_combiner: Uint8Array | null | undefined, beta: Uint8Array, gamma: Uint8Array, alpha_chal: Uint8Array, alpha: Uint8Array, zeta: Uint8Array, v: Uint8Array, u: Uint8Array, zeta_chal: Uint8Array, v_chal: Uint8Array, u_chal: Uint8Array);
  get joint_combiner_chal(): Uint8Array | undefined;
  set joint_combiner_chal(value: Uint8Array | null | undefined);
  get joint_combiner(): Uint8Array | undefined;
  set joint_combiner(value: Uint8Array | null | undefined);
  beta: Uint8Array;
  gamma: Uint8Array;
  alpha_chal: Uint8Array;
  alpha: Uint8Array;
  zeta: Uint8Array;
  v: Uint8Array;
  u: Uint8Array;
  zeta_chal: Uint8Array;
  v_chal: Uint8Array;
  u_chal: Uint8Array;
}
export class WasmFqRuntimeTable {
  free(): void;
  constructor(id: number, data: Uint8Array);
}
export class WasmFqShifts {
  free(): void;
  constructor(s0: Uint8Array, s1: Uint8Array, s2: Uint8Array, s3: Uint8Array, s4: Uint8Array, s5: Uint8Array, s6: Uint8Array);
  s0: Uint8Array;
  s1: Uint8Array;
  s2: Uint8Array;
  s3: Uint8Array;
  s4: Uint8Array;
  s5: Uint8Array;
  s6: Uint8Array;
}
export class WasmFqSrs {
  private constructor();
  free(): void;
}
export class WasmGPallas {
  private constructor();
  free(): void;
  wasm_clone(): WasmGPallas;
  x: Uint8Array;
  y: Uint8Array;
  infinity: boolean;
}
export class WasmGVesta {
  private constructor();
  free(): void;
  wasm_clone(): WasmGVesta;
  x: Uint8Array;
  y: Uint8Array;
  infinity: boolean;
}
export class WasmGateWires {
  free(): void;
  constructor(w0: Wire, w1: Wire, w2: Wire, w3: Wire, w4: Wire, w5: Wire, w6: Wire);
  0: Wire;
  1: Wire;
  2: Wire;
  3: Wire;
  4: Wire;
  5: Wire;
  6: Wire;
}
export class WasmPallasGProjective {
  private constructor();
  free(): void;
}
export class WasmPastaFpLookupTable {
  free(): void;
  constructor(id: number, data: WasmVecVecFp);
}
/**
 * Boxed so that we don't store large proving indexes in the OCaml heap.
 */
export class WasmPastaFpPlonkIndex {
  private constructor();
  free(): void;
}
export class WasmPastaFpRuntimeTableCfg {
  free(): void;
  constructor(id: number, first_column: Uint8Array);
}
export class WasmPastaFqLookupTable {
  free(): void;
  constructor(id: number, data: WasmVecVecFq);
}
/**
 * Boxed so that we don't store large proving indexes in the OCaml heap.
 */
export class WasmPastaFqPlonkIndex {
  private constructor();
  free(): void;
}
export class WasmPastaFqRuntimeTableCfg {
  free(): void;
  constructor(id: number, first_column: Uint8Array);
}
export class WasmVecFp {
  free(): void;
  get(i: number): Uint8Array;
  set(i: number, x: Uint8Array): void;
  push(x: Uint8Array): void;
  constructor(n: number);
}
export class WasmVecFq {
  free(): void;
  get(i: number): Uint8Array;
  set(i: number, x: Uint8Array): void;
  push(x: Uint8Array): void;
  constructor(n: number);
}
export class WasmVecVecFp {
  free(): void;
  get(i: number): Uint8Array;
  set(i: number, x: Uint8Array): void;
  push(x: Uint8Array): void;
  constructor(n: number);
}
export class WasmVecVecFpPolyComm {
  free(): void;
  push(x: Uint32Array): void;
  constructor(n: number);
}
export class WasmVecVecFq {
  free(): void;
  get(i: number): Uint8Array;
  set(i: number, x: Uint8Array): void;
  push(x: Uint8Array): void;
  constructor(n: number);
}
export class WasmVecVecFqPolyComm {
  free(): void;
  push(x: Uint32Array): void;
  constructor(n: number);
}
export class WasmVestaGProjective {
  private constructor();
  free(): void;
}
/**
 * Wire documents the other cell that is wired to this one.
 * If the cell represents an internal wire, an input to the circuit,
 * or a final output of the circuit, the cell references itself.
 */
export class Wire {
  private constructor();
  free(): void;
  static create(row: number, col: number): Wire;
  row: number;
  col: number;
}
