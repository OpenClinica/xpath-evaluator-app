#!/usr/bin/env node

const { Command } = require( 'commander' );
const program = new Command();
const pkg = require( './package' );
const evaluateXPath = require( './src/evaluate' );
const utils = require( './src/utils' );

const _output = ( issues = [], error = false ) => {
    if ( issues.length ) {
        console[ error ? 'error' : 'log' ]( `\n\n${issues.join( '\n\n' )}` );
    }
};

program
    .argument( '<expression>', 'XPath expression to evaluate' )
    .option( '-x --xml <file>', 'path to XML file to evaluate expression on which is required if the context is provided' )
    .option( '-c --context <path>', 'path to XML context node for the evaluation' )
    .version( pkg.version )
    .action((expression, options) => {
        
        if (!expression){
            console.error( 'Nothing to do. Missing expression. Use --help flag to see manual.' );
            process.exit( 1 );
        } else if ( options.context && !options.xml ) {
            console.error( 'If a context is provided, an XML file has to be provided as well. Use --help flag to see manual.' );
            process.exit( 1 );
        }
        
        console.time('total');
        utils.getFileContents( options.xml )
            .then( xmlFile => evaluateXPath( xmlFile, expression, options.context ) )
            .catch( ( errors = [] ) => {
                errors = Array.isArray( errors ) ? errors : [ errors ];
                _output( errors, true );
                process.exit( 1 );
            } )
            .then( ( result = '' ) => {
                console.timeEnd('total');
                console.log( result );
                process.exit( 0 );
            } );
    }); 

    program.parse();