#!/usr/bin/env node

'use strict';

let program = require( 'commander' );
const pkg = require( './package' );
const evaluateXPath = require( './src/evaluate' );
const utils = require( './src/utils' );

const _output = ( issues = [], error = false ) => {
    if ( issues.length ) {
        console[ error ? 'error' : 'log' ]( `\n\n${issues.join( '\n\n' )}` );
    }
};

program
    .usage( '<expression>' )
    .option( '-x --xml <file>', 'path to XML file to evaluate expression on which is required if the context is provided' )
    .option( '-c --context <path>', 'path to XML context node for the evaluation' )
    .version( pkg.version )
    .parse( process.argv );

program.parse( process.argv );

const expr = program.args[ 0 ];
const xmlFile = program.xml;
const context = program.context;

if ( !expr ) {
    console.error( 'Nothing to do. Missing expression. Use --help flag to see manual.' );
    process.exit( 1 );
} else if ( context && !xmlFile ) {
    console.error( 'If a context is provided, an XML file has to be provided as well. Use --help flag to see manual.' );
    process.exit( 1 );
}


if ( expr ) {
    utils.getFileContents( xmlFile )
        .then( xmlFile => evaluateXPath( xmlFile, expr, context ) )
        .catch( ( errors = [] ) => {
            errors = Array.isArray( errors ) ? errors : [ errors ];
            _output( errors, true );
            process.exit( 1 );
        } )
        .then( ( result = '' ) => {
            console.log( result );
            process.exit( 0 );
        } );

} else {

}