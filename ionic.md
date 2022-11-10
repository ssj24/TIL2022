# IONIC

[toc]



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

- core app building blocks
  - UI components: `<ion-modal>`..
  - Themes & Styles
  - Navigation: router
  - State management
  - Native Device Features
  - ionic CLI & publishing

ionic components automatically load polyfills

(since ionic is open source, you could see code on github)



- we will build nont-angular ionic project in this chapter

  ionic can work without framework(just with vanilla js)

  add ionic with CDN(script and css in head)

  

- core components typescriptpes

  - output: ion-img, ion-label
  - layout: ion-grid, ion-row
  - input: ion-button, ion-input



- `<ion-icon slot="start" name="close">`

  - slot: icon's position
  - name comes from ionic-icon(https://ionic.io/ionicons)

- CSS utilities with class

- if (user-input-value.trim().length <= 0) {}: if user's input is nothing but white spaces

- ```javascript
  const newItem = document.createElement('ion-item');
  newItem.textContent = "it works";
  document.querySelector('#expenseList').appendChild(newItem);
  ```

  you can create ion element, too(it can create any tag maybe)

- since input's value is string even if the user insert number value,

  `totalExpenses += +enteredAmount;`

  +prefix make the string-number number

- ```javascript
  document.querySelector('ion-alert-controller').create({
    message: 'Valid reason is needed',
    header: 'Invalid input',
    button: ['Okay']
  }).then(alertEl => {
    alertEl.present() // present it on the screen
  })
  ```



- where the `<app-root>` comes from??

  ```html
  <!-- src/index.html -->
  <body>
    <app-root></app-root>
  </body>
  ```

  ```typescript
  // main.ts
  ~~~.bootstrapModule(AppModule)
  
  // app.module.ts
  bootstrap: [AppComponent]
  
  // app.component.ts
  selector: 'app-root'
  ```



- ionic uses scss(you could use css of course)



### @ionic/angular wrapper

ionic component suite can be used anywhere if you wrap it with @ionic/angular,

the component suite's usage in angular is easier and more efficient



- since it's normal angular app even if you make it with ionic,

  `ng serve` command is working

  but `ionic serve` is recommended

  ionic serve runs ng serve anyway.

  it runs ng serve because the type is angular(ionic.config.json)



### adding & loading a new page

- delete home folder

- `ionic serve` terminal keeps running

- open another terminal

  `ng generate component recipes`

  == `ng g c recipes`

  == `ionic generate `: enum, page, component, service, module, class, directive, guard

  

  

### lazy loading

the code for this module is only fetched when it's really needed

app-routing.module.ts  => routes => loadChildren

the reason why routes have loadChildren is lazy loading



### ion-router-outlet

```html
<!-- app.html -->
<ion-app>
	<ion-router-outlet></ion-router-outlet>
</ion-app>
```

ion-router-outlet is a directive added by `@ionic/angular`

not a default ionic web component

`router-outlet` is normal tag of angular

if you change it(from ion-router-outlet to router-outlet),

you might get error though it is supported.

in that case,

change routes on app-routing.module.ts

```typescript
routes = [{
  path: 'recipes',
  loadChildren: () => import('./recipes/recipes.module')
  											.then(m =>  m.RecipesPageModule)
}]
```

when string typescriptpe of loadChildren gets error, change it like above.

the one used here is relative url, absolute url might be more safe



anyway, router-outlet can be used, 

but it's hard to make it looks good like ion-router-outlet

just use ion-router-outlet





### using angular features on ionic components

ionc extension pack of vscode extension shows you possible tags llist



```typescript
// app/recipes/recipe.model.ts
export interface Recipe {
  id: string;
  title: string;
  imageUrl: string;
  ingredients: string[]
}
```

```typescript
// recipes.page.ts
import {Recipe} from './recipe.model';

@Component({})
export class RecipesPage implements OnInit {
  recipes: Recipe[] = [
    {
      id: 'r1',
      title: 'GarlicPizza',
      imageUrl: 'https://~',
      ingredients: ['garlic', 'flour', 'tomato sauce']
    }
  ]
} 
```

```html
<!-- recipes.html -->
<ion-content>
	<ion-list>
  	<ion-item *ngFor="let recipe of recipes">
    	<ion-avatar slot="start">
      	<ion-img [src]="recipe.imageUrl"></ion-img>
      </ion-avatar>
      <ion-label>{{recipe.title}}</ion-label>
    </ion-item>
  </ion-list>
</ion-content>
```

ion-avatar is used for wrapping image(good for optimization)

load image only when it is visible!



### angular routes

`ionic generate page recipes/recipedetail`

```typescript
// app-routing.module.ts
{
  path: 'recipe-detail',
  loadChildren: () => import('./recipes/recipe-detail/recipe-detail.module')
  													.then(m => m.RecipeDetailPageModule)
}
```

to access recipe-detail with recipe id,

move recipes path's loadChildren to children

then add dynamic url as another child

this one's loadChildren is recipe-detail's loadChildren

move that and remove recipe-detail path

```typescript
{
  path: 'recipes',
  children: [
    {
      path: '',
      loadChildren: () => import('./recipes/recipes.module')
      											.then(m => m.RecipesPageModule)
    },
    {
      path: ':recipeId',
      loadChildren: () => import('./recipes/recipe-detail/recipe-detail.module')
  													.then(m => m.RecipeDetailPageModule)
    }
  ]
}
```



### managing state with services

`ionic generate service recipes/recipes`



```typescript
// recipes/recipes.service.ts
recipes: Recipe[] = [
    {
      id: 'r1',
      title: 'GarlicPizza',
      imageUrl: 'https://~',
      ingredients: ['garlic', 'flour', 'tomato sauce']
    },
  	{
      id: 'r2',
      title: 'GarlicPizza2',
      imageUrl: 'https://~',
      ingredients: ['garlic', 'flour', 'tomato sauce']
    },
  	{
      id: 'r3',
      title: 'GarlicPizza3',
      imageUrl: 'https://~',
      ingredients: ['garlic', 'flour', 'tomato sauce']
    },
  ]

getAllRecipes() {
  return [...this.recipes];
}

getRecipe(recipeId: string) {
  return {
    ...this.recipes.find(recipe => recipe.id === recipeId;)
  }
}
```

take the recipes list from recipes.page.ts

(take it! not copy and paste!)



```typescript
// recipes.page.ts

recipes: Recipe[];
constructor(private recipesService: RecipesService) {}
ngOnInit() {
  this.recipes = this.recipesService.getAllRecipes();
}
```





### extracting & displaying route param data

```typescript
// recipe-detail.page.ts
loadedRecipe: Recipe;
constructor(private activatedRoute: ActivatedRoute,
           	private recipesService: RecipesService) {}
ngOnInit() {
  this.activatedRoute.paramMap
  	.subscribe(paramMap => {
    	if (!paramMap.has('recipeId')) {
        // it's abnormal situation. it doesn't have id but accessed detail page of that id
        // redirect is needed
        return;
      } 
    	const recipeId = paramMap.get('recipeId');
    	this.loadedRecipe = this.recipesService.getRecipe(recipeId);
  })
}
```

paramMap is a map of all the parameters this component receives or params this dynamic url segments

since this observable will emit new data whenever paramMap is changed,

subscribe those changes

even if we are on the same page, param can be changed and this observable will be triggered

```html
<!-- recipe-detail.page.html -->
<ion-content>
	<ion-grid>
  	<ion-col>
    	<ion-img [src]="loadedRecipe.imageUrl"></ion-img>
    </ion-col>
  </ion-grid>
</ion-content>
```



### Navigation Between pages

```html
<!-- recipes.page.html -->
<ion-item *ngFor="let recipe of recipesList" [routerLink]="['./'. recipe.id]"></ion-item>
```

as long as there is a routerLink, the tag won't needed to be `a`

the link above is relative link which can have an error.

absolute link is `['/recipes', recipe.id]`



```html
<!-- recipes.page.html -->
<ion-toolbar>
	<ion-buttons slot="start">
  	<ion-back-button defaultHref="/recipes"></ion-back-button>
  </ion-buttons>
</ion-toolbar>
```

ion-back-button needs to be inside of ion-buttons element

setting defaultHref is needed because if this detail page is the first page you entered somehow,

you don't know where to go so it just disappears.

set the default route!



### deleting a recipe

```html
<!-- recipes-detail.page.html -->
<ion-toolbar>
	<ion-buttons slot="primary">
  	<ion-button (click)="onDeleteRecipe()">
    	<ion-icon name="trash-outline" slot="icon-only"></ion-icon>
    </ion-button>
  </ion-buttons>
</ion-toolbar>
```

```typescript
// recipes.service.ts
deleteRecipe(recipeId: string) {
  this.recipes = this.recipes.filter(recipe => {
    return recipe.id !== recipeId;
  })
}
```

```typescript
// recipe-detail.ts
constructor(private activatedRoute: ActivatedRoute,
           	private recipesService: RecipesService,
           	private router: Router) {}
onDeleteRecipe() {
  this.recipesService.deleteRecipe(this.loadedRecipe.id);
  this.router.navigate(['/recipes']);
}
```



### injecting ionic controllers





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