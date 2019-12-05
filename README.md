# xpath-evaluator-app
NodeJS app to evaluate ODK XPath expressions on the server using Enketo's XPath evaluator.

### Use

The application has 3 parameters.

1. **required**: path to an XML file 
2. **required**: XPath expression
3. optional: Context path

Run it via the command line as follows: `node xpath-evaluate.js <PATH TO XML FILE> <XPATH EXPR> [CONTEXT]`

Errors are returned to `stderr` and the XPath evaluation result as string to `stdout`. 

(There are several other ways we can run the program to make the command slightly shorter)

#### Help

```bash
node xpath-evaluate.js --help
```

### Examples

* `node xpath-evaluate.js /path/to/file.xml "count-selected( /path/to/select )"`
* `node xpath-evaluate.js /path/to/file.xml "../node" "/path/to/context"`

