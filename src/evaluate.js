const jsdom = require( 'jsdom' );
const { JSDOM } = jsdom;
const utils = require( './utils' );
const scriptContent = utils.getFileContentsSync( '../build/evaluator-bundle.js' );

// TODO: optimize performance

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
    window.XPathJS.bindDomLevel3XPath( window.xmlDoc, {} );

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

    // Remove default namespace
    if ( window.xmlDoc.documentElement.getAttribute( 'xmlns' ) ) {
        window.xmlDoc.documentElement.removeAttribute( 'xmlns' );
    }

    // Create namespace resolver
    const namespaces = _getNameSpaces( window.xmlDoc );
    const nsResolver = {
        lookupNamespaceURI( prefix ) {
            return namespaces[ prefix ] || null;
        }
    };

    // Evaluate XPath
    const result = window.xmlDoc.evaluate( expr, contextNode, nsResolver, 2 );
    return result.stringValue;
}

function _getNameSpaces( xmlDoc ) {
    const namespaces = {};
    const root = xmlDoc.documentElement;

    // For now, we only look at the root node for namespace declarations.
    // TODO: When needed, look at whole document for namespace declarations
    if ( root.hasAttributes() ) {
        Array.from( root.attributes ).forEach( attribute => {
            if ( attribute.name.indexOf( 'xmlns:' ) === 0 ) {
                namespaces[ attribute.name.substring( 6 ) ] = attribute.value;
            }
        } );
    }

    return namespaces;
}

module.exports = evaluateXPath;