'use strict';

angular.module('ngJsonEditor', [])
.directive('jsonEditor', function () {
    return {
        restrict: 'A',
        scope: false,
        /**
         * Linking function
         */
        link: function (scope, element, attrs) {
            /* jshint camelcase:false */
            scope.isValid = false;
            //TODO: make this configurable
            console.log('attrs', attrs)
            var startval = {};
            if (scope.$parent && attrs.startval) {
                startval = scope.$parent[attrs.startval];
            }


            var editor = new JSONEditor(element[0], {
                ajax: true,
                startval: startval,
                iconlib: 'bootstrap3',
                theme: 'bootstrap3',
                schema: {
                    $ref: attrs.jsonEditor
                }
            });

            if (scope.$parent && attrs.editor) {
                scope.$parent[attrs.editor] = editor;

            }

            editor.on('ready', function () {
                scope.isValid = (editor.validate().length === 0);

                editor.on('change', function () {

                    scope.$apply(function () {
                        scope.isValid = (editor.validate().length === 0);
                    });
                });
            });
        }
    };
});
