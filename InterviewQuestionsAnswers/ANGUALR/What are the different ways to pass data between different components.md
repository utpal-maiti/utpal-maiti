There are several ways to pass data between different components in Angular. Here are the most commonly used methods:

### 1. **Input and Output Properties**
- **@Input**: Used to pass data from a parent component to a child component.
- **@Output**: Used to emit events from a child component to a parent component.

#### Example:
**Parent Component:**
```html
<app-child [childData]="parentData" (dataChange)="handleDataChange($event)"></app-child>
```

**Child Component:**
```typescript
@Input() childData: string;
@Output() dataChange = new EventEmitter<string>();

changeData(newData: string) {
  this.dataChange.emit(newData);
}
```

### 2. **Service with Observable**
- Create a shared service with an Observable to pass data between components that do not have a direct parent-child relationship.

#### Example:
**Shared Service:**
```typescript
@Injectable({ providedIn: 'root' })
export class DataService {
  private dataSubject = new BehaviorSubject<string>('default data');
  data$ = this.dataSubject.asObservable();

  updateData(newData: string) {
    this.dataSubject.next(newData);
  }
}
```

**Component 1:**
```typescript
constructor(private dataService: DataService) {}

updateData() {
  this.dataService.updateData('new data');
}
```

**Component 2:**
```typescript
constructor(private dataService: DataService) {}

ngOnInit() {
  this.dataService.data$.subscribe(data => {
    console.log(data);
  });
}
```

### 3. **Local Storage / Session Storage**
- Store data in local storage or session storage and access it from different components.

#### Example:
```typescript
// Save data
localStorage.setItem('key', 'value');

// Retrieve data
const value = localStorage.getItem('key');
```

### 4. **Route Parameters**
- Pass data through route parameters when navigating between components.

#### Example:
**Route Configuration:**
```typescript
const routes: Routes = [
  { path: 'component/:id', component: MyComponent }
];
```

**Component 1 (Navigating):**
```typescript
this.router.navigate(['/component', id]);
```

**Component 2 (Receiving):**
```typescript
constructor(private route: ActivatedRoute) {}

ngOnInit() {
  this.route.paramMap.subscribe(params => {
    const id = params.get('id');
  });
}
```

### 5. **Query Parameters**
- Pass data through query parameters in the URL.

#### Example:
**Component 1 (Navigating):**
```typescript
this.router.navigate(['/component'], { queryParams: { key: 'value' } });
```

**Component 2 (Receiving):**
```typescript
constructor(private route: ActivatedRoute) {}

ngOnInit() {
  this.route.queryParamMap.subscribe(params => {
    const value = params.get('key');
  });
}
```

### 6. **Shared Service with Subject/BehaviorSubject**
- Use a shared service with Subject or BehaviorSubject to emit and subscribe to data changes.

#### Example:
**Shared Service:**
```typescript
@Injectable({ providedIn: 'root' })
export class SharedService {
  private subject = new Subject<any>();

  sendMessage(message: string) {
    this.subject.next({ text: message });
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
```

**Component 1 (Sending):**
```typescript
constructor(private sharedService: SharedService) {}

sendMessage(): void {
  this.sharedService.sendMessage('Hello from Component 1');
}
```

**Component 2 (Receiving):**
```typescript
constructor(private sharedService: SharedService) {}

ngOnInit() {
  this.sharedService.getMessage().subscribe(message => {
    console.log(message.text);
  });
}
```

### Summary:
- **@Input and @Output**: For parent-child component communication.
- **Service with Observable**: For sharing data between unrelated components.
- **Local Storage / Session Storage**: For persistent storage accessible across components.
- **Route Parameters and Query Parameters**: For passing data through the URL.
- **Shared Service with Subject/BehaviorSubject**: For a reactive approach to data sharing.

Each method has its own use case and can be chosen based on the specific requirements of your application.
