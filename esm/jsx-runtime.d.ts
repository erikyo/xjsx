export * from "./jsx";
/**
 * Takes a component and returns an element
 * @param tag
 * @param props
 */
export declare const jsx: (tag: any, props: any) => any;
export type JSX = typeof jsx;
export declare const Fragment: (props: any) => any;
export declare const createElement: (tag: any, props: any, ...children: any[]) => any;
export declare const createSvgElement: (tag: any, props: any, ...children: any[]) => any;
export declare const cloneElement: (element: any, props: any, ...children: any[]) => any;
export declare const render: (element: any, container: any) => void;
export declare const hydrate: (element: any, container: any) => void;
export declare const hydrateRoot: (container: any, element: any) => void;
export declare const createPortal: (element: any, container: any) => void;
export declare const isValidElement: (element: any) => boolean;
export declare const jsxs: (tag: any, props: any) => any;
export declare const jsxDEV: (tag: any, props: any) => any;
export declare const jsxsDEV: (tag: any, props: any) => any;
