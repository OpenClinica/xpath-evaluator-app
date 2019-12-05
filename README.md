# xpath-evaluator-app
NodeJS app to evaluate ODK XPath expressions on the server using Enketo's XPath evaluator.

### Use

The application has a single XPath expression parameter and 2 options.

1. `--xml`: path to an XML file 
2. `--context`: the context path in which the XPath expression should be evaluated 

Run it via the command line as follows: `node xpath-evaluate.js <XPATH EXPR>`.

Errors are returned to `stderr` and the XPath evaluation result as string to `stdout`. 

(There are several other ways we can run the program to make the command slightly shorter)

#### Help

```bash
node xpath-evaluate.js --help
```

### Examples 

* `node xpath-evaluate.js "1 + 1"` => "2"
* `node xpath-evaluate.js "pad2('1')"` => "01"
* `node xpath-evaluate.js "/data/a" --xml ./test/xml/one.xml` => "a"
* `node xpath-evaluate.js "count-selected( /data/a )" --xml ./test/xml/one.xml` => "1"
* `node xpath-evaluate.js "../a" --xml ./test/xml/one.xml --context "/data/b"` => "a"
* `node xpath-evaluate.js "/data/odk:b" --xml ./test/xml/namespaces.xml` => "b"

The XML documents used for the sample results of these expressions are at [test/xml](./test/xml/).
