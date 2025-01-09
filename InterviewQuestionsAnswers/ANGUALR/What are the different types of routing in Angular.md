In Angular, routing is a key feature that enables navigation between different views or components within a single-page application (SPA). Here are the different types of routing in Angular:

### 1. **Basic Routing**
- **Basic Route Configuration**: Defining simple routes that map URL paths to components.
```typescript
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent }
];
```

### 2. **Nested Routing (Child Routes)**
- **Child Routes**: Configuring nested routes within a parent route. Useful for creating complex views with multiple levels of navigation.
```typescript
const routes: Routes = [
  { path: 'parent', component: ParentComponent, children: [
    { path: 'child1', component: Child1Component },
    { path: 'child2', component: Child2Component }
  ]}
];
```

### 3. **Lazy Loading**
- **Lazy Loading Modules**: Loading feature modules on-demand to improve the initial load time of the application. This is done by using the `loadChildren` property.
```typescript
const routes: Routes = [
  { path: 'feature', loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule) }
];
```

### 4. **Route Guards**
- **Route Guards**: Implementing navigation control to protect routes and manage permissions. Common guards include `CanActivate`, `CanDeactivate`, `Resolve`, `CanLoad`, and `CanActivateChild`.
```typescript
const routes: Routes = [
  { path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard] }
];
```

### 5. **Auxiliary Routes (Secondary Outlets)**
- **Auxiliary Routes**: Using named outlets to display multiple views simultaneously.
```typescript
const routes: Routes = [
  { path: 'main', component: MainComponent, outlet: 'primary' },
  { path: 'sidebar', component: SidebarComponent, outlet: 'sidebar' }
];
```

### 6. **Redirects and Wildcard Routes**
- **Redirects**: Redirecting routes from one path to another.
- **Wildcard Routes**: Catch-all routes for handling 404 Not Found pages.
```typescript
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
```

### Summary:
- **Basic Routing**: Maps URL paths to components.
- **Nested Routing**: Defines child routes within parent routes.
- **Lazy Loading**: Loads modules on demand to improve performance.
- **Route Guards**: Controls access to routes based on conditions.
- **Auxiliary Routes**: Uses named outlets for multiple view displays.
- **Redirects and Wildcard Routes**: Manages route redirection and 404 pages.

These routing techniques provide flexibility and control over navigation and view management in Angular applications.