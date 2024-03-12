import {useEffect} from "./xjsx";

/**
 * Appends a child to a parent node, or updates the content of an existing child node.
 *
 * @param {Node} parent - the parent node to which the child will be appended
 * @param {Node|string} child - the child node or string content to be appended
 * @param {number} [index=0] - the index at which the child should be appended
 */
const appendChild = (parent: SVGSVGElement | HTMLElement, child: string | Node | Node[], index: number = 0) => {
    if (child === undefined) return;
    if (Array.isArray(child)) {
        child.forEach((nestedChild, i) => appendChild(parent, nestedChild, i));
    } else {
        if (!parent.childNodes[index]) {
            parent.appendChild(
                typeof child !== 'string' && child?.nodeType ? child : document.createTextNode(child)
            );
        } else if (child !== parent.childNodes[index].data) {
            parent.childNodes[index].data = child;
        }
    }
};

/**
 * Takes a component and returns an element
 * @param tag
 * @param props
 */
export const createElement = (tag: string | ((arg0: any) => any), props: { children: any; }) => {

    const { children } = props;

    if (tag === Fragment) return children

    if (typeof tag === 'function') return tag(props);

    const element = tag === 'svg'
        ? document.createElementNS( 'http://www.w3.org/2000/svg', tag)
        : document.createElement(tag)

    Object.entries(props || {}).forEach(([name, value]) => {
        if (name.startsWith('on') && name.toLowerCase() in window)
            element.addEventListener(name.toLowerCase().substring(2), value);
        else
            element.setAttribute(name, value);
    });

    useEffect(() => {
        const list = Array.isArray(children) ? children : [children];
        const res  = list.map((child) => {
            return typeof child === 'function' ? child() : child;
        });
        appendChild(element, res);
    });

    return element;
};

export const jsx = (tag, { children, ...attributes }) => createElement(tag, { children, ...attributes });

export function Fragment(props: { children: JSX.Element }) {
    return props.children;
}

export const render = (element, container) => {
    container.appendChild(element);
};

export const hydrate = (element, container) => {
    render(element, container);
}
