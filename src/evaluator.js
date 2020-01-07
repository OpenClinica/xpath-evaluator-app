global.window = {};
global.document = {};
import XPathJS from 'enketo-xpathjs';
import extendXPath from 'enketo-xpath-extensions-oc';
extendXPath( XPathJS );

export default XPathJS;