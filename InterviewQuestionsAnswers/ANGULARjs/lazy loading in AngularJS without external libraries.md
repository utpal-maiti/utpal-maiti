You can achieve lazy loading in AngularJS without external libraries by dynamically loading JavaScript files using AngularJS's built-in features.
Here's a simple approach:

1. **Create a function to load scripts dynamically**:

   ```javascript
   function loadScript(url, callback) {
   	var script = document.createElement('script');
   	script.type = 'text/javascript';
   	script.src = url;
   	script.onload = callback;
   	document.head.appendChild(script);
   }
   ```

2. **Configure your AngularJS app**:

   ```javascript
   var app = angular.module('myApp', ['ngRoute']);

   app.config([
   	'$routeProvider',
   	function ($routeProvider) {
   		$routeProvider.when('/lazy', {
   			templateUrl: 'lazy.html',
   			controller: 'LazyController',
   			resolve: {
   				loadMyCtrl: [
   					'$q',
   					'$rootScope',
   					function ($q, $rootScope) {
   						var deferred = $q.defer();
   						loadScript('lazyController.js', function () {
   							$rootScope.$apply(function () {
   								deferred.resolve();
   							});
   						});
   						return deferred.promise;
   					},
   				],
   			},
   		});
   	},
   ]);
   ```

3. **Create your lazy-loaded controller file (`lazyController.js`)**:

   ```javascript
   angular.module('myApp').controller('LazyController', function ($scope) {
   	$scope.lazy = 'Lazy Controller';
   });
   ```

4. **HTML file (`lazy.html`)**:
   ```html
   <div ng-controller="LazyController">{{lazy}}</div>
   ```

In this example, the `LazyController` is defined in a separate file (`lazyController.js`) and is loaded only when the `/lazy` route is accessed [1](https://stackoverflow.com/questions/40643629/angularjs-dynamic-loading-of-script-files-using-lazyload-webpack) [2](https://stackoverflow.com/questions/20578731/how-to-lazy-load-non-angular-javascript-files-using-angularjs).
