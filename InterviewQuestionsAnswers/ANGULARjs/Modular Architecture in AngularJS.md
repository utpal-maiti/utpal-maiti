### Modular Architecture in AngularJS

#### **Using Modules**

Breaking your application into smaller, manageable modules helps in organizing the code and makes it easier to maintain and test. Here's an example:

**Step 1: Define Modules**
Create separate modules for different parts of your application. For instance, you can have a `main` module and a `user` module.

```javascript
// Define the main module
angular.module('mainApp', ['userModule']);

// Define the user module
angular.module('userModule', []);
```

**Step 2: Create Components in Modules**
Add controllers, services, and other components to these modules.

```javascript
// Add a controller to the main module
angular.module('mainApp').controller('MainController', function () {
	var vm = this;
	vm.title = 'Welcome to Main App';
});

// Add a service to the user module
angular.module('userModule').service('UserService', function () {
	this.getUser = function () {
		return { name: 'John Doe', age: 30 };
	};
});
```

#### **Implementing Lazy Loading**

Lazy loading improves initial load times by loading modules only when needed. This can be achieved using AngularJS's `$ocLazyLoad` module.

**Step 1: Install `$ocLazyLoad`**
First, install `$ocLazyLoad` using Bower or npm.

```bash
bower install oclazyload
```

**Step 2: Configure `$ocLazyLoad`**
Include `$ocLazyLoad` in your main module and configure it.

```javascript
// Include $ocLazyLoad in the main module
angular
	.module('mainApp', ['oc.lazyLoad', 'userModule'])
	.config(function ($ocLazyLoadProvider) {
		$ocLazyLoadProvider.config({
			debug: true,
			events: true,
		});
	});
```

**Step 3: Lazy Load Modules**
Use `$ocLazyLoad` to load modules only when needed.

```javascript
// Lazy load the user module in a route
angular.module('mainApp').config(function ($stateProvider) {
	$stateProvider.state('user', {
		url: '/user',
		templateUrl: 'user.html',
		resolve: {
			loadUserModule: [
				'$ocLazyLoad',
				function ($ocLazyLoad) {
					return $ocLazyLoad.load('userModule');
				},
			],
		},
	});
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

By following these steps, you can effectively use modular architecture and lazy loading in your AngularJS application to improve organization and performance.
