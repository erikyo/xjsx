let targetFunc;
/**
 * Observer class for xjsx
 */
class Observer {
    subs;
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
            if (isObject(acc[key]))
                target[key] = clone(acc[key], target[key]);
            else
                target[key] = acc[key];
        });
    }
    else {
        target = acc;
    }
    return target;
};
/**
 * Private functions
 */
const setter = (prx, dep) => (data) => {
    const result = isFunction(data) ? data(prx.data) : data;
    if (isObject(result))
        clone(result, prx.data);
    else
        prx.data = result;
    dep.notify();
};
/**
 * @param dep
 */
const createOptions = (dep) => ({
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
const useState = (data) => {
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
const useEffect = (fn) => {
    targetFunc = fn;
    targetFunc();
    targetFunc = null;
};

/**
 * Appends a child to a parent node, or updates the content of an existing child node.
 *
 * @param {Node} parent - the parent node to which the child will be appended
 * @param {Node|string} child - the child node or string content to be appended
 * @param {number} [j=0] - the index at which the child should be appended
 */
const appendChild = (parent, child, j = 0) => {
    if (Array.isArray(child)) {
        child.forEach((nestedChild, i) => appendChild(parent, nestedChild, i));
    }
    else {
        if (!parent.childNodes[j]) {
            parent.appendChild(child.nodeType ? child : document.createTextNode(child));
        }
        else if (child !== parent.childNodes[j].data) {
            parent.childNodes[j].data = child;
        }
    }
};
/**
 * Takes a component and returns an element
 * @param tag
 * @param props
 */
const jsx = (tag, props) => {
    if (!isValidElement(tag)) {
        throw new Error('Invalid element');
    }
    const { children } = props;
    if (typeof tag === 'function')
        return tag(props);
    if (typeof tag === 'string')
        return document.createTextNode(tag);
    /**
     * svg
     */
    if (tag === 'svg') {
        return document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    }
    const element = document.createElement(tag);
    Object.entries(props || {}).forEach(([name, value]) => {
        if (name.startsWith('on') && name.toLowerCase() in window)
            element.addEventListener(name.toLowerCase().substring(2), value);
        else
            element.setAttribute(name, value);
    });
    useEffect(() => {
        const list = Array.isArray(children) ? children : [children];
        const res = list.map((child) => {
            const value = typeof child === 'function' ? child() : child;
            return value;
        });
        appendChild(element, res);
    });
    return element;
};
const Fragment = (props) => props.children;
const createElement = (tag, props, ...children) => {
    return jsx(tag, { ...props, children });
};
const cloneElement = (element, props, ...children) => {
    return jsx(element, { ...props, children });
};
const render = (element, container) => {
    container.appendChild(element);
};
const hydrate = (element, container) => {
    render(element, container);
};
const hydrateRoot = (container, element) => {
    hydrate(element, container);
};
const createPortal = (element, container) => {
    container.appendChild(element);
};
const isValidElement = (element) => {
    return element && typeof element === 'object' && 'type' in element;
};
const jsxs = (tag, props) => jsx(tag, props);
const jsxDEV = jsx;
const jsxsDEV = jsxs;

export { Fragment, cloneElement, createElement, createPortal, hydrate, hydrateRoot, isValidElement, jsx, jsxDEV, jsxs, jsxsDEV, render, useEffect, useState };
