const jsdom = require('jsdom');
const {
    JSDOM
} = jsdom;
const utils = require('./utils');
const getScriptContent = utils.getFileContents('../node_modules/enketo-xpathjs/dist/enketo-xpathjs-bundle.js');

function evaluateXPath(xmlStr, expr, context) {
    // Let any logging by Enketo Core fall into the abyss.
    const virtualConsole = new jsdom.VirtualConsole();
    const {
        window
    } = new JSDOM('', {
        runScripts: 'dangerously',
        virtualConsole: virtualConsole
    });
    const scriptEl = window.document.createElement('script');

    return getScriptContent
        .then(scriptContent => {
            scriptEl.textContent = scriptContent;
            window.document.body.appendChild(scriptEl);
            // TODO: throw exception for parse errors (I think they are now silently included in XML result)
            window.xmlDoc = new window.DOMParser().parseFromString(xmlStr, 'text/xml');
            window.XPathJS.bindDomLevel3XPath(window.xmlDoc);

            // TODO: pass context
            if (!context) {
                context = window.xmlDoc
            }
            const result = window.xmlDoc.evaluate(expr, context, null, 2);

            console.log('result', result);

            return result.stringValue;
        });

}


module.exports = evaluateXPath;