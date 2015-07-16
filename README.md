JSON Editor Angular directive
=============================

A directive that wraps [jdorn's json-editor](https://github.com/jdorn/json-editor).

JSON Editor takes a JSON Schema and uses it to generate an HTML form.

For further information about supported schema properties and usage, check out the original [json-editor](https://github.com/jdorn/json-editor).

Requirements
----------------

The module doesn't include the original json-editor code, but it is included in it's bower dependencies.

Installation
------------

Install via bower

    bower install angular-json-editor --save
    
Then include the directive and json-editor in your html (you can also use the minified versions)
    
```html
<script src="bower_components/json-editor/dist/jsoneditor.js"></script>
<script src="bower_components/angular-json-editor/dist/angular-json-editor.js"></script>
```

Usage
-----

The directive supports both synchronous and asynchronous values, all values can be either a scope object, or a promise returned from $q, $http, $timeout, $resource etc.
Please check out `demo/index.html` and `demo/app.js` for an example usage of both scenarios.

### Validation
The directive exposes an `isValid` property on the scope, which can be used to enable/disable show/hide buttons using `ng-disabled/ng-enabled` or `ng-hide/ng-show`.
```html
<button type="button" ng-disabled="!isValid">Button 1</button>
```

### Events
The directive allows you to pass a callback function through the `on-change` attribute that will be called whenever a change event is fired on the editor.
```html
    <json-editor schema="mySchema" startval="myStartVal" buttons-controller="SyncButtonsController" on-change="onChange()">
```

### Configuration and Plugins
Configuring the JSONEditor object for plugins and styling is possible by injecting the JSONEditorProvider to your config function and calling the configure method.
The object you pass to configure will be merged with the JSONEditor object.

```javascript
    angular.module('demoApp', ['angular-json-editor']).config(function (JSONEditorProvider) {
        JSONEditorProvider.configure({
            plugins: {
                sceditor: {
                    style: 'sce/development/jquery.sceditor.default.css'
                }
            },
            defaults: {
                options: {
                    iconlib: 'bootstrap3',
                    theme: 'bootstrap3',
                    ajax: true
                }
            }
        }); 
    });

```

Building
---------

Clone the project, install bower and npm dependencies by running

    bower install && npm install

If you dont have grunt-cli installed globally run `npm install -g grunt-cli`

Then run `grunt` and look in the `dist` folder.
