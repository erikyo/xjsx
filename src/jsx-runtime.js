import { useEffect } from "./xjsx";
export * from "./jsx";
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
            parent.appendChild(child?.nodeType ? child : document.createTextNode(child));
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
export const jsx = (tag, props) => {
    const { children } = props;
    if (typeof tag === 'function')
        return tag(props);
    /**
     * svg
     */
    if (tag === 'svg') {
        return document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    }
    const element = document.createElement(tag);
    Object.entries(props || {}).forEach(([name, value]) => {
        if (children) {
            for (let i = 0; i < element.children.length; i++) {
                appendChild(element, value, i);
            }
        }
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
export const Fragment = (props) => props.children;
export const createElement = (tag, props, ...children) => {
    return jsx(tag, { ...props, children });
};
export const createSvgElement = (tag, props, ...children) => {
    return jsx(tag, { ...props, children });
};
export const cloneElement = (element, props, ...children) => {
    return jsx(element, { ...props, children });
};
export const render = (element, container) => {
    container.appendChild(element);
};
export const hydrate = (element, container) => {
    render(element, container);
};
export const hydrateRoot = (container, element) => {
    hydrate(element, container);
};
export const createPortal = (element, container) => {
    container.appendChild(element);
};
export const isValidElement = (element) => {
    return element && typeof element === 'object' && 'type' in element;
};
export const jsxs = (tag, props) => jsx(tag, props);
export const jsxDEV = jsx;
export const jsxsDEV = jsxs;
