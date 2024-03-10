import { useEffect } from './xjsx';
export type JSX = typeof jsx;

const appendChild = (parent, child, j = 0) => {
    if (Array.isArray(child)) {
        child.forEach((nestedChild, i) => appendChild(parent, nestedChild, i));
    } else {
        if (!parent.childNodes[j]) {
            parent.appendChild(
                child.nodeType ? child : document.createTextNode(child)
            );
        } else if (child !== parent.childNodes[j].data) {
            parent.childNodes[j].data = child;
        }
    }
};

export const jsx = (tag, props) => {
    const { children } = props;
    if (typeof tag === 'function') return tag(props);

    const element = document.createElement(tag);
    Object.entries(props || {}).forEach(([name, value]) => {
        if (name.startsWith('on') && name.toLowerCase() in window)
            element.addEventListener(name.toLowerCase().substr(2), value);
        else element.setAttribute(name, value);
    });

    // appendChild(element, children);
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

export const cloneElement = (element, props, ...children) => {
    return jsx(element, { ...props, children });
}

export const render = (element, container) => {
    container.appendChild(element);
};

export const hydrate = (element, container) => {
    render(element, container);
}

export const hydrateRoot = (container, element) => {
    hydrate(element, container);
}

export const isValidElement = (element) => {
    return element && typeof element === 'object' && 'type' in element;
}

export const jsxs = (tag, props) => jsx(tag, props);

export const jsxDEV = jsx

export const jsxsDEV = jsxs
