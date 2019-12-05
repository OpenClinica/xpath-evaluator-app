const jsdom = require( 'jsdom' );
const { JSDOM } = jsdom;
const utils = require( './utils' );
const scriptContent = utils.getFileContentsSync( '../build/evaluator-bundle.js' );

function evaluateXPath( xmlStr = '<_/>', expr, contextPath ) {
    // Let any logging by Enketo Core fall into the abyss.
    const virtualConsole = new jsdom.VirtualConsole();
    const { window } = new JSDOM( '', {
        runScripts: 'dangerously',
        virtualConsole: virtualConsole
    } );

    // Add script to DOM
    const scriptEl = window.document.createElement( 'script' );
    scriptEl.textContent = scriptContent;
    window.document.body.appendChild( scriptEl );
    window.xmlDoc = new window.DOMParser().parseFromString( xmlStr, 'text/xml' );
    window.XPathJS.bindDomLevel3XPath( window.xmlDoc );

    // Output XML document errors
    const parserError = window.xmlDoc.querySelector( 'parsererror' );
    if ( parserError ) {
        throw new Error( `Invalid XML document: ${parserError.textContent}` );
    }

    // Find context node
    let contextNode = window.xmlDoc;
    if ( contextPath ) {
        const contextResult = window.xmlDoc.evaluate( contextPath, window.xmlDoc, null, 9 );
        contextNode = contextResult ? contextResult.singleNodeValue : context;
    }

    // Evaluate XPath
    const result = window.xmlDoc.evaluate( expr, contextNode, null, 2 );
    return result.stringValue;
}

module.exports = evaluateXPath;