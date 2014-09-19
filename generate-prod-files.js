var fs = require('fs')
var dirIndexHTML = 'public_html/dev';
var dirCSS =  'public_html/dev/assets/css';

generateHTML( function(){
    generateCSS( function(){
        console.log('finished generate production files');
    } );
});

function generateHTML( cb ){
    fs.readFile( dirIndexHTML + '/index.html', 'utf8', function (err,data) {
        if (err) throw err;

        var result = data.replace(/style.css/g, 'style.min.css');

        var minifiedHTML = require('html-minifier').minify( result, {
            removeComments: true,
            removeCommentsFromCDATA: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeAttributeQuotes: true,
            removeEmptyAttributes: false
        });

        fs.writeFile( dirIndexHTML + '/index.min.html', minifiedHTML, 'utf8', function (err) {
            if (err) throw err;
            return cb();
        });
    });
}

function generateCSS( cb ){
    fs.readFile( dirCSS + '/style.css', 'utf8', function (err,data) {
        if (err) throw err;

        var dataMinifier = data;

        fs.writeFile( dirCSS + '/style.min.css', dataMinifier, 'utf8', function (err) {
            if (err) throw err;

            return cb();
        });
    });
}