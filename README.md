# xpath-evaluator-app
NodeJS app to evaluate ODK XPath expressions on the server with NodeJS using Enketo's XPath evaluator.

### Prerequisites

Not sure which versions of Node are compatible yet. It's just an MVP at this stage. It was built and tested on **Node v8**.

### Install (using git)

1. Clone the repo (or copy the files)
2. Run `npm install --production`
3. Run `npm link`. This will make the `xpath-evaluate` command available globally on your machine.

(If this app is deemed useful it will be publish on npm, and installation will become easier).

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

* `xpath-evaluate "1 + 1"` => "2"
* `xpath-evaluate "pad2('1')"` => "01"
* `xpath-evaluate "/data/a" --xml ./test/xml/one.xml` => "a"
* `xpath-evaluate "count-selected( /data/a )" --xml ./test/xml/one.xml` => "1"
* `xpath-evaluate "../a" --xml ./test/xml/one.xml --context "/data/b"` => "a"
* `xpath-evaluate "/data/odk:b" --xml ./test/xml/namespaces.xml` => "b"

The XML documents used for the sample results of these expressions are at [test/xml](./test/xml/).
