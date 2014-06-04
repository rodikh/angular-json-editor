'use strict';

angular.module('demoApp', ['ngJsonEditor'])
.controller('MyCtrl', function ($scope) {
	$scope.ctrlSchema = {
		"type": "object",
		"properties": {
			"name": {
				"type": "string",
				"title": "Item Name",
				"required": true,
				"minLength": 1
			},
			"age": {
				"type": "integer",
				"title": "Age",
				"required": true,
				"min": 0
			}
		}
	};

	$scope.startval = {
		age: 20
	};
});

angular.element(window.document).ready(function () {
    angular.bootstrap(window.document, ['demoApp']);
});
