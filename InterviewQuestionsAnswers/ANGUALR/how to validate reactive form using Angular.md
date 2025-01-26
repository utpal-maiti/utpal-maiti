Validating a reactive form in Angular involves defining the form controls with validators and handling validation feedback in your template. Here's a step-by-step guide:

### Step 1: Set up the Angular Project
Make sure you have Angular CLI installed and create a new Angular project if you don't have one already:
```bash
ng new reactive-form-validation
cd reactive-form-validation
ng serve
```

### Step 2: Install Reactive Forms Module
Reactive forms are provided by the `@angular/forms` package. Import it into your `app.module.ts` file:
```typescript
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    // your components
  ],
  imports: [
    ReactiveFormsModule,
    // other imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Step 3: Create a Form in the Component
Define the form controls and validators in your component class:
```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log('Form Submitted!', this.myForm.value);
    }
  }
}
```

### Step 4: Create the Template
Create the HTML template to display the form and validation messages:
```html
<form [formGroup]="myForm" (ngSubmit)="onSubmit()">
  <div>
    <label for="name">Name:</label>
    <input id="name" formControlName="name">
    <div *ngIf="myForm.controls.name.invalid && (myForm.controls.name.dirty || myForm.controls.name.touched)">
      <span *ngIf="myForm.controls.name.errors.required">Name is required.</span>
      <span *ngIf="myForm.controls.name.errors.minlength">Name must be at least 3 characters long.</span>
    </div>
  </div>

  <div>
    <label for="email">Email:</label>
    <input id="email" formControlName="email">
    <div *ngIf="myForm.controls.email.invalid && (myForm.controls.email.dirty || myForm.controls.email.touched)">
      <span *ngIf="myForm.controls.email.errors.required">Email is required.</span>
      <span *ngIf="myForm.controls.email.errors.email">Enter a valid email.</span>
    </div>
  </div>

  <div>
    <label for="password">Password:</label>
    <input id="password" type="password" formControlName="password">
    <div *ngIf="myForm.controls.password.invalid && (myForm.controls.password.dirty || myForm.controls.password.touched)">
      <span *ngIf="myForm.controls.password.errors.required">Password is required.</span>
      <span *ngIf="myForm.controls.password.errors.minlength">Password must be at least 6 characters long.</span>
    </div>
  </div>

  <button type="submit" [disabled]="myForm.invalid">Submit</button>
</form>
```

### Step 5: Styling the Form
Add some basic styles in your `app.component.css` (optional):
```css
input.ng-invalid.ng-touched {
  border-color: red;
}

span {
  color: red;
}
```

### Explanation:
- **FormBuilder**: Used to create form controls easily.
- **Validators**: Functions that perform synchronous validation on form controls. In this example, `Validators.required`, `Validators.minLength`, and `Validators.email` are used.
- **Template**: Displays the form controls and validation messages. The messages are shown only if the respective form control is invalid and has been touched or is dirty.

This setup provides a basic example of how to validate a reactive form in Angular.