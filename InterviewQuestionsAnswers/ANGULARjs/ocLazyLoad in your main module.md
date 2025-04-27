Sure! Here's a complete example of how to configure and use `$ocLazyLoad` in your AngularJS application:

### Step-by-Step Example

#### **Step 1: Install `$ocLazyLoad`**

First, install `$ocLazyLoad` using Bower or npm.

```bash
bower install oclazyload
```

#### **Step 2: Include `$ocLazyLoad` in Your Main Module**

Include `$ocLazyLoad` in your main module and configure it.

```javascript
// Define the main module and include $ocLazyLoad
angular
	.module('mainApp', ['oc.lazyLoad', 'ui.router'])
	.config(function ($ocLazyLoadProvider, $stateProvider) {
		// Configure $ocLazyLoad
		$ocLazyLoadProvider.config({
			debug: true,
			events: true,
		});

		// Define states and lazy load modules
		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: 'home.html',
				controller: 'HomeController as homeCtrl',
			})
			.state('user', {
				url: '/user',
				templateUrl: 'user.html',
				controller: 'UserController as userCtrl',
				resolve: {
					loadUserModule: [
						'$ocLazyLoad',
						function ($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'userModule',
								files: ['app/userModule.js'],
							});
						},
					],
				},
			});
	});
```

#### **Step 3: Define the User Module**

Create the `userModule` and its components.

```javascript
// Define the user module
angular
	.module('userModule', [])
	.controller('UserController', function (UserService) {
		var vm = this;
		vm.user = UserService.getUser();
	})
	.service('UserService', function () {
		this.getUser = function () {
			return { name: 'John Doe', age: 30 };
		};
	});
```

#### **Step 4: Create HTML Templates**

Create the HTML templates for the home and user views.

**home.html**

```html
<div>
	<h1>{{ homeCtrl.title }}</h1>
</div>
```

**user.html**

```html
<div>
	<h1>User Information</h1>
	<p>Name: {{ userCtrl.user.name }}</p>
	<p>Age: {{ userCtrl.user.age }}</p>
</div>
```

#### **Step 5: Initialize the Main Controller**

Initialize the main controller in the main module.

```javascript
// Define the main controller
angular.module('mainApp').controller('HomeController', function () {
	var vm = this;
	vm.title = 'Welcome to Main App';
});
```

### Example Project Structure

```
my-angular-app/
├── index.html
├── package.json
├── bower.json
├── app/
│   ├── mainApp.js
│   ├── userModule.js
│   ├── controllers/
│   ├── services/
│   ├── views/
│   │   ├── home.html
│   │   ├── user.html
├── assets/
│   ├── css/
│   ├── images/
│   ├── fonts/
├── config/
│   ├── environment.js
│   ├── routes.js
├── lib/
│   ├── angular/
│   ├── oclazyload/
├── test/
│   ├── unit/
│   ├── e2e/
```

### index.html

```html
<!DOCTYPE html>
<html ng-app="mainApp">
	<head>
		<title>My AngularJS App</title>
		<script src="lib/angular/angular.min.js"></script>
		<script src="lib/angular-ui-router/release/angular-ui-router.min.js"></script>
		<script src="lib/oclazyload/dist/ocLazyLoad.min.js"></script>
		<script src="app/mainApp.js"></script>
		<script src="app/userModule.js"></script>
	</head>
	<body>
		<div ui-view></div>
	</body>
</html>
```

By following these steps, you can effectively configure and use `$ocLazyLoad` to lazy load modules in your AngularJS application. This helps improve the initial load time and makes your application more efficient.
