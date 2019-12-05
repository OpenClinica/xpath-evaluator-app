# xpath-evaluator-app
NodeJS app to evaluate XPath expressions on the server.


### Use

The application has 2 parameters and 0 options.

1. the path to an XML file. 
2. XPath expression.

Run it via the command line as follows: `node xpath-evaluate.js [PATH TO XML FILE] [XPATH EXPR]

Errors are returned to `stderr` and the XPath evaluation result as string to `stdout`. 

(There are several other ways we can run the program to make the command slightly shorter)

#### Help

```bash
node xpath-evaluate.js --help
```

### Examples

* `node xpath-evaluate.js /path/to/file.xml "count-selected( /path/to/select )"`

