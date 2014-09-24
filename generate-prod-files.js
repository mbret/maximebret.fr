var fs = require('fs')
var dirIndexHTML = 'public_html';
var dirCSS =  'public_html/assets/css';
var compressor = require('node-minify');

/**
 * Run complete job
 */
generateHTML( function(){
    console.log('finished generate HTML files');
});
generateCSS( function(){
    console.log('finished generate CSS files');
} );

/**
 * - minify
 * - replace files references by files.min references
 *
 * @param cb
 */
function generateHTML( cb ){
    fs.readFile( dirIndexHTML + '/index.html', 'utf8', function (err,data) {
        if (err) throw err;

        // Replace references
        var result = data.replace(/style.css/g, 'style.min.css');
        var result = data.replace(/animation.css/g, 'animation.min.css');

        // Minify
        var minifiedHTML = require('html-minifier').minify( result, {
            removeComments: true,
            removeCommentsFromCDATA: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeAttributeQuotes: true,
            removeEmptyAttributes: false
        });

        // Save new file
        fs.writeFile( dirIndexHTML + '/index.min.html', minifiedHTML, 'utf8', function (err) {
            if (err) throw err;
            return cb();
        });
    });
}

/**
 * - minify
 * @param cb
 */
function generateCSS( cb ){
    _compressStyle( _compressAnimation( cb ) );
}

function _compressStyle( cb ){
    new compressor.minify({
        type: 'yui-css',
        fileIn: dirCSS + '/style.css',
        fileOut: dirCSS + '/style.min.css',
        callback: function(err, min){
            if (err) throw err;
            if( cb ) return cb();
        }
    });
}

function _compressAnimation( cb ){
    new compressor.minify({
        type: 'yui-css',
        fileIn: dirCSS + '/animation.css',
        fileOut: dirCSS + '/animation.min.css',
        callback: function(err, min){
            if (err) throw err;
            if( cb ) return cb();
        }
    });
}