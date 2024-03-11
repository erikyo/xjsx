import { useEffect } from "./xjsx";
export * from "./jsx";
/**
 * Appends a child to a parent node, or updates the content of an existing child node.
 *
 * @param {Node} parent - the parent node to which the child will be appended
 * @param {Node|string} child - the child node or string content to be appended
 * @param {number} [index=0] - the index at which the child should be appended
 */
const appendChild = (parent, child, index = 0) => {
    if (Array.isArray(child)) {
        child.forEach((nestedChild, i) => appendChild(parent, nestedChild, i));
    }
    else {
        if (!parent.childNodes[index]) {
            parent.appendChild(child?.nodeType ? child : document.createTextNode(child));
        }
        else if (child !== parent.childNodes[index].data) {
            parent.childNodes[index].data = child;
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
    const element = tag === 'svg' ? document.createElementNS('http://www.w3.org/2000/svg', tag) : document.createElement(tag);
    Object.entries(props || {}).forEach(([name, value]) => {
        if (children) {
            for (let i = 0; i < element.children.length; i++) {
                appendChild(element, value, i);
            }
        }
        if (name.startsWith('on') && name.toLowerCase() in window)
            element.addEventListener(name.toLowerCase().substring(2), value);
        else if (name.startsWith('data-'))
            element.setAttribute(name, value);
        else if (name === 'children')
            return;
        else
            element.setAttribute(name, value);
    });
    useEffect(() => {
        const list = Array.isArray(children) ? children : [children];
        const res = list.map((child) => {
            return typeof child === 'function' ? child() : child;
        });
        appendChild(element, res);
    });
    return element;
};
export const jsxDEV = jsx;
export const Fragment = (props) => props.children;
export const render = (element, container) => {
    container.appendChild(element);
};
export const hydrate = (element, container) => {
    render(element, container);
};
export const jsxs = (tag, props) => jsx(tag, props);
export const jsxsDEV = jsxs;
