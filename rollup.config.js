import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    input: 'src/evaluator.js',
    output: {
        file: 'build/evaluator-bundle.js',
        format: 'iife',
    },
    plugins: [
        resolve( {
            browser: true,
        } ),
        commonjs( {
            include: 'node_modules/**',
            sourceMap: false,
        } )
    ]
};