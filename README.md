JSON Editor Angular directive
=============================

ng-json-editor is an angular module that provides a directive that wraps [jdorn's JSON Editor](https://github.com/jdorn/json-editor).



Requirements
----------------

The module doesn't include the original json-editor code, but it is included in it's bower dependencies.

Installation
------------

Install ng-json-editor using bower, which will install the source json-editor as well.

If you are not using bower, please download the original [json-editor from here](https://github.com/jdorn/json-editor).

Usage
-----

Include the json-editor and angular scripts first, and then include ng-json-editor.

Use the json-editor directive with a path to the schema you want to use.

```html
<div json-editor="schema/schema_path.json"></div>
```
