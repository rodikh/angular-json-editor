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

});