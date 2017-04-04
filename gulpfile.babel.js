const version = '2.0.3';


import {src, dest, task, watch} from 'gulp-es-next';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import header from 'gulp-header';
import bump from 'gulp-bump';
import pkg from './package.json';


const banner = ['/**',
        ' *  <%= pkg.name %> - Optimal requestAnimationFrame & cancelAnimationFrame polyfill',
        ' *   for modern development',
        ' *    Version:  v<%= pkg.version %>',
        ' *     License:  <%= pkg.license %>',
        ' *      Copyright <%= pkg.author %> 2015 All Rights Reserved.',
        ' *        github:  <%= pkg.repository.url %>',
        ' *‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾',
        ' */',
        ''
    ].join('\n');


const minBanner = ['/**',
        ' * <%= pkg.name %> - <%= pkg.description %>',
        ' * @version v<%= pkg.version %>',
        ' * @license <%= pkg.license %>',
        ' * Copyright <%= pkg.author %> 2015 All Rights Reserved.',
        ' */',
        ''
    ].join('\n');


task('Add header to ES version', function() {
    return src('./dist/request-frame-modern.es.js')
        .pipe(header(minBanner, {
            pkg: pkg
        }))
        .pipe(dest('./dist'));
});


task('Add header to UMD version', function() {
    return src('./dist/request-frame-modern.js')
        .pipe(header(minBanner, {
            pkg: pkg
        }))
        .pipe(dest('./dist'));
});


task('bump', function(){
  src(['./bower.json','./package.json'])
  .pipe(bump({version: version}))
  .pipe(dest('./'));
});


task('default', [
    'Add header to ES version',
    'Add header to UMD version'
]);
