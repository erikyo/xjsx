
let targetFunc;

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
const isFunction = (target) => typeof target === 'function';
const isObject = (target) => typeof target === 'object' && target !== null;
const clone = (acc, target) => {
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
const createOptions = (dep) => ({
    get(target, key) {
        dep.add();
        if (isObject(target[key]))
            return new Proxy(target[key], createOptions(dep));
        return target[key];
    },
});

/**
 * Public functions
 */
export const useState = (data) => {
    const dep = new Observer();
    const prx = new Proxy({ data }, createOptions(dep));
    return [() => prx.data, setter(prx, dep)];
};
export const useEffect = (fun) => {
    targetFunc = fun;
    targetFunc();
    targetFunc = null;
};
