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

There are two optional ways of passing a json schema to the editor.

* Pass the schema using a scope object as the value of the directive's attribute

	```js
	.controller('MyCtrl', function ($scope) {
		$scope.schemaObj = {
			"type": "object",
			"properties": {
				"name": {
					"type": "string",
					"required": true,
					"minLength": 1
				},
				"age": {
					"type": "integer",
					"title": "Age",
					"min": 0
				}
			}
		};
	}
	```

	```html
	<div json-editor="schemaObj"></div>
	```

* Use an external JSON file as the schema and pass the url using the schema-url attribute

	```html
	<div json-editor="" schema-url='/schema/person.json></div>
	```