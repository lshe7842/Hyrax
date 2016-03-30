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

Usage
-----

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


Terminology
-----------
#### Template - ```casper-test.tpl```
This file contains the casperjs test file template where test specifications will be injected.

#### Specification - ```test-spec.json```
This file contains the test specifications.

How it works
------------
Define your test case in ```test-spec-swig.json```.
Note that the ```numOfAsserts``` MUST be the same as the number of asserts in ```asserts``` array.

Cd to the root of this repo, type
```
gulp
```

Known Issues
------------
#### Phantomjs crashes occasionally when navigating between pages
It seems that this issue is caused by casperjs API function ```waitFor``` pulling element defined by ```signalOk``` in our test specification file. Try to use ```"waitFor": true``` in the test specification to get around this issue.

Contributors
------------
* Shen Lu
* Gary Guonian Xin

Special Thanks
--------------
* Anand Krishnamurthy
* Ludovic Barbier