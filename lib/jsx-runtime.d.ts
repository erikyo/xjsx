import { JSX } from "./jsx";
/**
 * Takes a component and returns an element
 * @param tag
 * @param props
 */
export declare const createElement: (tag: string | ((arg0: any) => any), props: {
    children: any;
}) => any;
export declare const jsx: (tag: any, { children, ...attributes }: {
    [x: string]: any;
    children: any;
}) => any;
/** export jsx runtime for development */
export declare const jsxDEV: (tag: any, { children, ...attributes }: {
    [x: string]: any;
    children: any;
}) => any;
export declare function Fragment(props: {
    children: JSX.Element;
}): JSX.Element;
export declare const render: (element: any, container: any) => void;
export declare const hydrate: (element: any, container: any) => void;
