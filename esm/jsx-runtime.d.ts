export * from "./jsx";
/**
 * Takes a component and returns an element
 * @param tag
 * @param props
 */
export declare const jsx: (tag: any, props: any) => any;
export type JSX = typeof jsx;
export declare const jsxDEV: (tag: any, props: any) => any;
export declare const Fragment: (props: any) => any;
export declare const render: (element: any, container: any) => void;
export declare const hydrate: (element: any, container: any) => void;
export declare const jsxs: (tag: any, props: any) => any;
export declare const jsxsDEV: (tag: any, props: any) => any;
