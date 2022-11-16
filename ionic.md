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

```typescript
// recipe-detai.ts
import {AlertController} from '@ionic/angular';

constructor(private activatedRoute: ActivatedRoute,
           	private recipesService: RecipesService,
           	private alertCtrl: AlertController) {}
ngOnInit() {
  this.activatedRoute.paramMap
  	.subscribe(paramMap => {
    	if (!paramMap.has('recipeId')) {
        // it's abnormal situation. it doesn't have id but accessed detail page of that id
        // redirect is needed
        this.router.navigate(['/recipes']);
        return;
      } 
    	const recipeId = paramMap.get('recipeId');
    	this.loadedRecipe = this.recipesService.getRecipe(recipeId);
  })
}
onDeleteRecipe() {
  this.alertCtrl.create({
    header: 'Are you sure?',
   	message: 'Do you really want to delete the recipe?',
    buttons: [{
      text: 'Cancel',
      role: 'cancel',
    }, {
      text: 'Delete',
      handler: () => {
        // add delete logic that we set before
      }
    }]
  }).then(alertEl => {
    alertEl.present();
  })
}
```

:exclamation: constructor method is not provided by Angular but JS engine. you couldn't see whether component is initialized or not by constructor. constructor is needed for dependency injection



## Building native apps with capacitor

### Android

`ionic capacitor add android` : android folder will be created

we need android-studio

build the app before make it into a native app

`ng build`: www folder will be created

```json
// capacitor.config.js(placed in root folder)
"apppId": "com.udemy.recipes", // anything unique
```

`ionic capacitor copy android`

`ionic capacitor run android`

- this command gives me an error

- ```shell 
  ionic capacitor synk
  ionic capacitor open android
  ```

wait untill it loaded!!

`ionic capacitor run android -l`: live reload

### iOS

iOS needs xcode and macbook

`ionic capacitor add ios`

id on appId is not permitted

`ionic capacitor copy ios`

`ionic capacitor run ios`

app / general / signing / team setting



but I got error from `ionic capacitor add ios`, yes it is first step!

it was matter of M1....

https://stackoverflow.com/questions/69482465/npx-cap-add-ios-fails-with-error-updating-ios-native-dependencies-with-pod-i

`sudo arch -x86_64 gem install ffi`

inside ios/App 

```shell
arch -x86_64 pod install
cd ..
cd ..
npx cap sync
```





image was not showing in iOS simulator(only! in iOS)

- app is case sensitive
- fixed imageUrl(without white spaces)



after code modification, run `ionic capacitor run ios` wil reload it

OR

`ionic capacitor run ios -l` will live reload it(after this command turn off the simulator then turn it on again)

if you run this command, you could see

```json
// capacitor.config.json
"server": {
  "url": "http://192.168.178.45:8100"
}
```

url is added automatically



## debugging

### error messages & console logging

even after delete a recipe,

we could see that recipe on the list

```typescript
// recipes.ts
ngOnInit() {
  console.log(this.recipes)
}
```

after delete, we redirected to the recipes page,

but **the console doesn't logging recipes again!**

which means angular couldn't get the changes(recipe delete)



:exclamation: `chrome://inspect`: and app

:exclamation: safari => develop/simulator => click IP address: ios app



## navigation & routing in Ionic apps

since ionic caches pages,

our delete function didn't workid like we expected



life cycle

| ang components | ionic pages      |
| -------------- | ---------------- |
| ngOnInit       |                  |
|                | ionViewWillEnter |
|                | ionViewDidEnter  |
|                | ionViewWillLeave |
|                | ionViewDidLeave  |
| ngOnDestroy    |                  |

when you go back, recipe-detail page will be destroyed

you could use ionic life cycle **without import**!



let's say the navigation is a stack of files

even if you go to the recipes/r1 page from recipes,

ngOnDestroy will not happening

it was just filed up.

that's why when you got back from recipes/r1 to recipes page

ngOnInit wasn't triggered

you could see with console logging that

it reaches far to the ionViewDidLeave than coming back till the ionViewWillEnter, not ngOnInit

so, if you move the code in ngOnInit th ionViewWillEnter,

delete function now works like we expected



### course project plan

find places, place detail, booking modal, 

offers, new offer, bookings, offer detail,

authentication



```shell
ionic generate page auth
ionic generate page places
ionic generate page places/discover
ionic generate page places/offers
ionic generate page places/offers/new-offer
ionic generate page places/offers/edit-offer
ionic generate page places/offers/offer-bookings
ionic generate page places/discover/place-detail
ionic generate page bookings
```



```typescript
// app-routing.module.ts
path: '', redirectTo: 'places',
```

leave `'', auth, places, booking` these four paths only

places.html is what you see when you run `ionic serve`



there are two tab, which mean each tab have separate navigation page stacks



### adding tabs

```html
<ion-tabs>
	<ion-tab-bar slot="bottom"> <!-- slot is necessary -->
  	<ion-tab-button tab="discover">
    	<ion-label>Discover</ion-label>
      <ion-icon name="search"></ion-icon>
    </ion-tab-button>
    <ion-tab-button tab="offers">
    	<ion-label>Offers</ion-label>
      <ion-icon name="card"></ion-icon>
    </ion-tab-button>
  </ion-tab-bar>
</ion-tabs>
```

```typescript
// places/places-routing.module.ts

const routes: Routes = [{
  path: 'tabs',
  component: PlacesPage,
  children: [{
    path: 'discover',
    loadChildren: './discover/discover.module#DiscoverPageModule'
  },{
    path: ':placeId', // dynamic path
    loadChildren: './discover/place-detail/place-detail.module#PlaceDetailPageModule'
  }]
},{
  path: 'offers',
  children: [{
    path: '',
    loadChildren: './offers/offers.module#OffersPageModule'
  },{
    path: 'edit/:placeId', // dynamic path
    loadChildren: './offers/edit-offer/edit-offer.module#EditOfferPageModule'
  },{
    path: 'new',
    loadChildren: './offers/new-offer/new-offer.module#NewOfferPageModule'
  },{
    path: ':placeId', // dynamic path
    loadChildren: './offers/offer-bookings/offer-booking.module#OfferBookingsPageModule'
  }]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
```

hard coded route needs to come before dynamic one



since we will import places=routing.module,

- get rid of 
- routes constant and Routes  import
- FormsModule, 
- FormsModule, RouterModule from import
- from places.module.ts

- insert PlacesRoutingModule to import



```typescript
// places-routing.module.ts
const routes: Routes=[
  { path: 'tabs',
  ...
   ,{ 
     path: '',
     redirectTo: '/places/tabs/discover',
     pathMatch: 'full'
    }
  }, { 
   path: '',
   redirectTo: '/places/tabs/discover',
   pathMatch: 'full'
  }
]
```

add same path to tabs' children's last child

and last child of routes



get rid of everything but ion-tabs from places.html



`ionic generate service places/places`

```typescript
// places.service.ts
private _places = [];
get places() { // getter
  return [...this._places];
}
```



```typescript
// places/place.model.ts
export class Place {
  constructor(pullic id: string, public title: string, public description: string, ~~) {}
}
```

define at model constructor()



```typescript
// places.service.ts
export class PlacesService {
  private _places: [
    new Place('p1', 'Manhattan Mansion', 'https://~'),
    new Place('p2', 'Manhattan Mansion', 'https://~'),
    new Place('p3', 'Manhattan Mansion', 'https://~'),
  ]
}
```

you could use service anywhere 

- if service has `injectable` decorator
- and value of `providedIn` propertypescript is 'root'

or add it to module's provides array



`*ngFor="let place of loadedPlaces.slice(1)"`: loop from index 1, second item!



```html
<ion-thumbnail slot="start">
	<ion-img [src]="place.imageUrl"></ion-img>
</ion-thumbnail>
<ion-label>
	<h2>
     title
  </h2>
</ion-label>
```

image will be placed at left in tiny size and title will be placed right side of it



`<ion-button [routerLink]="['/', 'places', 'tabs', place.id]">`

since this url needs place.id, data binding need to be dynamic



- ionic option with routerLink!

  you could add routerDirection attribute

  whether this navigation will be forward(default value) or backward

  `<ion-button [routerLink]="['/', 'places', 'tabs', place.id]" routerDirection="backward">`



if you add `detail` attr to routerLink element(no need of passing data), will show the image that this is a link

`<ion-button [routerLink]="['/', 'places', 'tabs', place.id]" routerDirection="backward" detail>`



### nav back

1. ```html
   <ion-buttons slot="start">
   	<ion-back-button defaultHref="/places/tabs/discover"></ion-back-button>
   </ion-buttons>
   ```

2. router, navcontroller

   ```typescript
   import {Router} from '@angular/router';
   import {NavController} from '@ionic/angular';
   
   constructor(private router: Router, 
              	private navCtrl: NavController) {}
   
   onBookPlace() {
     // this.router.navigateByUrl('/places/tabs/discover');
     this.navCtrl.navigateBack('/places/tabs/discover');
   }
   ```

   this.navCtrl.pop() is works alike, but after refresh the page, it won't work.



### navigation via toolbar buttons

```html
<ion-toolbar>
	<ion-buttons slot="primary">
  	<ion-button routerLink="/places/tabs/offers/new"> <!-- static url -->
    </ion-button>
  </ion-buttons>
</ion-toolbar>
```

```typescript
constructor (private route: ActivatedRoute, 
             private navCtrl: NavController,
             private placesService: PlacesService) {}

ngOnInit() {
  this.route.paramMap.subscribe(paramMap => { // subscribe to access dynamic par of url
    if (!paramMap.has('placeId')) {
      this.navCtrl.navigateBack('/places/tabs/offers');
      return;
    }
    this.place = this.placesService.getPlace(paramMap.get('placeId'));
  })
}
```

```typescript
// places.service.ts

getPlace(id: string) {
  return {...this._places.find(p => p.id === id)};
}
```





### side drawer

since this one will be used in several pages,

```html
<!-- app.component.html -->

<ion-app>
	<ion-menu side="start"> <!-- if there's multiple give it an id -->
  	<ion-header> <!-- have header and content like common pages -->
    	<ion-title>title</ion-title>
    </ion-header>
    <ion-content>
      <ion-list>
      	<ion-item>
        	<ion-icon></ion-icon>
          <ion-label></ion-label>
        </ion-item>
        <ion-item>
        	<ion-icon></ion-icon>
          <ion-label></ion-label>
        </ion-item>
        <ion-item>
        	<ion-icon></ion-icon>
          <ion-label></ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>
  <ion-router-outlet></ion-router-outlet>
</ion-app>
```

```html
<!-- offers.page.html -->
<ion-header>
	<ion-toolbar>
  	<ion-buttons slot="start">
    	<ion-menu-button menu="m1"> <!-- if there's an id, specify it -->
      </ion-menu-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
```

by adding menu like above,

now you can see hamburger menu on offers page

since this component is offered by ionic, it can be open and close in normal way

if you want it to be open and close by manually,

```html
<ion-buttons>
	<ion-button (click)="onOpenMenu()"></ion-button>
</ion-buttons>
```

```typescript
constructor (private menuCtrl: MenuController) {}

onOpenMenu() {
	// this.menuCtrl.close('m1'); // if there is no id, don't pass anything
  this.menuCtrl.toggle():
}
```



close the drawer after click link

```html
<!-- root.component.html -->

<ion-app>
	<ion-menu side="start" menu="m1"> <!-- if there's multiple give it an id -->
  	<ion-header> <!-- have header and content like common pages -->
    	<ion-title>title</ion-title>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-menu-toggle menu="m1"> <!-- if there's an menu id -->
          <ion-item></ion-item>
        </ion-menu-toggle>
      	<ion-menu-toggle>
          <ion-item></ion-item>
        </ion-menu-toggle>
        <ion-menu-toggle>
          <ion-item></ion-item>
        </ion-menu-toggle>
      </ion-list>
    </ion-content>
  </ion-menu>
  <ion-router-outlet></ion-router-outlet>
</ion-app>
```

use ion-menu-toggle wherever needs toggle!

it could be placed in anywhere



### authentication

`ionic generate service auth/auth`

```typescript
// auth.service.ts
private _userIsAuthenticated = false;

get UserIsAuthenticated() { return this._userIsAuthenticated; }

login() {
  this._userIsAuthenticated = true;
}

logout() {
  this._userIsAuthenticated = false;
}
```

```typescript
// auth.page.ts

constructor(private authService: AuthService) {}

onLogin() {
  this.authService.login();
}
```



#### guard pages that needed login

`ionic generate guard auth/auth`

```typescript
// auth/auth.guard.ts

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.userIsAuthenticated) {
      this.router.navigateByUrl('/auth');
    }
    return this.authService.userIsAuthenticated; // need to return boolean value
  }
}
```

it can be attached to the route

since each path is lazy loaded, 

page can be loaded before guard

to prevent such accident, use CanLoad.

if you click CanLoad with command clicked on vscode,

you will be redirected to `interfaces.d.ts`

copy and paste the definition of canload from there.



auth guard's return value defends on user auth status.

AuthService is needed!



```typescript
// app-routing.module.ts
const routes: Routes = [
  {
    path: 'places',
    loadChildren: ~,
    canLoad: [AuthGuard]
  }
]
```

add canLoad property to every path needed login



```typescript
// auth.page.ts

constructor (private authService: AuthService,
             private router: Router) {}

onLogin() {
  this.authService.login();
  this.router.navigateByUrl('/places/tabs/discover');
}
```

```typescript
// app.component.ts
constructor (...,
             private authService: AuthService,
             private router: Router) {
  this.initializeApp();
}

initializeApp() {
  this.platform.ready().then(() => {
    this.statusBar.styleDefault();
    this.splashScreen.hide();
  })
}

onLogout() {
  this.authService.logout();
  this.router.navigateByUrl('/auth');
}
```

this.initializeApp..... I don't remember this..



### modal

`ionic generate component bookings/create-booking`

```typescript
// place-detail.page.ts
constructor(... private modalCtrl: ModalController) {}

onBookPlace() {
	this.modalCtrl.create({
		component: CreateBookingComponent	
	}).then (modalEl => {
		modalEl.present();
	})
}
```

to enable use of `CreateBookingComponent`,

remove create-booking declare from bookings.module.ts

add create-booking declare at place-detail.module.ts



it will throws an error

since onBookPlace is not use routing

neither selector of component

when trying to open/rendering new component.

angular won't recognize it.

let angular know it

```typescript
// place-detail.module.ts
@NgModule({
  entryComponents: [CreateBookingComponent]
})
```



#### passing data to modal

```typescript
// place-detail.page.ts
onBookPlace() {
  this.modelCtrl.create({
    component: CreateBookingComponent,
    componentProps: { selectedPlace: this.place },
    // you could set id in here, if needed
  }).then()
}
```

to enable this,

```typescript
// create-booking.ts
@Input() selectedPlace: Place;
```



#### close modal and get data from modal

```html
<!-- create-booking.html -->
<ion-button (click)="onBookPlace()"></ion-button>
<ion-buttons>
	<ion-button (click)="onCancel()"></ion-button>
</ion-buttons>
```

```typescript
// create-booking.component.ts
constructor(private modalCtrl: ModalController) {}

onCancel() {
  this.modalCtrl.dismiss(null, 'cancel', (id));
  // first: data to pass, seconde: role, third: id(optional)
}

onBookPlace() {
  this.modalCtrl.dismiss({ message: 'book msg', 'confirm'});
}
```

```typescript
// place-deatil.page.ts
onBookPlace() {
  this.modalCtrl.create()
  .then(modalEl => {
    modalEl.present();
    return modalEl.onDidDismiss();
  }).then(result => { // then comes after onDidDismiss
    console.log(result.data, result.role);
    if (result.role === 'confirm') {
      console.log('booked!!');
    }
  })
}
```



## Ionic components overview

## style & theme

## user input

## managing state

## http requests

## adding google maps

## using native device features(camera, location)

## authentication

## publishing the apps