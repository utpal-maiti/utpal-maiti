To protect an API with Azure Entra (formerly known as Azure Active Directory) and use it with an Angular application, you can follow these steps:

### 1. **Register the Angular Application in Azure Entra**
1. **Sign in to the Azure portal** and navigate to the **Azure Entra ID** section.
2. **Register a new application**:
   - Click on **App registrations** and then **New registration**.
   - Provide a name for your application (e.g., `AngularApp`).
   - Set the supported account types (e.g., **Accounts in this organizational directory only**).
   - Add a redirect URI (e.g., `http://localhost:4200`).
   - Click **Register**.
3. **Record the Application (Client) ID** and **Directory (Tenant) ID** for later use.

### 2. **Configure the Angular Application**
1. **Install MSAL Angular**:
   ```bash
   npm install @azure/msal-angular
   ```
2. **Set up MSAL Angular** in your Angular application:
   - Import `MsalModule` in your `app.module.ts`:
     ```typescript
     import { MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
     import { PublicClientApplication, InteractionType } from '@azure/msal-browser';

     @NgModule({
       declarations: [AppComponent, MsalRedirectComponent],
       imports: [
         BrowserModule,
         HttpClientModule,
         MsalModule.forRoot(new PublicClientApplication({
           auth: {
             clientId: 'YOUR_CLIENT_ID',
             authority: 'https://login.microsoftonline.com/YOUR_TENANT_ID',
             redirectUri: 'http://localhost:4200',
             scopes: ['api://YOUR_API_SCOPE']
           }
         }), {
           interactionType: InteractionType.Redirect,
           authRequest: {
             scopes: ['api://YOUR_API_SCOPE']
           }
         })
       ],
       bootstrap: [AppComponent]
     })
     export class AppModule { }
     ```
3. **Set up authentication guards** to protect routes:
   ```typescript
   import { Injectable } from '@angular/core';
   import { CanActivate, Router } from '@angular/router';
   import { MsalService } from '@azure/msal-angular';

   @Injectable({
     providedIn: 'root'
   })
   export class AuthGuardService implements CanActivate {
     constructor(private msalService: MsalService, private router: Router) {}

     canActivate(): boolean {
       if (this.msalService.getAccount()) {
         return true;
       } else {
         this.router.navigate(['/login']);
         return false;
       }
     }
   }
   ```

### 3. **Protect the API with Azure Entra**
1. **Register the API in Azure Entra**:
   - Navigate to **App registrations** and click **New registration**.
   - Provide a name for your API (e.g., `MyAPI`).
   - Set the supported account types and add a redirect URI (if needed).
   - Click **Register**.
2. **Add a scope** to the API registration:
   - Go to **Expose an API** and click **Add a scope**.
   - Provide a name, display name, and description for the scope.
   - Click **Add scope**.
3. **Configure the API to validate JWT tokens**:
   - In your API project, add the necessary middleware to validate JWT tokens.

### 4. **Call the Protected API from Angular**
1. **Use the MSAL Angular library** to acquire tokens and call the API:
   ```typescript
   import { MsalService } from '@azure/msal-angular';
   import { HttpClient, HttpHeaders } from '@angular/common/http';

   @Injectable({
     providedIn: 'root'
   })
   export class ApiService {
     constructor(private http: HttpClient, private msalService: MsalService) {}

     getApiData(): Observable<any> {
       const headers = new HttpHeaders({
         'Authorization': `Bearer ${this.msalService.getAccount().accessToken}`
       });

       return this.http.get('https://YOUR_API_ENDPOINT', { headers });
     }
   }
   ```

By following these steps, you can protect your API with Azure Entra and securely call it from your Angular application. 

