#!/usr/bin/env node
import {build} from "esbuild";

/**
 * Esbuild configuration
 *
 * @type {import("esbuild").BuildOptions} - esbuild options
 */
export const devOptions = {
    logLevel: "info",
    format: "esm",
    bundle: true,
    minify: true,
    entryPoints: ["src/index.ts", "src/jsx-runtime.ts"],
    outdir: "./lib/"
}

build(devOptions)
    .catch(() => process.exit(1))
