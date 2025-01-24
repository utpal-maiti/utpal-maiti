Async validators in Angular are useful when you need to perform validation that depends on asynchronous operations, such as checking if a username is already taken. Here's a simple example to illustrate how you can create and use an async validator:

### Step 1: Create the Async Validator
First, create a custom async validator. This can be done in a separate file to keep things organized.

```typescript
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export function usernameValidator(http: HttpClient): (control: AbstractControl) => Observable<{ [key: string]: any } | null> {
  return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
    return http.get<any[]>(`https://api.example.com/users?username=${control.value}`).pipe(
      map(users => {
        return users.length > 0 ? { 'usernameTaken': true } : null;
      })
    );
  };
}
```

### Step 2: Import and Use the Validator in Your Form
In your component, you can now use this async validator when creating your form.

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { usernameValidator } from './validators/username.validator';  // Adjust the path accordingly

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {
  exampleForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.exampleForm = this.formBuilder.group({
      username: ['', {
        validators: [Validators.required, Validators.minLength(3)],
        asyncValidators: [usernameValidator(this.http)],
        updateOn: 'blur'
      }]
    });
  }

  onSubmit() {
    if (this.exampleForm.valid) {
      console.log('Form submitted', this.exampleForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
```

### Step 3: Update the Template
Finally, update your template to reflect the async validation.

```html
<form [formGroup]="exampleForm" (ngSubmit)="onSubmit()">
  <div>
    <label for="username">Username:</label>
    <input id="username" formControlName="username" />
    <div *ngIf="exampleForm.get('username').invalid && exampleForm.get('username').touched">
      <small *ngIf="exampleForm.get('username').errors?.required">Username is required</small>
      <small *ngIf="exampleForm.get('username').errors?.minlength">Username must be at least 3 characters long</small>
      <small *ngIf="exampleForm.get('username').errors?.usernameTaken">Username is already taken</small>
    </div>
  </div>

  <button type="submit" [disabled]="exampleForm.invalid">Submit</button>
</form>
```

### Details
1. **Async Validator Function:** We create a function that takes `HttpClient` as an argument and returns another function that performs the validation. The return function checks if the username already exists by making an HTTP GET request.
2. **Form Control Setup:** We apply the async validator to the `username` field using `asyncValidators` and set `updateOn` to `'blur'` to trigger validation when the input loses focus.
3. **Error Messages:** The template displays specific error messages based on the validation errors.

This setup ensures that any asynchronous checks integrate smoothly with Angular’s reactive form framework. 