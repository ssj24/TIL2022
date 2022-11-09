# IONIC

## What's ionic

Ionic is one codebase(html, css, js)

with one code, you could make PWA, iOS appp, android app, desktop app(electron)



- web components
- capacitor: web to native mobile app
- ionic cli(angular cli base): project management, build workfow => creation, live-reload, bundling, optimization
- there is premium service like cloud..



code + (Frontend framework) + ionic framework ===capacitor or cordova ===> host platforms

ionic is not restricted to angular or any frontend framework

you could use angular, vue, react or just vanilla js

ionic framework is a set of platform-adopting pre-styled components

stencil.js is what ionic uses bts.

host flatforms are iOS app, android app, PWA, desktop app...



ionic automatically adjust to the platform



from 2019(ionic4+), ionic is not restricted to Angular



ionic is webapp project based!

if you add cordova / capacitor to the web app, it becomes mobile app

### install

`npm install -g @ionic/cli`

it can be installed through CDN

- `ionic start`
- `cd myApp`
  `ionic serve`



## Angular Refresher

- app.module is imported at main.ts
- module: bundle of features / components
- NgModule(app.module.ts)
  - at least one NgModule per app
  - placed right above the export class phrase
  - kind of global configuration for the app
  - declarations: all the components you will use inside this app
  - imports: import other module
  - providers
  - bootstrap: root app component(one element), start point

- component name's convention is pascal case(PersonsComponent)



### @Input

- tells angular that this property can be found from outside of this component

- ```html
  <script>
    // persons.component.ts
  	@Input() inputElementList
  </script>
  
  <!-- app.component.html -->
  <app-persons [inputElementList]="persons"></app-persons>
  ```

  assigned value for inputElementlList., persons, is property of **app** component





- `<li *ngFor="let person of personList">{{ person }} </li>`

- ```typescript
  //person-input.component.ts
  @Component({
    selector: 'app-person-input', // selector name convention: kebab case
  })
  export class PersonInputComponent {}
  ```

- ```html
  <button (click)="btnClicked()">
    Create
  </button>
  
  <script>
  	btnClicked() {
      console.log('btnClicked');
    }
  </script>
  ```

- local reference

  ```html
  <div #personNameEl></div>
  <button (click)="onClick(personNameEl)"></button>
  ```

  with `#`, you could set a local reference for that element within that html file

- `<div [attr]="DYNAMIC VALUE">`

  any dynamic value can be inserted at DYNAMIC VALUE

  "1 + 1" => 2

  "'string'": if you want to use static string, wrap the string with other quote

- `<input [(ngModel)] = "personName">`

  as I said above, personName is property

  ngModel needs to be imported at app.module

  `import {FormsModule} from '@angular/forms'`





### passing data

```typescript
// person-input.component.ts
@Output() personCreate = new EventEmitter<string>();

enteredPerson = '';

onCreatePerson() {
  this.personCreate.emit(this.enteredPerson);
  this.enteredperson = '';
}
```

```html
<!-- app.html -->
<app-person-input (personCreate)="onPersonCreated($event)"></app-person-input>

<script>
	// app.ts
  onPersonCreated(name: string) {
    this.persons.push(name);
  }
</script>
```



### Routing

```typescript
// app/app-routing.module.ts
import {Routes, RouterModule} from '@angular/router';
import PersonsComponent from 'persons-component-path';

const routes: Routes = [
  {path: '', component: PersonsComponent},
  {path: 'input', component: PersonInputComponent},
  // localhost:4200/input
];

@NgModule({
  import: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
// import AppRoutingModule at app.module.ts

// app.component.html
<router-outlet></router-outlet>
```

if you want to pass data with router, use SERVICE



### Service

service is kind of a middle man between component/data storage/othercomponent/other service

service is a class

```typescript
// persons/persons.service.ts
import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
// by adding providedIn, make sure the angular know this service
export class PersonsService {
  persons: string[] = ['Merry', 'Anna', 'Bill'];
  addPerson(name: string) {
    this.persons.push(name);
  }
}
```

you could do other mehtod to make the angular to know the service,

- do not pass argument in Injectable, just leave it as an empty object

- app.module.ts, add PersonsService(import is needed) to `providers` array

  

### Defendency Injection

no more data binding(input(), output())

```typescript
// persons.component.ts
personList: string[];
constructor(prsService: PersonsService) {
  this.personList = prsService.persons
}
```

PersonsService needed to be imported.

if you check PersonsService, it has persons.



### Lifecycle Hook

```typescript
// persons.component.ts

personList: string[];
private personService: PersonService;
constructor(prsService: PersonService) {
  this.personService = prsService;
}
// use shortcut!
personList: string[];
constructor(private prsService: personService){}

ngOnInit() {
  this.personList = this.prsService.persons;
}

// person-input.component.ts
enteredPersonName = '';
constructor(private personService: PersonService){}

onCreatePerson() {
  this.personsService.addPerson(this.enteredPersonName);
  this.enteredPersonName = '';
}

// person-service.ts has addPerson method
```

do the initialization in ngOnInit

### 

### navigating between components(routing)

```html
<!-- app.component.html -->
<a href = "/">List</a>
<a href = "/input">Input</a>
<!-- if you use href, it will refresh the page -->

<a [routerLink] = "'/'">List</a>
<a [routerLink] = "'/input'">Input</a>
```

routerLink is what router provide







### removing items upon a click

```typescript
// persons.service.ts
removePerson(name: string) {
  this.persons = this.persons.filter(person => {
    return person !== name;
  });
}

// persons.ts
onRemovePerson(personName: string) {
  this.prsService.removePerson(personName)
}
```

```html
<!-- persons.html -->
<li *ngFor="let person of personsList" (click)="onRemovePerson(person)"
```

by far, the name would be removed upon click

but the list displayed are just same

(it is removed from the array if you console logging the list,

or go to the other route then come back)



so, from now on make the change on the displayed list immediately

arrays, objects in javascript are reference typescriptpe

it is hard to catch it to angular



```typescript
// persons.service.ts
import {subject} from 'rxjs';

personsChanged = new Subject<string[]>();
persons: string[] = [];
addPerson(name: string) {
  this.persns.push(name);
  this.personsChanged.next(this.persons);
}
removePerson(name: string) {
  this.personsChanged.next(this.persons);
}
```

personsChanged will act like eventEmitter!



now, we should subscribe this one from other component

active pushing data with **subject**

```typescript
ngOnInit() {
  this.personList = 
  this.prsService.personsChanged.subscribe(persons => {
    this.personList = persons;
  })
}
```

next(from service) will send a new value



when you using subject, you need to unsubscribe when the component get destroyed for memory

```typescript
// persons.ts
import {Subscription} from 'rxjs';

export class~~~ implements OnInit, OnDestroy {
  private personListSubs: Subscription;
  ngOnInit() {
    ...
    this.personListSubs = this.prsService.subscribe(~~);
  }
  ngOnDestroy() {
    this.personListSub.unsubscribe();
  }
}
```



### setting HTTP request

```typescript
// app.module.ts
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [... , HttpClientModule, ...]
})

//persons.service.ts
import {HttpClient} from '@angular/common/http';

persons: string[] = [];

constructor(private http: HttpClient) {}

fetchPersons() {
  // api for Starwars characters
  this.http.get<any>('https://swapi/co/api/people')
  .subscribe(res => {
    console.log(res);
  })
}

//persons.component.ts
ngOnInit() {
  this.prsService.fetchPersons(); // after personListSubs
}
```



can you see the result on console?

make it displayed on the view

```typescript
// persons.service.ts
import {map} from 'rxjs/operations';
fetchPersons() {
  this.http.get<any>('https://swapi/co/api/people')
  .pipe(map(res => {
    // map above is from rxjs/operators, map below is array built-in method
    return res.results.map(character => {
      character.name 
    })
  }))
  .subscribe(transformedData => {
    this.personsChanged.next(transformedData);
  })
}
```







- showing a placeholder whilst waiting

  ```html
  <p *ngIf="isFetching">
    Loading...
  </p>
  <ul *ngIf="!isFetching"></ul>
  ```

  ```typescript
  // persons.ts
  isFetching = false;
  ngOnInit() {
    this.personListSubs = this.prsService.subscribe(persons => {
      this.personList = persons;
      this.isFetching = false;
    });
    this.isFetching = true;
  }
  ```

  



## Ionic component basics

## Ionic w Angular

## Building native apps with capacitor

## debugging

## navigation & routing in Ionic apps

## Ionic components overview

## style & theme

## user input

## managing state

## http requests

## adding google maps

## using native device features(camera, location)

## authentication

## publishing the apps