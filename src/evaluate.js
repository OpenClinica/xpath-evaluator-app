const DOMParser = require( 'xmldom' ).DOMParser;
const utils = require( './utils' );
const XPathJS = require( '../build/evaluator-bundle' );

// TODO: optimize performance

function evaluateXPath( xmlStr = '<_/>', expr, contextPath ) {
    const xmlDoc = new DOMParser().parseFromString( xmlStr, 'text/xml' );
    XPathJS.bindDomLevel3XPath( xmlDoc );

    // Output XML document errors
    const parserError = xmlDoc.getElementsByTagName( 'parsererror' );
    if ( parserError.length ) {
        throw new Error( `Invalid XML document: ${parserError[0].textContent}` );
    }

    // Find context node
    let contextNode = xmlDoc;
    if ( contextPath ) {
        const contextResult = xmlDoc.evaluate( contextPath, xmlDoc, null, 9 );
        contextNode = contextResult ? contextResult.singleNodeValue : context;
    }

    // Remove default namespace
    if ( xmlDoc.documentElement.getAttribute( 'xmlns' ) ) {
        xmlDoc.documentElement.removeAttribute( 'xmlns' );
    }

    // Create namespace resolver
    const namespaces = _getNameSpaces( xmlDoc );
    const nsResolver = {
        lookupNamespaceURI( prefix ) {
            return namespaces[ prefix ] || null;
        }
    };

    // Evaluate XPath
    const result = xmlDoc.evaluate( expr, contextNode, nsResolver, 2 );
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