import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    input: 'src/evaluator.js',
    output: {
        file: 'build/evaluator-bundle.js',
        format: 'cjs',
    },
    plugins: [
        resolve( {
            browser: false,
        } ),
        commonjs( {
            include: 'node_modules/**',
            sourceMap: false,
        } )
    ]
};