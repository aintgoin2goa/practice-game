import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import serve from "rollup-plugin-serve";
import typescript from "@rollup/plugin-typescript";
import htmlTemplate from "rollup-plugin-generate-html-template";
import copy from "rollup-plugin-copy";

export default {
  //  Our game entry point (edit as required)
  input: ["./src/index.ts"],

  //  Where the build file is to be generated.
  //  Most games being built for distribution can use iife as the module type.
  //  You can also use 'umd' if you need to ingest your game into another system.
  //  If using Phaser 3.21 or **below**, add: `intro: 'var global = window;'` to the output object.
  output: {
    dir: "dist",
    name: "Connect4",
    format: "iife",
    sourcemap: true,
    entryFileNames: "[name].[hash].js",
  },

  plugins: [
    //  Toggle the booleans here to enable / disable Phaser 3 features:
    replace({
      preventAssignment: true,
      "typeof CANVAS_RENDERER": JSON.stringify(true),
      "typeof WEBGL_RENDERER": JSON.stringify(true),
      "typeof WEBGL_DEBUG": JSON.stringify(true),
      "typeof EXPERIMENTAL": JSON.stringify(true),
      "typeof PLUGIN_CAMERA3D": JSON.stringify(false),
      "typeof PLUGIN_FBINSTANT": JSON.stringify(false),
      "typeof FEATURE_SOUND": JSON.stringify(true),
    }),

    //  Parse our .ts source files
    nodeResolve({
      extensions: [".ts", ".tsx"],
    }),

    //  We need to convert the Phaser 3 CJS modules into a format Rollup can use:
    commonjs({
      include: ["node_modules/eventemitter3/**", "node_modules/phaser/**"],
      exclude: [
        "node_modules/phaser/src/polyfills/requestAnimationFrame.js",
        "node_modules/phaser/src/phaser-esm.js",
      ],
      sourceMap: true,
      ignoreGlobal: true,
    }),

    copy({
      targets: [{ src: "assets/**/*", dest: "dist/assets/" }],
    }),

    htmlTemplate({
      template: "src/template.html",
      target: "index.html",
    }),

    //  See https://github.com/rollup/plugins/tree/master/packages/typescript for config options
    typescript(),

    //  See https://www.npmjs.com/package/rollup-plugin-serve for config options
    serve({
      open: true,
      contentBase: "dist",
      host: "localhost",
      port: 10001,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }),
  ],
};
