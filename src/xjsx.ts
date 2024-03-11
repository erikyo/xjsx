let targetFunc: Function | null;

/**
 * Observer class for xjsx
 */
class Observer {
    private subs: Set<any>;
    constructor() {
        this.subs = new Set();
    }
    add() {
        targetFunc && this.subs.add(targetFunc);
    }
    notify() {
        this.subs.forEach((sub) => sub && sub());
    }
}

/**
 * Helper functions
 */
const isFunction = (target: any) => typeof target === 'function';
const isObject = (target: any) => typeof target === 'object' && target !== null;
const clone = (acc: { [x: string]: any; }, target: { [x: string]: any; }) => {
    if (isObject(acc)) {
        Object.keys(acc).forEach((key) => {
            if (isObject(acc[key])) target[key] = clone(acc[key], target[key]);
            else target[key] = acc[key];
        });
    } else {
        target = acc;
    }
    return target;
};

/**
 * Private functions
 */
const setter = (prx, dep) => (data) => {
    const result = isFunction(data) ? data(prx.data) : data;
    if (isObject(result)) clone(result, prx.data);
    else prx.data = result;
    dep.notify();
};

/**
 * @param dep
 */
const createOptions: (dep: any) => { get(target: any, key: any): (any) } = (dep: any) => ({
    get(target, key) {
        dep.add();
        if (isObject(target[key]))
            return new Proxy(target[key], createOptions(dep));
        return target[key];
    },
});

/** Public functions */

/**
 * A function that creates a state variable and returns a getter and setter function.
 *
 * @param {any} data - the initial value of the state variable
 * @return {Array<Function>} an array containing the getter and setter functions
 */
export const useState = (data: any): Array<Function> => {
    const dep = new Observer();
    const prx = new Proxy({ data }, createOptions(dep));
    return [() => prx.data, setter(prx, dep)];
};

/**
 * Executes the given function and sets targetFunc to null after execution.
 *
 * @param {function} fn - The function to be executed
 * @return {void}
 */
export const useEffect = (fn: Function): void => {
    targetFunc = fn;
    targetFunc();
    targetFunc = null;
};

export const useCallback = (fn: Function): Function => {
    return fn;
};

export const useRef = (data: any): { current: any } => {
    return { current: data };
}
