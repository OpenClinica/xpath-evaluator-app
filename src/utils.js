const fs = require( 'fs' );
const path = require( 'path' );

function getFileContents( filePath ) {
    return new Promise( ( resolve, reject ) => {
        if ( filePath ) {
            fs.readFile( filePath, 'utf8', ( err, xform ) => {
                if ( err ) {
                    if ( err.code === 'ENOENT' ) {
                        err = `File: ${filePath} does not exist.`;
                    }
                    reject( err );
                } else {
                    resolve( xform );
                }
            } );
        } else {
            resolve();
        }
    } );
};

function getFileContentsSync( filePath ) {
    return fs.readFileSync( path.join( __dirname, filePath ), { encoding: 'utf-8' } );
}

// TODO: remove async function?

module.exports = {
    getFileContents,
    getFileContentsSync
}