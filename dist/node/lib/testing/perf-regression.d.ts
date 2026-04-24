/**
 * Regression testing framework for individual ZkProgram examples.
 *
 * Stores and compares metadata such as compile, proving, and verifying times.
 * Can run in two modes:
 * - **Dump**: write baseline results into
 *   {@link tests/perf-regression/perf-regression.json}
 * - **Check**: validate current results against the stored baselines
 *
 * For regression testing of constraint systems (CS) and zkApps,
 * see {@link tests/perf-regression/perf-regression.ts}.
 *
 * @note
 * Command-line arguments:
 * - `--dump` (alias `-d`): dump performance data into the baseline file.
 * - `--check` (alias `-c`): check performance against the existing baseline.
 * - `--file` (alias `-f`): specify a custom JSON path (default: `./tests/perf-regression/perf-regression.json`).
 * - `--silent`: suppress all console output.
 *
 * These flags are mutually exclusive for modes (`--dump` and `--check` cannot be used together).
 * When neither is provided, the script runs in log-only mode.
 */
import { ConstraintSystemSummary } from '../provable/core/provable-context.js';
export { PerfRegressionEntry, Performance, logPerf };
type MethodsInfo = Record<string, {
    rows: number;
    digest: string;
    proveTime?: number;
    verifyTime?: number;
}>;
type PerfRegressionEntry = {
    digest?: string;
    compileTime?: number;
    methods: MethodsInfo;
};
declare const Performance: {
    /**
     * Initialize a new performance session.
     *
     * @param programName Optional identifier for the program or label.
     *   - With a ZkProgram name and its `methodsSummary`, the session benchmarks
     *     compile, prove, and verify phases, storing or checking results against
     *     `perf-regression.json`.
     *   - Without a ZkProgram, `programName` acts as a freeform label and the session
     *     can be used like `console.time` / `console.timeEnd` to log timestamps.
     * @param methodsSummary Optional analysis of ZkProgram methods, required when
     *   measuring prove/verify performance.
     * @param log Optional boolean flag (default: `true`).
     *   - When set to `false`, disables all console output for both general labels
     *     and compile/prove/verify phase logs.
     *   - When the `--silent` flag is provided, it overrides this setting and disables
     *     all logging regardless of the `log` value.
     */
    create(programName?: string, methodsSummary?: Record<string, ConstraintSystemSummary>, log?: boolean): {
        /**
         * Start measuring performance for a given phase.
         *
         * @param label The phase label: `'compile' | 'prove' | 'verify' | string`
         * @param methodName Method name (required for `prove` and `verify`)
         */
        start(label?: 'compile' | 'prove' | 'verify' | string, methodName?: string): void;
        /**
         * End the most recent measurement and:
         * - Logs results to the console by default. This can be disabled by setting `log` to `false`
         *   when creating the session, or by passing the `--silent` flag when running the file.
         * - Dump into baseline JSON (if `--dump`)
         * - Check against baseline (if `--check`)
         */
        end(): void;
    };
};
declare function logPerf(scope: string, label: string, expected: number, actual: number, regressionPct: number, allowedPct: number, failed: boolean): void;
