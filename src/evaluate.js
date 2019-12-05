const jsdom = require( 'jsdom' );
const { JSDOM } = jsdom;
const utils = require( './utils' );
const scriptContent = utils.getFileContentsSync( '../build/evaluator-bundle.js' );

function evaluateXPath( xmlStr, expr, contextPath ) {
    // Let any logging by Enketo Core fall into the abyss.
    const virtualConsole = new jsdom.VirtualConsole();
    const { window } = new JSDOM( '', {
        runScripts: 'dangerously',
        virtualConsole: virtualConsole
    } );
    const scriptEl = window.document.createElement( 'script' );

    scriptEl.textContent = scriptContent;
    window.document.body.appendChild( scriptEl );
    // TODO: throw exception for parse errors (I think they are now silently included in XML result)
    window.xmlDoc = new window.DOMParser().parseFromString( xmlStr, 'text/xml' );
    window.XPathJS.bindDomLevel3XPath( window.xmlDoc );

    let contextNode = window.xmlDoc;

    if ( contextPath ) {
        const contextResult = window.xmlDoc.evaluate( contextPath, window.xmlDoc, null, 9 );
        contextNode = contextResult ? contextResult.singleNodeValue : context;
    }

    const result = window.xmlDoc.evaluate( expr, contextNode, null, 2 );

    return result.stringValue;


}

module.exports = evaluateXPath;