/** Public functions */
/**
 * A function that creates a state variable and returns a getter and setter function.
 *
 * @param {any} data - the initial value of the state variable
 * @return {Array<Function>} an array containing the getter and setter functions
 */
export declare const useState: (data: any) => Array<Function>;
/**
 * Executes the given function and sets targetFunc to null after execution.
 *
 * @param {function} fn - The function to be executed
 * @return {void}
 */
export declare const useEffect: (fn: Function) => void;
export declare const useCallback: (fn: Function) => Function;
export declare const useRef: (data: any) => {
    current: any;
};
//# sourceMappingURL=xjsx.d.ts.map