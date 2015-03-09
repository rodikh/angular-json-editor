'use strict';

angular.module('demoApp', ['angular-json-editor']).config(function (JSONEditorProvider) {
    // these are set by default, but we set this for demonstration purposes
    JSONEditorProvider.configure({
        defaults: {
            options: {
                iconlib: 'bootstrap3',
                theme: 'bootstrap3'
            }
        }
    });

}).controller('SyncAppController', function ($scope) {

    $scope.mySchema = {
        type: 'object',
        properties: {
            name: {
                type: 'string',
                title: 'Item Name',
                required: true,
                minLength: 1
            },
            age: {
                type: 'integer',
                title: 'Age',
                required: true,
                min: 0
            }
        }
    };

    $scope.myStartVal = {
        age: 20
    };

    $scope.onChange = function (data) {
        console.log('Form changed!');
        console.dir(data);
    };

}).controller('AsyncAppController', function ($scope, $http, $timeout) {

    // Load with $http
    $scope.mySchema = $http.get('schema.json');

    // Values can be a promise from anywhere
    $scope.myStartVal = $timeout(function () {
        return {
            age: 20
        };

    }, 1500);

}).controller('SyncButtonsController', function ($scope) {

    /**
     * Custom actions controller which allows you to add any other buttons/actions to the form.
     */

    $scope.onSubmit = function () {
        console.log('onSubmit data in sync controller', $scope.editor.getValue());
    };

    $scope.onAction2 = function () {
        console.log('onAction2');
    };

}).controller('AsyncButtonsController', function ($scope) {

    $scope.onSubmit = function () {
        console.log('onSubmit data in async controller', $scope.editor.getValue());
    };

});
