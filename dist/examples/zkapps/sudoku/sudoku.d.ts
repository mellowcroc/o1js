import { SmartContract, State } from 'o1js';
export { Sudoku, SudokuZkApp };
declare const Sudoku_base: (new (value: {
    value: import("../../../../dist/node/lib/provable/field.js").Field[][];
}) => {
    value: import("../../../../dist/node/lib/provable/field.js").Field[][];
}) & {
    _isStruct: true;
} & Omit<import("../../../../dist/node/lib/provable/types/provable-intf.js").Provable<{
    value: import("../../../../dist/node/lib/provable/field.js").Field[][];
}, {
    value: bigint[][];
}>, "fromFields"> & {
    fromFields: (fields: import("../../../../dist/node/lib/provable/field.js").Field[]) => {
        value: import("../../../../dist/node/lib/provable/field.js").Field[][];
    };
} & {
    fromValue: (value: {
        value: import("../../../../dist/node/lib/provable/field.js").Field[][] | bigint[][];
    }) => {
        value: import("../../../../dist/node/lib/provable/field.js").Field[][];
    };
    toInput: (x: {
        value: import("../../../../dist/node/lib/provable/field.js").Field[][];
    }) => {
        fields?: import("../../../../dist/node/lib/provable/field.js").Field[] | undefined;
        packed?: [import("../../../../dist/node/lib/provable/field.js").Field, number][] | undefined;
    };
    toJSON: (x: {
        value: import("../../../../dist/node/lib/provable/field.js").Field[][];
    }) => {
        value: string[][];
    };
    fromJSON: (x: {
        value: string[][];
    }) => {
        value: import("../../../../dist/node/lib/provable/field.js").Field[][];
    };
    empty: () => {
        value: import("../../../../dist/node/lib/provable/field.js").Field[][];
    };
};
declare class Sudoku extends Sudoku_base {
    static from(value: number[][]): Sudoku;
    hash(): import("../../../../dist/node/lib/provable/field.js").Field;
}
declare class SudokuZkApp extends SmartContract {
    sudokuHash: State<import("../../../../dist/node/lib/provable/field.js").Field>;
    isSolved: State<import("../../../../dist/node/lib/provable/bool.js").Bool>;
    /**
     * by making this a `@method`, we ensure that a proof is created for the state initialization.
     * alternatively (and, more efficiently), we could have used `super.init()` inside `update()` below,
     * to ensure the entire state is overwritten.
     * however, it's good to have an example which tests the CLI's ability to handle init() decorated with `@method`.
     */
    init(): Promise<void>;
    update(sudokuInstance: Sudoku): Promise<void>;
    submitSolution(sudokuInstance: Sudoku, solutionInstance: Sudoku): Promise<void>;
}
