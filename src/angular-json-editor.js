'use strict';

angular.module('angular-json-editor', []).provider('JSONEditor', function () {
    var configuration = {
        defaults: {
            options: {
                iconlib: 'bootstrap3',
                theme: 'bootstrap3'
            }
        }
    };

    this.configure = function (options) {
        extendDeep(configuration, options);
    };

    this.$get = ['$window', function ($window) {
        // configure JSONEditor using provider's configuration
        var JSONEditor = $window.JSONEditor;
        extendDeep(JSONEditor, configuration);
        return $window.JSONEditor;
    }];

    // Helper method for merging configuration objects
    function extendDeep(dst) {
        angular.forEach(arguments, function (obj) {
            if (obj !== dst) {
                angular.forEach(obj, function (value, key) {
                    if (dst[key] && dst[key].constructor && dst[key].constructor === Object) {
                        extendDeep(dst[key], value);
                    } else {
                        dst[key] = value;
                    }
                });
            }
        });
        return dst;
    }

}).directive('jsonEditor', ['$q', 'JSONEditor', function ($q, JSONEditor) {

    return {
        restrict: 'E',
        transclude: true,
        scope: {
            schema: '=',
            startval: '=',
            buttonsController: '@',
            onChange: '&'
        },
        controller: ['$scope', '$attrs', '$controller', function ($scope, $attrs, $controller) {
            var controller, controllerScope, controllerName = $attrs.buttonsController;
            if (!(angular.isString(controllerName) && controllerName !== '')) {
                return;
            }

            controllerScope = {
                $scope: $scope
            };

            try {
                controller = $controller(controllerName, controllerScope);
            } catch (e) {
                // Any exceptions thrown will probably be because the controller specified does not exist
                throw new Error('angular-json-editor: buttons-controller attribute must be a valid controller.');
            }
        }],
        link: function (scope, element, attrs, controller, transclude) {
            var valueToResolve,
                startValPromise = $q.when({}),
                schemaPromise = $q.when(null);

            scope.isValid = false;

            if (!angular.isString(attrs.schema)) {
                throw new Error('angular-json-editor: schema attribute has to be defined.');
            }
            if (angular.isObject(scope.schema)) {
                schemaPromise = $q.when(scope.schema);
            }
            if (angular.isObject(scope.startval)) {
                // Support both $http (i.e. $q) and $resource promises, and also normal object.
                valueToResolve = scope.startval;
                if (angular.isDefined(valueToResolve.$promise)) {
                    startValPromise = $q.when(valueToResolve.$promise);

                } else {
                    startValPromise = $q.when(valueToResolve);
                }
            }

            // Wait for the start value and schema to resolve before building the editor.
            $q.all([schemaPromise, startValPromise]).then(function (result) {

                // Support $http promise response with the 'data' property.
                var schema = result[0].data || result[0],
                    startVal = result[1];
                if (schema === null) {
                    throw new Error('angular-json-editor: could not resolve schema data.');
                }

                scope.editor = new JSONEditor(element[0], {
                    startval: startVal,
                    schema: schema
                });

                var editor = scope.editor;

                editor.on('ready', function () {
                    scope.isValid = (editor.validate().length === 0);
                });

                editor.on('change', function () {
                    // Fire the onChange callback
                    if (typeof scope.onChange === 'function') {
                        scope.onChange({
                            $editorValue: editor.getValue()
                        });
                    }
                    // reset isValid property onChange
                    scope.$apply(function () {
                        scope.isValid = (editor.validate().length === 0);
                    });
                });

                // Transclude the buttons at the bottom.
                var buttons = transclude(scope, function (clone) {
                    return clone;
                });

                element.append(buttons);
            });
        }
    };
}]);
