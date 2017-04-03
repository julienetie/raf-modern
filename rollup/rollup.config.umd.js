import babel from 'rollup-plugin-babel';

export default {
    moduleName: 'requestFrameModern',
    entry: './src/request-frame-modern.js',
    plugins: [babel({
        babelrc: false,
        presets: ["es2015-rollup"]
    })],
    format: 'umd',
    dest: './dist/request-frame-modern.js'
};
