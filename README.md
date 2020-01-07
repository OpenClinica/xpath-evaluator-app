# xpath-evaluator-app
NodeJS app to evaluate ODK XPath expressions using Enketo's XPath evaluator.

### Prerequisites

Not sure which versions of Node are compatible yet. It's just an MVP at this stage. It was built and tested on **Node v8** and should work on later versions as well.

### Install (using git)

1. Clone the repo (or copy the files)
2. Run `npm install --production` from the installation folder
3. Run `npm link` from the installation folder. This will make the `xpath-evaluate` command available globally on your machine.

(If this app is deemed useful it will be published on npm, and installation will become easier).

### Uninstall

1. To remove the links, run `npm unlink` and remove the xpath-evaluator-app folder.

### Use

The application has a single required XPath expression parameter and 2 options that can be provided using flags:

1. `--xml`: path to an XML file 
2. `--context`: the context path in which the XPath expression should be evaluated 

Run it via the command line as shown below under [Examples](#Examples).

Errors are returned to `stderr` and the XPath evaluation result as string is return to `stdout`. 

#### Help

```bash
xpath-evaluate --help
```

### Examples 

You can try these out from the app's folder. The XML documents used for the sample results of these expressions are at [test/xml](./test/xml/).

* `xpath-evaluate 1+1` :point_right: `2`
* `xpath-evaluate "1 + 1"` :point_right: `2` (spaces in expression requires use of quotation marks)
* `xpath-evaluate "pad2('1')"` :point_right: `01`
* `xpath-evaluate "/data/a" --xml test/xml/one.xml` :point_right: `a`
* `xpath-evaluate "pad2( /data/a )" --xml test/xml/one.xml` :point_right: `0a` 
* `xpath-evaluate "count-selected( /data/a )" --xml test/xml/one.xml` :point_right: `1`
* `xpath-evaluate "../a" --xml test/xml/one.xml --context "/data/b"` :point_right: `a`
* `xpath-evaluate "/data/odk:b" --xml test/xml/namespaces.xml` :point_right: `b`
* `xpath-evaluate "//*[@id='2']" --xml test/xml/one.xml` :point_right: `b`
* `xpath-evaluate "//*[@id='2']/@id" --xml test/xml/one.xml` :point_right: `2`
* `xpath-evaluate "//*[@CapiTalized='true']" --xml test/xml/one.xml`: :point_right: `b`
