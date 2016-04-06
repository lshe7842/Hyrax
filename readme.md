====
Hyrax
====
Web application automation without coding.

Features
--------

* Fast - on average 3X faster than well organized Selenium based automation scripts, thanks to the headless DOM implementation provided by PhantomJS
* Easy - no IDE and coding required
* Flexible - can be plugged into your existing workflow
* Ideal for regression testing - free web application developers from learning and using complex automation tools so that they can focus on developing high quality codes


How it works
------------
Basically, Hyrax takes a test specification file (*.json), combines it with the built-in template to generate a javascript file which CasperJS can run.


Terminology
-----------
#### Template - ```casper-test.tpl```
This file contains the casperjs test file template where test specifications will be injected.
*This file is provided by Hyrax, and should not be modified by end user.

#### Test specification - ```*.json```
This file contains the test specifications in the form of JSON object.


Gulp
----
At the moment, 2 gulp tasks are provided to run Hyrax.

* ```gulp partial``` - generates casper-test.js file which you can then run with CasperJS manually. This is ideal for troubleshooting issues with your test specification
* ```gulp``` - this default task will first generate casper-test.js, and then run it with CasperJS automatically


How To Write Test Specification
-------------------------------
Below example demonstrates how to automate a series of user interactions:
1. click a button to navigate to the next page;
2. search for an username on an autocomplete widget;
3. add a found user by clicking on one of the search results.

```json
{
	"testCaseName": "Test case 1",

	"testCaseDescription": "This is a regression test of my web application following happy path.",
	
	"url": "http://myurl.com.au",
	
	"signalOk": "header.myHeader",

	"timeout": 30,

	"actions": [
		{
			"type": "click",
			"target": "button#myButton",
			"after": {
				"signalOk": "#page2",
				"print": "Navigated to page 2.",
				"timeoutMsg": "Timeout when navigating to page 2"
			}
		},

		{
			"type": "input(username)",
			"keepFocus": true,
			"target": "input#my_input",
			"after": {
				"signalOk": "#myResult",
				"signalOkWith": "value(userFullname)",
				"prints": "Got search result.",
				"timeoutMsg": "Timeout when searching for username."
			}
		},

		{
			"type": "click",
			"target": "#myResult ul > li",
			"after": {
				"signalOk": "#mySuccessMsg",
				"print": [
					{
						"string": "Added user with fullname: ",
						"query": "#mySuccessMsg #userFullname"
					}
				],
				"timeoutMsg": "Timeout when adding an user."
			}
		}
	]
}
```

Run Hyrax
---------
Store all your test specifications in ```specs``` folder.

```
gulp --spec=[your_test_specification_name_without_dot_json]
```
Don't make yourself a coffee because you won't have to wait long for test to finish :)

Build Hyrax
-----------
### Setup environment
Follow below guide to setup the build environment in your local pc.

1. Setup nodejs (google it);

2. Open your command line tool, type
```
npm install -global gulp
```
And then
```
npm install
```
This will install the build system ```gulp``` as well as all other dependencies;

3. Read and follow ```env-setup.txt``` to setup PhantomJS and Casper which are the driving wheels of this whole framework.

4. At the command line, type
```
casperjs env-verify.js
```
You should see some normal outputs.
```
NOTE: it seems that casperjs doesn't work too well with ConEmu, better do this under normal windows command line tool.
```


Known Issues
------------
#### Phantomjs crashes occasionally when navigating between pages
It seems that this issue is caused by casperjs API function ```waitFor``` pulling element defined by ```signalOk``` in our test specification file. Try to use ```"waitFor": true``` in the test specification to get around this issue.


Contributors
------------
* Shen Lu
* Guonian Xin


Special Thanks
--------------
* Anand Krishnamurthy
* Ludovic Barbier