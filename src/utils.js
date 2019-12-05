const fs = require( 'fs' );

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

module.exports = {
    getFileContents
}