import { PrivateKey, PublicKey } from 'o1js';
export { randomAccounts };
/**
 * Predefined accounts keys, labeled by the input strings. Useful for testing/debugging with consistent keys.
 */
declare function randomAccounts<K extends string>(...names: [K, ...K[]]): {
    keys: Record<K, PrivateKey>;
    addresses: Record<K, PublicKey>;
};
