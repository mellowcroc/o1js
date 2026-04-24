import { PublicKey, UInt64 } from '../../../../../index.js';
import * as Mina from '../../mina.js';
import { ExampleContract } from './ExampleContract.js';
export { transfer, settle };
declare function transfer(contract: ExampleContract, sender: Mina.TestPublicKey, receiver: PublicKey, amount: UInt64): Promise<void>;
declare function settle(contract: ExampleContract, sender: Mina.TestPublicKey): Promise<void>;
