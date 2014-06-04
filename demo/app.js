'use strict';

angular.module('demoApp', ['angular-json-editor'])
.controller('MyCtrl', function ($scope) {
	$scope.ctrlSchema = {
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

	$scope.startval = {
		age: 20
	};

	$scope.onSubmit = function () {
		var formData = $scope.editor.getValue();
		console.log('formData', formData);
	};
});

angular.element(window.document).ready(function () {
    angular.bootstrap(window.document, ['demoApp']);
});
