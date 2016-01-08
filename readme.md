# Testing Framework For KANA Form Process
(We need a name for this framework.. so come up with one!)

## Setup environment
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


## Terminology
#### Template - .tpl file
This file contains the casperjs test file template where test specifications will be injected.

#### Specification - .spec file
This file contains the test specifications.

## How it works

Cd to the root of this repo, type
```
gulp
```
This will inject all test specifications defined in ```specs/test.spec``` file into ```src/casper.test.tpl``` to generate ```casper-test.js```. This process creates one ```casper-test.js``` file for each test case defined in ```test.spec``` file.
```
TODO: numbering different casper-test.js
```
