import { Field, SmartContract, State, DeployArgs } from 'o1js';
export declare class DummyContract extends SmartContract {
    sum: State<import("../../../../dist/node/lib/provable/field.js").Field>;
    deploy(args: DeployArgs): Promise<void>;
    /**
     * Method used to add two variables together.
     */
    add(x: Field, y: Field): Promise<void>;
}
