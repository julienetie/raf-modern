import babel from 'rollup-plugin-babel';

export default {
    moduleName: 'requestFrameModern',
    entry: 'src/request-frame-modern.js',
    plugins: [babel({
        babelrc: false,
        exclude: 'node_modules/**'
    })],
    format: 'es',
    dest: 'dist/request-frame-modern.es.js'
};
