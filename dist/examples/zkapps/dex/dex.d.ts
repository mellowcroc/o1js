import { AccountUpdate, PrivateKey, PublicKey, SmartContract, State, UInt32, UInt64, TokenContract as BaseTokenContract, AccountUpdateForest } from 'o1js';
export { TokenContract, addresses, createDex, keys, randomAccounts, tokenIds };
declare function createDex({ lockedLiquiditySlots }?: {
    lockedLiquiditySlots?: number;
}): {
    Dex: {
        new (address: PublicKey, tokenId?: import("../../../../dist/node/lib/provable/field.js").Field | undefined): {
            tokenX: PublicKey;
            tokenY: PublicKey;
            approveBase(forest: AccountUpdateForest): Promise<void>;
            /**
             * state which keeps track of total lqXY supply -- this is needed to calculate what to return when redeeming liquidity
             *
             * total supply is zero initially; it increases when supplying liquidity and decreases when redeeming it
             */
            totalSupply: State<UInt64>;
            /**
             * Mint liquidity tokens in exchange for X and Y tokens
             * @param dx input amount of X tokens
             * @param dy input amount of Y tokens
             * @return output amount of lqXY tokens
             *
             * This function fails if the X and Y token amounts don't match the current X/Y ratio in the pool.
             * This can also be used if the pool is empty. In that case, there is no check on X/Y;
             * instead, the input X and Y amounts determine the initial ratio.
             */
            supplyLiquidityBase(dx: UInt64, dy: UInt64): Promise<UInt64>;
            /**
             * Mint liquidity tokens in exchange for X and Y tokens
             * @param dx input amount of X tokens
             * @return output amount of lqXY tokens
             *
             * This uses supplyLiquidityBase as the circuit, but for convenience,
             * the input amount of Y tokens is calculated automatically from the X tokens.
             * Fails if the liquidity pool is empty, so can't be used for the first deposit.
             */
            supplyLiquidity(dx: UInt64): Promise<UInt64>;
            /**
             * Burn liquidity tokens to get back X and Y tokens
             * @param dl input amount of lqXY token
             * @return output amount of X and Y tokens, as a tuple [outputX, outputY]
             *
             * The transaction needs to be signed by the user's private key.
             *
             * Note: this is not a `@method` because there's nothing to prove which isn't already proven
             * by the called methods
             */
            redeemLiquidity(dl: UInt64): Promise<UInt64[]>;
            /**
             * Swap X tokens for Y tokens
             * @param dx input amount of X tokens
             * @return output amount Y tokens
             *
             * The transaction needs to be signed by the user's private key.
             */
            swapX(dx: UInt64): Promise<UInt64>;
            /**
             * Swap Y tokens for X tokens
             * @param dy input amount of Y tokens
             * @return output amount Y tokens
             *
             * The transaction needs to be signed by the user's private key.
             */
            swapY(dy: UInt64): Promise<UInt64>;
            /**
             * helper method to approve burning of user's liquidity.
             * this just burns user tokens, so there is no incentive to call this directly.
             * instead, the dex token holders call this and in turn pay back tokens.
             *
             * @param user caller address
             * @param dl input amount of lq tokens
             * @returns total supply of lq tokens _before_ burning dl, so that caller can calculate how much dx / dx to returns
             *
             * The transaction needs to be signed by the user's private key.
             */
            burnLiquidity(user: PublicKey, dl: UInt64): Promise<UInt64>;
            deploy(args?: import("o1js").DeployArgs): Promise<void>;
            deriveTokenId(): import("../../../../dist/node/lib/provable/field.js").Field;
            readonly internal: {
                mint({ address, amount, }: {
                    address: PublicKey | AccountUpdate | SmartContract;
                    amount: number | bigint | UInt64;
                }): AccountUpdate;
                burn({ address, amount, }: {
                    address: PublicKey | AccountUpdate | SmartContract;
                    amount: number | bigint | UInt64;
                }): AccountUpdate;
                send({ from, to, amount, }: {
                    from: PublicKey | AccountUpdate | SmartContract;
                    to: PublicKey | AccountUpdate | SmartContract;
                    amount: number | bigint | UInt64;
                }): AccountUpdate;
            };
            forEachUpdate(updates: AccountUpdateForest, callback: (update: AccountUpdate, usesToken: import("../../../../dist/node/lib/provable/bool.js").Bool) => void): void;
            checkZeroBalanceChange(updates: AccountUpdateForest): void;
            approveAccountUpdate(accountUpdate: AccountUpdate | import("o1js").AccountUpdateTree): Promise<void>;
            approveAccountUpdates(accountUpdates: (AccountUpdate | import("o1js").AccountUpdateTree)[]): Promise<void>;
            transfer(from: PublicKey | AccountUpdate, to: PublicKey | AccountUpdate, amount: number | bigint | UInt64): Promise<void>;
            "__#4@#private": any;
            address: PublicKey;
            tokenId: import("../../../../dist/node/lib/provable/field.js").Field;
            init(): void;
            requireSignature(): void;
            skipAuthorization(): void;
            readonly self: AccountUpdate;
            newSelf(methodName?: string | undefined): AccountUpdate;
            sender: {
                self: SmartContract;
                getUnconstrained(): PublicKey;
                getAndRequireSignature(): PublicKey;
            };
            readonly account: import("../../../../dist/node/lib/mina/v1/precondition.js").Account;
            readonly network: import("../../../../dist/node/lib/mina/v1/precondition.js").Network;
            readonly currentSlot: import("../../../../dist/node/lib/mina/v1/precondition.js").CurrentSlot;
            approve(update: AccountUpdate | AccountUpdateForest | import("o1js").AccountUpdateTree): void;
            send(args: {
                to: PublicKey | AccountUpdate | SmartContract;
                amount: number | bigint | UInt64;
            }): AccountUpdate;
            readonly balance: {
                addInPlace(x: string | number | bigint | UInt64 | UInt32 | import("o1js").Int64): void;
                subInPlace(x: string | number | bigint | UInt64 | UInt32 | import("o1js").Int64): void;
            };
            events: {
                [key: string]: import("o1js").FlexibleProvablePure<any>;
            };
            emitEventIf<K extends string | number>(condition: import("../../../../dist/node/lib/provable/bool.js").Bool, type: K, event: any): void;
            emitEvent<K_1 extends string | number>(type: K_1, event: any): void;
            fetchEvents(start?: UInt32 | undefined, end?: UInt32 | undefined): Promise<{
                type: string;
                event: {
                    data: import("o1js").ProvablePure<any>;
                    transactionInfo: {
                        transactionHash: string;
                        transactionStatus: string;
                        transactionMemo: string;
                    };
                };
                blockHeight: UInt32;
                blockHash: string;
                parentBlockHash: string;
                globalSlot: UInt32;
                chainStatus: string;
            }[]>;
        };
        MAX_ACCOUNT_UPDATES: number;
        _methods?: import("../../../../dist/node/lib/proof-system/zkprogram.js").MethodInterface[] | undefined;
        _methodMetadata?: Record<string, {
            actions: number;
            rows: number;
            digest: string;
            gates: import("../../../../dist/node/bindings.js").Gate[];
            proofs: import("../../../../dist/node/lib/proof-system/proof.js").ProofClass[];
        }> | undefined;
        _provers?: import("../../../../dist/node/bindings.js").Pickles.Prover[] | undefined;
        _verificationKey?: {
            data: string;
            hash: import("../../../../dist/node/lib/provable/field.js").Field;
        } | undefined;
        Proof(): {
            new ({ proof, publicInput, publicOutput, maxProofsVerified, }: {
                proof: unknown;
                publicInput: import("o1js").ZkappPublicInput;
                publicOutput: undefined;
                maxProofsVerified: 0 | 2 | 1; /**
                 * exercise the "timing" (vesting) feature to lock the received liquidity tokens.
                 *
                 * THIS IS HERE FOR TESTING!
                 *
                 * In reality, the timing feature is a bit awkward to use for time-locking liquidity tokens.
                 * That's because, if there is currently a vesting schedule on an account, we can't modify it.
                 * Thus, a liquidity provider would need to wait for their current tokens to unlock before being able to
                 * supply liquidity again (or, create another account to supply liquidity from).
                 */
            }): {
                verify(): void;
                verifyIf(condition: import("../../../../dist/node/lib/provable/bool.js").Bool): void;
                publicInput: import("o1js").ZkappPublicInput;
                publicOutput: undefined;
                proof: unknown;
                maxProofsVerified: 0 | 2 | 1;
                shouldVerify: import("../../../../dist/node/lib/provable/bool.js").Bool;
                declare(): boolean;
                toJSON(): import("o1js").JsonProof;
                publicFields(): {
                    input: import("../../../../dist/node/lib/provable/field.js").Field[];
                    output: import("../../../../dist/node/lib/provable/field.js").Field[];
                };
            };
            publicInputType: Omit<import("../../../../dist/node/lib/provable/types/provable-intf.js").Provable<{
                accountUpdate: import("../../../../dist/node/lib/provable/field.js").Field;
                calls: import("../../../../dist/node/lib/provable/field.js").Field;
            }, {
                accountUpdate: bigint;
                calls: bigint;
            }>, "fromFields"> & {
                fromFields: (fields: import("../../../../dist/node/lib/provable/field.js").Field[]) => {
                    accountUpdate: import("../../../../dist/node/lib/provable/field.js").Field;
                    calls: import("../../../../dist/node/lib/provable/field.js").Field;
                };
            } & {
                toInput: (x: {
                    accountUpdate: import("../../../../dist/node/lib/provable/field.js").Field;
                    calls: import("../../../../dist/node/lib/provable/field.js").Field;
                }) => {
                    fields?: import("../../../../dist/node/lib/provable/field.js").Field[] | undefined;
                    packed?: [import("../../../../dist/node/lib/provable/field.js").Field, number][] | undefined;
                };
                toJSON: (x: {
                    accountUpdate: import("../../../../dist/node/lib/provable/field.js").Field;
                    calls: import("../../../../dist/node/lib/provable/field.js").Field;
                }) => {
                    accountUpdate: string;
                    calls: string;
                };
                fromJSON: (x: {
                    accountUpdate: string;
                    calls: string;
                }) => {
                    accountUpdate: import("../../../../dist/node/lib/provable/field.js").Field;
                    calls: import("../../../../dist/node/lib/provable/field.js").Field;
                };
                empty: () => {
                    accountUpdate: import("../../../../dist/node/lib/provable/field.js").Field;
                    calls: import("../../../../dist/node/lib/provable/field.js").Field;
                };
            };
            publicOutputType: import("o1js").ProvablePureExtended<undefined, undefined, null>;
            tag: () => typeof SmartContract;
            fromJSON<S extends import("../../../../dist/node/lib/util/types.js").Subclass<typeof import("o1js").Proof>>(this: S, { maxProofsVerified, proof: proofString, publicInput: publicInputJson, publicOutput: publicOutputJson, }: import("o1js").JsonProof): Promise<import("o1js").Proof<import("o1js").InferProvable<S["publicInputType"]>, import("o1js").InferProvable<S["publicOutputType"]>>>;
            dummy<Input, OutPut>(publicInput: Input, publicOutput: OutPut, maxProofsVerified: 0 | 2 | 1, domainLog2?: number | undefined): Promise<import("o1js").Proof<Input, OutPut>>;
            readonly provable: {
                toFields: (value: import("o1js").Proof<any, any>) => import("../../../../dist/node/lib/provable/field.js").Field[];
                toAuxiliary: (value?: import("o1js").Proof<any, any> | undefined) => any[];
                fromFields: (fields: import("../../../../dist/node/lib/provable/field.js").Field[], aux: any[]) => import("o1js").Proof<any, any>;
                sizeInFields(): number;
                check: (value: import("o1js").Proof<any, any>) => void;
                toValue: (x: import("o1js").Proof<any, any>) => import("../../../../dist/node/lib/proof-system/proof.js").ProofValue<any, any>;
                fromValue: (x: import("o1js").Proof<any, any> | import("../../../../dist/node/lib/proof-system/proof.js").ProofValue<any, any>) => import("o1js").Proof<any, any>;
                toCanonical?: ((x: import("o1js").Proof<any, any>) => import("o1js").Proof<any, any>) | undefined;
            };
            publicFields(value: import("o1js").ProofBase<any, any>): {
                input: import("../../../../dist/node/lib/provable/field.js").Field[];
                output: import("../../../../dist/node/lib/provable/field.js").Field[];
            };
            _proofFromBase64(proofString: string, maxProofsVerified: 0 | 2 | 1): unknown;
            _proofToBase64(proof: unknown, maxProofsVerified: 0 | 2 | 1): string;
        };
        compile({ cache, forceRecompile }?: {
            cache?: import("o1js").Cache | undefined;
            forceRecompile?: boolean | undefined;
        } | undefined): Promise<{
            verificationKey: {
                data: string;
                hash: import("../../../../dist/node/lib/provable/field.js").Field;
            };
            provers: import("../../../../dist/node/bindings.js").Pickles.Prover[];
            verify: (statement: import("../../../../dist/node/bindings.js").Pickles.Statement<import("../../../../dist/node/lib/provable/core/fieldvar.js").FieldConst>, proof: unknown) => Promise<boolean>;
        }>;
        digest(): Promise<string>;
        getMaxProofsVerified(): Promise<0 | 2 | 1>;
        setVerificationKeyUnsafe(verificationKey: {
            data: string;
            hash: string | import("../../../../dist/node/lib/provable/field.js").Field;
        }): void;
        runOutsideCircuit(run: () => void): void;
        analyzeMethods({ printSummary }?: {
            printSummary?: boolean | undefined;
        } | undefined): Promise<Record<string, {
            actions: number;
            rows: number;
            digest: string;
            gates: import("../../../../dist/node/bindings.js").Gate[];
            proofs: import("../../../../dist/node/lib/proof-system/proof.js").ProofClass[];
        }>>;
    };
    DexTokenHolder: {
        new (address: PublicKey, tokenId?: import("../../../../dist/node/lib/provable/field.js").Field | undefined): {
            redeemLiquidityPartial(user: PublicKey, dl: UInt64): Promise<{
                values: UInt64[];
            }>;
            redeemLiquidity(user: PublicKey, dl: UInt64, otherTokenAddress: PublicKey): Promise<{
                values: UInt64[];
            }>;
            swap(user: PublicKey, otherTokenAmount: UInt64, otherTokenAddress: PublicKey): Promise<UInt64>;
            "__#4@#private": any;
            address: PublicKey;
            tokenId: import("../../../../dist/node/lib/provable/field.js").Field;
            deploy({ verificationKey, }?: {
                verificationKey?: {
                    data: string;
                    hash: string | import("../../../../dist/node/lib/provable/field.js").Field;
                } | undefined;
            } | undefined): Promise<void>;
            init(): void;
            requireSignature(): void;
            skipAuthorization(): void;
            readonly self: AccountUpdate;
            newSelf(methodName?: string | undefined): AccountUpdate;
            sender: {
                self: SmartContract;
                getUnconstrained(): PublicKey;
                getAndRequireSignature(): PublicKey;
            };
            readonly account: import("../../../../dist/node/lib/mina/v1/precondition.js").Account;
            readonly network: import("../../../../dist/node/lib/mina/v1/precondition.js").Network;
            readonly currentSlot: import("../../../../dist/node/lib/mina/v1/precondition.js").CurrentSlot;
            approve(update: AccountUpdate | AccountUpdateForest | import("o1js").AccountUpdateTree): void;
            send(args: {
                to: PublicKey | AccountUpdate | SmartContract;
                amount: number | bigint | UInt64;
            }): AccountUpdate;
            readonly balance: {
                addInPlace(x: string | number | bigint | UInt64 | UInt32 | import("o1js").Int64): void;
                subInPlace(x: string | number | bigint | UInt64 | UInt32 | import("o1js").Int64): void;
            };
            events: {
                [key: string]: import("o1js").FlexibleProvablePure<any>;
            };
            emitEventIf<K_2 extends string | number>(condition: import("../../../../dist/node/lib/provable/bool.js").Bool, type: K_2, event: any): void;
            emitEvent<K_3 extends string | number>(type: K_3, event: any): void;
            fetchEvents(start?: UInt32 | undefined, end?: UInt32 | undefined): Promise<{
                type: string;
                event: {
                    data: import("o1js").ProvablePure<any>;
                    transactionInfo: {
                        transactionHash: string;
                        transactionStatus: string;
                        transactionMemo: string;
                    };
                };
                blockHeight: UInt32;
                blockHash: string;
                parentBlockHash: string;
                globalSlot: UInt32;
                chainStatus: string;
            }[]>;
        };
        _methods?: import("../../../../dist/node/lib/proof-system/zkprogram.js").MethodInterface[] | undefined;
        _methodMetadata?: Record<string, {
            actions: number;
            rows: number;
            digest: string;
            gates: import("../../../../dist/node/bindings.js").Gate[];
            proofs: import("../../../../dist/node/lib/proof-system/proof.js").ProofClass[];
        }> | undefined;
        _provers?: import("../../../../dist/node/bindings.js").Pickles.Prover[] | undefined;
        _verificationKey?: {
            data: string;
            hash: import("../../../../dist/node/lib/provable/field.js").Field;
        } | undefined;
        Proof(): {
            new ({ proof, publicInput, publicOutput, maxProofsVerified, }: {
                proof: unknown;
                publicInput: import("o1js").ZkappPublicInput;
                publicOutput: undefined;
                maxProofsVerified: 0 | 2 | 1; /**
                 * exercise the "timing" (vesting) feature to lock the received liquidity tokens.
                 *
                 * THIS IS HERE FOR TESTING!
                 *
                 * In reality, the timing feature is a bit awkward to use for time-locking liquidity tokens.
                 * That's because, if there is currently a vesting schedule on an account, we can't modify it.
                 * Thus, a liquidity provider would need to wait for their current tokens to unlock before being able to
                 * supply liquidity again (or, create another account to supply liquidity from).
                 */
            }): {
                verify(): void;
                verifyIf(condition: import("../../../../dist/node/lib/provable/bool.js").Bool): void;
                publicInput: import("o1js").ZkappPublicInput;
                publicOutput: undefined;
                proof: unknown;
                maxProofsVerified: 0 | 2 | 1;
                shouldVerify: import("../../../../dist/node/lib/provable/bool.js").Bool;
                declare(): boolean;
                toJSON(): import("o1js").JsonProof;
                publicFields(): {
                    input: import("../../../../dist/node/lib/provable/field.js").Field[];
                    output: import("../../../../dist/node/lib/provable/field.js").Field[];
                };
            };
            publicInputType: Omit<import("../../../../dist/node/lib/provable/types/provable-intf.js").Provable<{
                accountUpdate: import("../../../../dist/node/lib/provable/field.js").Field;
                calls: import("../../../../dist/node/lib/provable/field.js").Field;
            }, {
                accountUpdate: bigint;
                calls: bigint;
            }>, "fromFields"> & {
                fromFields: (fields: import("../../../../dist/node/lib/provable/field.js").Field[]) => {
                    accountUpdate: import("../../../../dist/node/lib/provable/field.js").Field;
                    calls: import("../../../../dist/node/lib/provable/field.js").Field;
                };
            } & {
                toInput: (x: {
                    accountUpdate: import("../../../../dist/node/lib/provable/field.js").Field;
                    calls: import("../../../../dist/node/lib/provable/field.js").Field;
                }) => {
                    fields?: import("../../../../dist/node/lib/provable/field.js").Field[] | undefined;
                    packed?: [import("../../../../dist/node/lib/provable/field.js").Field, number][] | undefined;
                };
                toJSON: (x: {
                    accountUpdate: import("../../../../dist/node/lib/provable/field.js").Field;
                    calls: import("../../../../dist/node/lib/provable/field.js").Field;
                }) => {
                    accountUpdate: string;
                    calls: string;
                };
                fromJSON: (x: {
                    accountUpdate: string;
                    calls: string;
                }) => {
                    accountUpdate: import("../../../../dist/node/lib/provable/field.js").Field;
                    calls: import("../../../../dist/node/lib/provable/field.js").Field;
                };
                empty: () => {
                    accountUpdate: import("../../../../dist/node/lib/provable/field.js").Field;
                    calls: import("../../../../dist/node/lib/provable/field.js").Field;
                };
            };
            publicOutputType: import("o1js").ProvablePureExtended<undefined, undefined, null>;
            tag: () => typeof SmartContract;
            fromJSON<S extends import("../../../../dist/node/lib/util/types.js").Subclass<typeof import("o1js").Proof>>(this: S, { maxProofsVerified, proof: proofString, publicInput: publicInputJson, publicOutput: publicOutputJson, }: import("o1js").JsonProof): Promise<import("o1js").Proof<import("o1js").InferProvable<S["publicInputType"]>, import("o1js").InferProvable<S["publicOutputType"]>>>;
            dummy<Input, OutPut>(publicInput: Input, publicOutput: OutPut, maxProofsVerified: 0 | 2 | 1, domainLog2?: number | undefined): Promise<import("o1js").Proof<Input, OutPut>>;
            readonly provable: {
                toFields: (value: import("o1js").Proof<any, any>) => import("../../../../dist/node/lib/provable/field.js").Field[];
                toAuxiliary: (value?: import("o1js").Proof<any, any> | undefined) => any[];
                fromFields: (fields: import("../../../../dist/node/lib/provable/field.js").Field[], aux: any[]) => import("o1js").Proof<any, any>;
                sizeInFields(): number;
                check: (value: import("o1js").Proof<any, any>) => void;
                toValue: (x: import("o1js").Proof<any, any>) => import("../../../../dist/node/lib/proof-system/proof.js").ProofValue<any, any>;
                fromValue: (x: import("o1js").Proof<any, any> | import("../../../../dist/node/lib/proof-system/proof.js").ProofValue<any, any>) => import("o1js").Proof<any, any>;
                toCanonical?: ((x: import("o1js").Proof<any, any>) => import("o1js").Proof<any, any>) | undefined;
            };
            publicFields(value: import("o1js").ProofBase<any, any>): {
                input: import("../../../../dist/node/lib/provable/field.js").Field[];
                output: import("../../../../dist/node/lib/provable/field.js").Field[];
            };
            _proofFromBase64(proofString: string, maxProofsVerified: 0 | 2 | 1): unknown;
            _proofToBase64(proof: unknown, maxProofsVerified: 0 | 2 | 1): string;
        };
        compile({ cache, forceRecompile }?: {
            cache?: import("o1js").Cache | undefined;
            forceRecompile?: boolean | undefined;
        } | undefined): Promise<{
            verificationKey: {
                data: string;
                hash: import("../../../../dist/node/lib/provable/field.js").Field;
            };
            provers: import("../../../../dist/node/bindings.js").Pickles.Prover[];
            verify: (statement: import("../../../../dist/node/bindings.js").Pickles.Statement<import("../../../../dist/node/lib/provable/core/fieldvar.js").FieldConst>, proof: unknown) => Promise<boolean>;
        }>;
        digest(): Promise<string>;
        getMaxProofsVerified(): Promise<0 | 2 | 1>;
        setVerificationKeyUnsafe(verificationKey: {
            data: string;
            hash: string | import("../../../../dist/node/lib/provable/field.js").Field;
        }): void;
        runOutsideCircuit(run: () => void): void;
        analyzeMethods({ printSummary }?: {
            printSummary?: boolean | undefined;
        } | undefined): Promise<Record<string, {
            actions: number;
            rows: number;
            digest: string;
            gates: import("../../../../dist/node/bindings.js").Gate[];
            proofs: import("../../../../dist/node/lib/proof-system/proof.js").ProofClass[];
        }>>;
    };
    ModifiedDexTokenHolder: {
        new (address: PublicKey, tokenId?: import("../../../../dist/node/lib/provable/field.js").Field | undefined): {
            /**
             * This swap method has a slightly changed formula
             */
            swap(user: PublicKey, otherTokenAmount: UInt64, otherTokenAddress: PublicKey): Promise<UInt64>;
            redeemLiquidityPartial(user: PublicKey, dl: UInt64): Promise<{
                values: UInt64[];
            }>;
            redeemLiquidity(user: PublicKey, dl: UInt64, otherTokenAddress: PublicKey): Promise<{
                values: UInt64[];
            }>;
            "__#4@#private": any;
            address: PublicKey;
            tokenId: import("../../../../dist/node/lib/provable/field.js").Field;
            deploy({ verificationKey, }?: {
                verificationKey?: {
                    data: string;
                    hash: string | import("../../../../dist/node/lib/provable/field.js").Field;
                } | undefined;
            } | undefined): Promise<void>;
            init(): void;
            requireSignature(): void;
            skipAuthorization(): void;
            readonly self: AccountUpdate;
            newSelf(methodName?: string | undefined): AccountUpdate;
            sender: {
                self: SmartContract;
                getUnconstrained(): PublicKey;
                getAndRequireSignature(): PublicKey;
            };
            readonly account: import("../../../../dist/node/lib/mina/v1/precondition.js").Account;
            readonly network: import("../../../../dist/node/lib/mina/v1/precondition.js").Network;
            readonly currentSlot: import("../../../../dist/node/lib/mina/v1/precondition.js").CurrentSlot;
            approve(update: AccountUpdate | AccountUpdateForest | import("o1js").AccountUpdateTree): void;
            send(args: {
                to: PublicKey | AccountUpdate | SmartContract;
                amount: number | bigint | UInt64;
            }): AccountUpdate;
            readonly balance: {
                addInPlace(x: string | number | bigint | UInt64 | UInt32 | import("o1js").Int64): void;
                subInPlace(x: string | number | bigint | UInt64 | UInt32 | import("o1js").Int64): void;
            };
            events: {
                [key: string]: import("o1js").FlexibleProvablePure<any>;
            };
            emitEventIf<K_4 extends string | number>(condition: import("../../../../dist/node/lib/provable/bool.js").Bool, type: K_4, event: any): void;
            emitEvent<K_5 extends string | number>(type: K_5, event: any): void;
            fetchEvents(start?: UInt32 | undefined, end?: UInt32 | undefined): Promise<{
                type: string;
                event: {
                    data: import("o1js").ProvablePure<any>;
                    transactionInfo: {
                        transactionHash: string;
                        transactionStatus: string;
                        transactionMemo: string;
                    };
                };
                blockHeight: UInt32;
                blockHash: string;
                parentBlockHash: string;
                globalSlot: UInt32;
                chainStatus: string;
            }[]>;
        };
        _methods?: import("../../../../dist/node/lib/proof-system/zkprogram.js").MethodInterface[] | undefined;
        _methodMetadata?: Record<string, {
            actions: number;
            rows: number;
            digest: string;
            gates: import("../../../../dist/node/bindings.js").Gate[];
            proofs: import("../../../../dist/node/lib/proof-system/proof.js").ProofClass[];
        }> | undefined;
        _provers?: import("../../../../dist/node/bindings.js").Pickles.Prover[] | undefined;
        _verificationKey?: {
            data: string;
            hash: import("../../../../dist/node/lib/provable/field.js").Field;
        } | undefined;
        Proof(): {
            new ({ proof, publicInput, publicOutput, maxProofsVerified, }: {
                proof: unknown;
                publicInput: import("o1js").ZkappPublicInput;
                publicOutput: undefined;
                maxProofsVerified: 0 | 2 | 1; /**
                 * exercise the "timing" (vesting) feature to lock the received liquidity tokens.
                 *
                 * THIS IS HERE FOR TESTING!
                 *
                 * In reality, the timing feature is a bit awkward to use for time-locking liquidity tokens.
                 * That's because, if there is currently a vesting schedule on an account, we can't modify it.
                 * Thus, a liquidity provider would need to wait for their current tokens to unlock before being able to
                 * supply liquidity again (or, create another account to supply liquidity from).
                 */
            }): {
                verify(): void;
                verifyIf(condition: import("../../../../dist/node/lib/provable/bool.js").Bool): void;
                publicInput: import("o1js").ZkappPublicInput;
                publicOutput: undefined;
                proof: unknown;
                maxProofsVerified: 0 | 2 | 1;
                shouldVerify: import("../../../../dist/node/lib/provable/bool.js").Bool;
                declare(): boolean;
                toJSON(): import("o1js").JsonProof;
                publicFields(): {
                    input: import("../../../../dist/node/lib/provable/field.js").Field[];
                    output: import("../../../../dist/node/lib/provable/field.js").Field[];
                };
            };
            publicInputType: Omit<import("../../../../dist/node/lib/provable/types/provable-intf.js").Provable<{
                accountUpdate: import("../../../../dist/node/lib/provable/field.js").Field;
                calls: import("../../../../dist/node/lib/provable/field.js").Field;
            }, {
                accountUpdate: bigint;
                calls: bigint;
            }>, "fromFields"> & {
                fromFields: (fields: import("../../../../dist/node/lib/provable/field.js").Field[]) => {
                    accountUpdate: import("../../../../dist/node/lib/provable/field.js").Field;
                    calls: import("../../../../dist/node/lib/provable/field.js").Field;
                };
            } & {
                toInput: (x: {
                    accountUpdate: import("../../../../dist/node/lib/provable/field.js").Field;
                    calls: import("../../../../dist/node/lib/provable/field.js").Field;
                }) => {
                    fields?: import("../../../../dist/node/lib/provable/field.js").Field[] | undefined;
                    packed?: [import("../../../../dist/node/lib/provable/field.js").Field, number][] | undefined;
                };
                toJSON: (x: {
                    accountUpdate: import("../../../../dist/node/lib/provable/field.js").Field;
                    calls: import("../../../../dist/node/lib/provable/field.js").Field;
                }) => {
                    accountUpdate: string;
                    calls: string;
                };
                fromJSON: (x: {
                    accountUpdate: string;
                    calls: string;
                }) => {
                    accountUpdate: import("../../../../dist/node/lib/provable/field.js").Field;
                    calls: import("../../../../dist/node/lib/provable/field.js").Field;
                };
                empty: () => {
                    accountUpdate: import("../../../../dist/node/lib/provable/field.js").Field;
                    calls: import("../../../../dist/node/lib/provable/field.js").Field;
                };
            };
            publicOutputType: import("o1js").ProvablePureExtended<undefined, undefined, null>;
            tag: () => typeof SmartContract;
            fromJSON<S extends import("../../../../dist/node/lib/util/types.js").Subclass<typeof import("o1js").Proof>>(this: S, { maxProofsVerified, proof: proofString, publicInput: publicInputJson, publicOutput: publicOutputJson, }: import("o1js").JsonProof): Promise<import("o1js").Proof<import("o1js").InferProvable<S["publicInputType"]>, import("o1js").InferProvable<S["publicOutputType"]>>>;
            dummy<Input, OutPut>(publicInput: Input, publicOutput: OutPut, maxProofsVerified: 0 | 2 | 1, domainLog2?: number | undefined): Promise<import("o1js").Proof<Input, OutPut>>;
            readonly provable: {
                toFields: (value: import("o1js").Proof<any, any>) => import("../../../../dist/node/lib/provable/field.js").Field[];
                toAuxiliary: (value?: import("o1js").Proof<any, any> | undefined) => any[];
                fromFields: (fields: import("../../../../dist/node/lib/provable/field.js").Field[], aux: any[]) => import("o1js").Proof<any, any>;
                sizeInFields(): number;
                check: (value: import("o1js").Proof<any, any>) => void;
                toValue: (x: import("o1js").Proof<any, any>) => import("../../../../dist/node/lib/proof-system/proof.js").ProofValue<any, any>;
                fromValue: (x: import("o1js").Proof<any, any> | import("../../../../dist/node/lib/proof-system/proof.js").ProofValue<any, any>) => import("o1js").Proof<any, any>;
                toCanonical?: ((x: import("o1js").Proof<any, any>) => import("o1js").Proof<any, any>) | undefined;
            };
            publicFields(value: import("o1js").ProofBase<any, any>): {
                input: import("../../../../dist/node/lib/provable/field.js").Field[];
                output: import("../../../../dist/node/lib/provable/field.js").Field[];
            };
            _proofFromBase64(proofString: string, maxProofsVerified: 0 | 2 | 1): unknown;
            _proofToBase64(proof: unknown, maxProofsVerified: 0 | 2 | 1): string;
        };
        compile({ cache, forceRecompile }?: {
            cache?: import("o1js").Cache | undefined;
            forceRecompile?: boolean | undefined;
        } | undefined): Promise<{
            verificationKey: {
                data: string;
                hash: import("../../../../dist/node/lib/provable/field.js").Field;
            };
            provers: import("../../../../dist/node/bindings.js").Pickles.Prover[];
            verify: (statement: import("../../../../dist/node/bindings.js").Pickles.Statement<import("../../../../dist/node/lib/provable/core/fieldvar.js").FieldConst>, proof: unknown) => Promise<boolean>;
        }>;
        digest(): Promise<string>;
        getMaxProofsVerified(): Promise<0 | 2 | 1>;
        setVerificationKeyUnsafe(verificationKey: {
            data: string;
            hash: string | import("../../../../dist/node/lib/provable/field.js").Field;
        }): void;
        runOutsideCircuit(run: () => void): void;
        analyzeMethods({ printSummary }?: {
            printSummary?: boolean | undefined;
        } | undefined): Promise<Record<string, {
            actions: number;
            rows: number;
            digest: string;
            gates: import("../../../../dist/node/bindings.js").Gate[];
            proofs: import("../../../../dist/node/lib/proof-system/proof.js").ProofClass[];
        }>>;
    };
    ModifiedDex: {
        new (address: PublicKey, tokenId?: import("../../../../dist/node/lib/provable/field.js").Field | undefined): {
            deploy(): Promise<void>;
            swapX(dx: UInt64): Promise<UInt64>;
            tokenX: PublicKey;
            tokenY: PublicKey;
            approveBase(forest: AccountUpdateForest): Promise<void>;
            /**
             * state which keeps track of total lqXY supply -- this is needed to calculate what to return when redeeming liquidity
             *
             * total supply is zero initially; it increases when supplying liquidity and decreases when redeeming it
             */
            totalSupply: State<UInt64>;
            /**
             * Mint liquidity tokens in exchange for X and Y tokens
             * @param dx input amount of X tokens
             * @param dy input amount of Y tokens
             * @return output amount of lqXY tokens
             *
             * This function fails if the X and Y token amounts don't match the current X/Y ratio in the pool.
             * This can also be used if the pool is empty. In that case, there is no check on X/Y;
             * instead, the input X and Y amounts determine the initial ratio.
             */
            supplyLiquidityBase(dx: UInt64, dy: UInt64): Promise<UInt64>;
            /**
             * Mint liquidity tokens in exchange for X and Y tokens
             * @param dx input amount of X tokens
             * @return output amount of lqXY tokens
             *
             * This uses supplyLiquidityBase as the circuit, but for convenience,
             * the input amount of Y tokens is calculated automatically from the X tokens.
             * Fails if the liquidity pool is empty, so can't be used for the first deposit.
             */
            supplyLiquidity(dx: UInt64): Promise<UInt64>;
            /**
             * Burn liquidity tokens to get back X and Y tokens
             * @param dl input amount of lqXY token
             * @return output amount of X and Y tokens, as a tuple [outputX, outputY]
             *
             * The transaction needs to be signed by the user's private key.
             *
             * Note: this is not a `@method` because there's nothing to prove which isn't already proven
             * by the called methods
             */
            redeemLiquidity(dl: UInt64): Promise<UInt64[]>;
            /**
             * Swap Y tokens for X tokens
             * @param dy input amount of Y tokens
             * @return output amount Y tokens
             *
             * The transaction needs to be signed by the user's private key.
             */
            swapY(dy: UInt64): Promise<UInt64>;
            /**
             * helper method to approve burning of user's liquidity.
             * this just burns user tokens, so there is no incentive to call this directly.
             * instead, the dex token holders call this and in turn pay back tokens.
             *
             * @param user caller address
             * @param dl input amount of lq tokens
             * @returns total supply of lq tokens _before_ burning dl, so that caller can calculate how much dx / dx to returns
             *
             * The transaction needs to be signed by the user's private key.
             */
            burnLiquidity(user: PublicKey, dl: UInt64): Promise<UInt64>;
            deriveTokenId(): import("../../../../dist/node/lib/provable/field.js").Field;
            readonly internal: {
                mint({ address, amount, }: {
                    address: PublicKey | AccountUpdate | SmartContract;
                    amount: number | bigint | UInt64;
                }): AccountUpdate;
                burn({ address, amount, }: {
                    address: PublicKey | AccountUpdate | SmartContract;
                    amount: number | bigint | UInt64;
                }): AccountUpdate;
                send({ from, to, amount, }: {
                    from: PublicKey | AccountUpdate | SmartContract;
                    to: PublicKey | AccountUpdate | SmartContract;
                    amount: number | bigint | UInt64;
                }): AccountUpdate;
            };
            forEachUpdate(updates: AccountUpdateForest, callback: (update: AccountUpdate, usesToken: import("../../../../dist/node/lib/provable/bool.js").Bool) => void): void;
            checkZeroBalanceChange(updates: AccountUpdateForest): void;
            approveAccountUpdate(accountUpdate: AccountUpdate | import("o1js").AccountUpdateTree): Promise<void>;
            approveAccountUpdates(accountUpdates: (AccountUpdate | import("o1js").AccountUpdateTree)[]): Promise<void>;
            transfer(from: PublicKey | AccountUpdate, to: PublicKey | AccountUpdate, amount: number | bigint | UInt64): Promise<void>;
            "__#4@#private": any;
            address: PublicKey;
            tokenId: import("../../../../dist/node/lib/provable/field.js").Field;
            init(): void;
            requireSignature(): void;
            skipAuthorization(): void;
            readonly self: AccountUpdate;
            newSelf(methodName?: string | undefined): AccountUpdate;
            sender: {
                self: SmartContract;
                getUnconstrained(): PublicKey;
                getAndRequireSignature(): PublicKey;
            };
            readonly account: import("../../../../dist/node/lib/mina/v1/precondition.js").Account;
            readonly network: import("../../../../dist/node/lib/mina/v1/precondition.js").Network;
            readonly currentSlot: import("../../../../dist/node/lib/mina/v1/precondition.js").CurrentSlot;
            approve(update: AccountUpdate | AccountUpdateForest | import("o1js").AccountUpdateTree): void;
            send(args: {
                to: PublicKey | AccountUpdate | SmartContract;
                amount: number | bigint | UInt64;
            }): AccountUpdate;
            readonly balance: {
                addInPlace(x: string | number | bigint | UInt64 | UInt32 | import("o1js").Int64): void;
                subInPlace(x: string | number | bigint | UInt64 | UInt32 | import("o1js").Int64): void;
            };
            events: {
                [key: string]: import("o1js").FlexibleProvablePure<any>;
            };
            emitEventIf<K_6 extends string | number>(condition: import("../../../../dist/node/lib/provable/bool.js").Bool, type: K_6, event: any): void;
            emitEvent<K_7 extends string | number>(type: K_7, event: any): void;
            fetchEvents(start?: UInt32 | undefined, end?: UInt32 | undefined): Promise<{
                type: string;
                event: {
                    data: import("o1js").ProvablePure<any>;
                    transactionInfo: {
                        transactionHash: string;
                        transactionStatus: string;
                        transactionMemo: string;
                    };
                };
                blockHeight: UInt32;
                blockHash: string;
                parentBlockHash: string;
                globalSlot: UInt32;
                chainStatus: string;
            }[]>;
        };
        MAX_ACCOUNT_UPDATES: number;
        _methods?: import("../../../../dist/node/lib/proof-system/zkprogram.js").MethodInterface[] | undefined;
        _methodMetadata?: Record<string, {
            actions: number;
            rows: number;
            digest: string;
            gates: import("../../../../dist/node/bindings.js").Gate[];
            proofs: import("../../../../dist/node/lib/proof-system/proof.js").ProofClass[];
        }> | undefined;
        _provers?: import("../../../../dist/node/bindings.js").Pickles.Prover[] | undefined;
        _verificationKey?: {
            data: string;
            hash: import("../../../../dist/node/lib/provable/field.js").Field;
        } | undefined;
        Proof(): {
            new ({ proof, publicInput, publicOutput, maxProofsVerified, }: {
                proof: unknown;
                publicInput: import("o1js").ZkappPublicInput;
                publicOutput: undefined;
                maxProofsVerified: 0 | 2 | 1; /**
                 * exercise the "timing" (vesting) feature to lock the received liquidity tokens.
                 *
                 * THIS IS HERE FOR TESTING!
                 *
                 * In reality, the timing feature is a bit awkward to use for time-locking liquidity tokens.
                 * That's because, if there is currently a vesting schedule on an account, we can't modify it.
                 * Thus, a liquidity provider would need to wait for their current tokens to unlock before being able to
                 * supply liquidity again (or, create another account to supply liquidity from).
                 */
            }): {
                verify(): void;
                verifyIf(condition: import("../../../../dist/node/lib/provable/bool.js").Bool): void;
                publicInput: import("o1js").ZkappPublicInput;
                publicOutput: undefined;
                proof: unknown;
                maxProofsVerified: 0 | 2 | 1;
                shouldVerify: import("../../../../dist/node/lib/provable/bool.js").Bool;
                declare(): boolean;
                toJSON(): import("o1js").JsonProof;
                publicFields(): {
                    input: import("../../../../dist/node/lib/provable/field.js").Field[];
                    output: import("../../../../dist/node/lib/provable/field.js").Field[];
                };
            };
            publicInputType: Omit<import("../../../../dist/node/lib/provable/types/provable-intf.js").Provable<{
                accountUpdate: import("../../../../dist/node/lib/provable/field.js").Field;
                calls: import("../../../../dist/node/lib/provable/field.js").Field;
            }, {
                accountUpdate: bigint;
                calls: bigint;
            }>, "fromFields"> & {
                fromFields: (fields: import("../../../../dist/node/lib/provable/field.js").Field[]) => {
                    accountUpdate: import("../../../../dist/node/lib/provable/field.js").Field;
                    calls: import("../../../../dist/node/lib/provable/field.js").Field;
                };
            } & {
                toInput: (x: {
                    accountUpdate: import("../../../../dist/node/lib/provable/field.js").Field;
                    calls: import("../../../../dist/node/lib/provable/field.js").Field;
                }) => {
                    fields?: import("../../../../dist/node/lib/provable/field.js").Field[] | undefined;
                    packed?: [import("../../../../dist/node/lib/provable/field.js").Field, number][] | undefined;
                };
                toJSON: (x: {
                    accountUpdate: import("../../../../dist/node/lib/provable/field.js").Field;
                    calls: import("../../../../dist/node/lib/provable/field.js").Field;
                }) => {
                    accountUpdate: string;
                    calls: string;
                };
                fromJSON: (x: {
                    accountUpdate: string;
                    calls: string;
                }) => {
                    accountUpdate: import("../../../../dist/node/lib/provable/field.js").Field;
                    calls: import("../../../../dist/node/lib/provable/field.js").Field;
                };
                empty: () => {
                    accountUpdate: import("../../../../dist/node/lib/provable/field.js").Field;
                    calls: import("../../../../dist/node/lib/provable/field.js").Field;
                };
            };
            publicOutputType: import("o1js").ProvablePureExtended<undefined, undefined, null>;
            tag: () => typeof SmartContract;
            fromJSON<S extends import("../../../../dist/node/lib/util/types.js").Subclass<typeof import("o1js").Proof>>(this: S, { maxProofsVerified, proof: proofString, publicInput: publicInputJson, publicOutput: publicOutputJson, }: import("o1js").JsonProof): Promise<import("o1js").Proof<import("o1js").InferProvable<S["publicInputType"]>, import("o1js").InferProvable<S["publicOutputType"]>>>;
            dummy<Input, OutPut>(publicInput: Input, publicOutput: OutPut, maxProofsVerified: 0 | 2 | 1, domainLog2?: number | undefined): Promise<import("o1js").Proof<Input, OutPut>>;
            readonly provable: {
                toFields: (value: import("o1js").Proof<any, any>) => import("../../../../dist/node/lib/provable/field.js").Field[];
                toAuxiliary: (value?: import("o1js").Proof<any, any> | undefined) => any[];
                fromFields: (fields: import("../../../../dist/node/lib/provable/field.js").Field[], aux: any[]) => import("o1js").Proof<any, any>;
                sizeInFields(): number;
                check: (value: import("o1js").Proof<any, any>) => void;
                toValue: (x: import("o1js").Proof<any, any>) => import("../../../../dist/node/lib/proof-system/proof.js").ProofValue<any, any>;
                fromValue: (x: import("o1js").Proof<any, any> | import("../../../../dist/node/lib/proof-system/proof.js").ProofValue<any, any>) => import("o1js").Proof<any, any>;
                toCanonical?: ((x: import("o1js").Proof<any, any>) => import("o1js").Proof<any, any>) | undefined;
            };
            publicFields(value: import("o1js").ProofBase<any, any>): {
                input: import("../../../../dist/node/lib/provable/field.js").Field[];
                output: import("../../../../dist/node/lib/provable/field.js").Field[];
            };
            _proofFromBase64(proofString: string, maxProofsVerified: 0 | 2 | 1): unknown;
            _proofToBase64(proof: unknown, maxProofsVerified: 0 | 2 | 1): string;
        };
        compile({ cache, forceRecompile }?: {
            cache?: import("o1js").Cache | undefined;
            forceRecompile?: boolean | undefined;
        } | undefined): Promise<{
            verificationKey: {
                data: string;
                hash: import("../../../../dist/node/lib/provable/field.js").Field;
            };
            provers: import("../../../../dist/node/bindings.js").Pickles.Prover[];
            verify: (statement: import("../../../../dist/node/bindings.js").Pickles.Statement<import("../../../../dist/node/lib/provable/core/fieldvar.js").FieldConst>, proof: unknown) => Promise<boolean>;
        }>;
        digest(): Promise<string>;
        getMaxProofsVerified(): Promise<0 | 2 | 1>;
        setVerificationKeyUnsafe(verificationKey: {
            data: string;
            hash: string | import("../../../../dist/node/lib/provable/field.js").Field;
        }): void;
        runOutsideCircuit(run: () => void): void;
        analyzeMethods({ printSummary }?: {
            printSummary?: boolean | undefined;
        } | undefined): Promise<Record<string, {
            actions: number;
            rows: number;
            digest: string;
            gates: import("../../../../dist/node/bindings.js").Gate[];
            proofs: import("../../../../dist/node/lib/proof-system/proof.js").ProofClass[];
        }>>;
    };
    getTokenBalances: () => {
        user: {
            MINA: bigint;
            X: bigint;
            Y: bigint;
            lqXY: bigint;
        };
        user2: {
            MINA: bigint;
            X: bigint;
            Y: bigint;
            lqXY: bigint;
        };
        dex: {
            X: bigint;
            Y: bigint;
        };
        tokenContract: {
            X: bigint;
            Y: bigint;
        };
        total: {
            lqXY: bigint;
        };
    };
};
/**
 * Simple token with API flexible enough to handle all our use cases
 */
declare class TokenContract extends BaseTokenContract {
    init(): Promise<void>;
    /**
     * DUMB STUFF FOR TESTING (delete in real app)
     *
     * mint additional tokens to some user, so we can overflow token balances
     */
    init2(): Promise<void>;
    approveBase(forest: AccountUpdateForest): Promise<void>;
}
declare let keys: Record<"user" | "tokenX" | "tokenY" | "dex" | "user2" | "user3", PrivateKey>, addresses: Record<"user" | "tokenX" | "tokenY" | "dex" | "user2" | "user3", PublicKey>;
declare let tokenIds: {
    X: import("../../../../dist/node/lib/provable/field.js").Field;
    Y: import("../../../../dist/node/lib/provable/field.js").Field;
    lqXY: import("../../../../dist/node/lib/provable/field.js").Field;
};
/**
 * Predefined accounts keys, labeled by the input strings. Useful for testing/debugging with consistent keys.
 */
declare function randomAccounts<K extends string>(createNewAccounts: boolean, ...names: [K, ...K[]]): {
    keys: Record<K, PrivateKey>;
    addresses: Record<K, PublicKey>;
};
