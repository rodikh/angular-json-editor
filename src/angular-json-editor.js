'use strict';

angular.module('angular-json-editor', [])
.directive('jsonEditor', function () {
    return {
        restrict: 'A',
        scope: {
            startval: '=',
            jsonEditor: '=',
            schemaUrl: '@',
            editor: '=',
            isValid: '='
        },
        link: function (scope, element, attrs) {
            var config = {
                startval: scope.startval,
                iconlib: attrs.iconlib || 'bootstrap3',
                theme: attrs.theme || 'bootstrap3'
            };

            if (scope.jsonEditor) {
                config.schema = scope.jsonEditor;

            } else if (attrs.schemaUrl) {
                config.ajax = true;
                config.schema = {
                    $ref: scope.schemaUrl
                };

            } else {
                console.error('no schema specified.');
            }

            var editor = new JSONEditor(element[0], config);

            // Attach the editor object to the parent scope, for easy access from a controller.
            if (attrs.editor) {
                scope.editor = editor;
            }

            // scope.isValid holds the validation state of the entire form.
            // it is useful for disabling the submit button while the form isn't valid.
            if (attrs.isValid) {
                scope.isValid = false;
                editor.on('ready', function () {
                    scope.isValid = (editor.validate().length === 0);
                    editor.on('change', function () {
                        scope.$apply(function () {
                            scope.isValid = (editor.validate().length === 0);
                        });
                    });
                });
            }
        }
    };
});
