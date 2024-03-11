export { JSX } from "./jsx";
/**
 * Takes a component and returns an element
 * @param tag
 * @param props
 */
export declare const jsx: (tag: string | ((arg0: any) => any), props: {
    children: any;
}) => any;
export declare const jsxs: (tag: any, props: any) => any;
/** export jsx runtime for development */
export declare const jsxDEV: (tag: string | ((arg0: any) => any), props: {
    children: any;
}) => any;
export declare const jsxsDEV: (tag: any, props: any) => any;
export declare const Fragment: (props: any) => any;
export declare const render: (element: any, container: any) => void;
export declare const hydrate: (element: any, container: any) => void;
