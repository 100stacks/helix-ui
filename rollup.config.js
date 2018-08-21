import babel from 'rollup-plugin-babel';
import html from 'rollup-plugin-html';
import json from 'rollup-plugin-json';
import { uglify } from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';
import less from './lib/rollup-plugin-less';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import eslint from 'rollup-plugin-eslint';

let htmlPlugin = html ({
    include: [
        '**/*.svg',
        '**/*.html',
    ],
    htmlMinifierOptions: {
        collapseWhitespace: true,
        quoteCharacter: "'", // reduces escape characters
    },
});

let babelPlugin = babel({
    exclude: 'node_modules/**/*',
});

let lessPlugin = less({
    options: {
        paths: [
            'src/helix-ui/styles',
        ]
    }
});

let eslintPlugin = eslint({
    include: [
        '**/*.js',
    ],
});

let browserConfig = {
    input: 'src/browser-entry.mjs',
    output: {
        file: 'dist/scripts/helix-ui.browser.js',
        footer: 'HelixUI.initialize();', // initialize on load
        format: 'umd',
        name: 'HelixUI',
        sourcemap: false,
    },
    plugins: [
        json(),
        resolve(),
        commonjs(),
        htmlPlugin,
        lessPlugin,
        babelPlugin,
    ],
};

export default [
    // src/browser-entry.mjs --> dist/helix-ui.browser.js (UMD)
    browserConfig,

    // src/browser-entry.mjs --> dist/helix-ui.browser.min.js (UMD)
    {
        ...browserConfig,
        output: {
            ...browserConfig.output,
            file: 'dist/scripts/helix-ui.browser.min.js',
        },
        plugins: [
            eslintPlugin,
            ...browserConfig.plugins,
            uglify({}, minify),
        ],
    },
]
