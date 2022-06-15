# DOM

source: [Udemy course DOM 2022](https://www.udemy.com/course/build-interactive-websites-1/) 

## Introduction

DOM: Document Object Model

- almost every single interaction on your page

- DOM is **not** a programming language

- the Browser gives us access to the DOM

  different browser will have its own way of creating the DOM

- everything in the browser can be represented as am object



DOM **Hierarchy**

- the DOM will map out HTML into a hierarchical structure

- window: each tab has its own window instance

  >  window has many properties(closed, frames, location, document)

- all the document object represents our entire webpage

  if you want to access any element in an HTML page, you always have to start with accessing the document object

  `[window.]document`

- console.log(): a function that prints an array.object or message to the console, most times as a string

  console.dir(): a function that takes an object as its input, and prints it out as a JSON-like tree

- document = html = head = title

  ​							   = body = h1, p, form, form

  html에 form이 두 개 있어서

  `document.forms`하면 HTMLCollection(2) [form, form]

- JS uses the DOM API to tell the browser what to display on page



BOM

- the console is part of the window object

- window object is supplied by the BOM(Browser Object Model)

- BOM allows JS to talk to the browser

  about things other than the content of the page

  ex) history, navigator, screen, location...

- window: entire browser

  - document: your website

  - navigator: info about the browser

    location: current URL

    screen: info about user's screen

    history: info about user's history

- there is no standard for the BOM

- the whole HTML document is a property of the window object

  if it's object of the window, you don't have to write `window.`

  ex) document(not window.document), console...

- the DOM looks at our document object within our hierarchical structure

- every website consists of an HTML document, DOM

  this model(DOM) allows JS(and other languages) to access elements and text of the web page

  the page content is stored in the DOM

  JS is just one of different languages that is given access to all of this content

- DOM was designed to be independent of any programming language(we mostly use JS)



XML: eXtensible Markup Language



What is NOT the DOM

- DOM is not your HTML

  you could figure it out in errors and JS

  **Errors**: the DOM is an interface for valid HTML documents. if html file has an error itself, (like 'hello' only in html file without tags) DOM will add certain elements to make it a valid representation.

  **JS**: DOM is modified by JS like creation of new element

- DOM is not what you see in the browser

  ```html
  <p style="display: none;">
    I'm still in the DOM
  </p>
  ```

  the browser will not display this paragraph,

  but it still stays in the DOM.

  DOM is not the same as the render tree(what you see in the browser)

- DOM is not whats in DevTools

  example of this would be CSS pseudo-elements(::before, ::after...).

  CSS pseudo-elements are part of the CSSOM

  so, it is in the tree but not part of the DOM

  there is subtle difference. because element inspector of DevTools try to be close to the DOM in the browser. sometimes it includes info that is not in the DOM

  DOM does not have **style** of elements.

  DevTools display only **after** and **before**(among CSS pseudo-elements)



Pseudo Elements

- A CSS pseudo-element is a keyword added to a selector that lets you style a specific part of an elements.
- `selector::pseudo-element {}`
- ::first-letter, ::first-line, ::before, ::after
- since this is not the part of the DOM, JS couldnt's access this pseudo elements.

What is the DOM

- the DOM is built from our source HTML file

- the DOM is always built from valid hTML

- the DOM looks at our document object within our hierarchical structure

- Every website has a DOM

  this model(DOM) allows JS(and other languages) to access elements and text

- the DOM is alive

  we can change it with JS at any time

- the true DOM does not include any CSS properties

  though there is no way to see the TRUE DOM

- the DOM is an interface to web pages

  it's an API to the page, allowing programs and languages to read and manipulate the page's content, structure, and styles.

  

## JavaScript vs DOM

what is the DOM API

- the browser creates the DOM to render the page

- the browser gives JS access the DOM

- there are the DOM and JS engine inside the browser

  DOM does not live inside the JS engine

  the DOM API gives JS ways(methods) to access the DOM

  JS engine lives in the browser independently of the DOM



```html
<button onclick="newWindow()">Curious?</button>
```

```jsx
function newWindow() {
	let url = 'https://dictionary.com/browse/shivoo?s=t';
	// open url on new window(not tab), features size is 500x800
	let newWindow = window.open(url, "", "width=500, height=800"); 
  // close this new window after 5 seconds
	setTimeout(() => {
		newWindow.close();
	}, 5000);
}
```

`[window.open](http://window.open)` gets three arguments.

1. url 
2. target
3. features

```jsx
setTimeout(() => {
		newWindow.close();
	}, 5000);
```

`setTimeout`, `close()`, `,5000` 셋 다 JS 아님. DOM API다

`() -> {}` , `newWindow`, `.으로 타고 들어가는 거`, `;` 얘네는 JS

어쨌든 DOM이랑 js 둘 다 함께 해야 함

The browser provides us with a DOM API

The DOM API gives us many functions like setTimeout, to access the DOM

These functions are not JS

JS is a programming language that browsers can execute

We use JS to work with the DOM API

The DOM was not designed for JS… this can sometimes make things awkward

The DOM and JavaScript are completely different. One way to think about it is that the DOM API gives us the bricks, and JavaScript is the concrete (or glue) that holds them all together.

<u>let</u> button <u>=</u> document<u>.</u>getElementById<u>('</u>test<u>');</u>

button<u>.</u>addEventListener<u>('</u>click<u>', () =></u> alert('hi<u>'));</u>

underlined text is JavaScript. plane text is the DOM API.



## Accessing the DOM

DOM: the browser's visual representation of your page

To access the DOM, use document object

`typeof(document)` => object

though each browser has their own DOM, they follow the same standards.

- ways to access elements on our page(access the DOM)

  sometimes we want more control than only accessing the document

  - `document.getElementById()` => element object
  - `document.getElementsByClassName()` => HTML Collection
  - `document.getElementsByTagName()` => HTML Collection
  - `document.querySelector()` => element object
  - `document.querySelectorAll()` => node list

  these methods comes from Document object

the DOM is often referred to as DOM Tree. 

this tree consists of millions of objects called Nodes.

pretty much everything is node.

document node - html node - head node - title node...

document node - html node - body node - h1 node...

- `<h1 id = "heading"> Hope </h1>` 

  whole line above is element.

  h1 is tag

  id is attribute

  heading is attribute value

  Hope is text

### getElementById

traditional way of accessing DOM

it returns an Element node

```js
let header = document.getElementById('header');
header.nodeType; // 1(it means Element Node)
header.nodeName; // Div(header is Div Element)
```

Id has to be **unique**

you can only access **one** element

### getElementsByClassName

it takes only one argument - the class name

returns a live HTMLCollection(it's **not** an array)

```js
let classElements = document.getElementsByClassName('header');
for(i=0; i<classElements.length; ++i) {
  classElements[i].style.backgroundColor = 'rgb(122, 173, 254)';
}
```

forEach function can only be used on Arrays, Maps, and Sets.

HTMLCollection.forEach() throws an error

length property is provided by the DOM API not JS.

### getElementsByTagName

this method searches through all nodes, finding those with a specified tag name(=> heavy performance)

it returns a live HTMLCollection

`let tagElements = document.getElementsByTagName('p');`

### querySelector

kinda newer way to access the DOM

like jQuery's CSS selector

In 2013, we were given the Selector API(querySelector, querySelectorAll)

querySelector returns single Item(Element Object)

querySelectorAll returns all elements(Node List)

`#test`: id = "test"

`#test.demo`: id = "test" & class = "demo"

`.text`: class = "test"

`a:hover`: when mouse over a link

`*`: all elements

```js
let queryElement = document.querySelector("#query");
let queryAllElement = document.querySelectorAll(".query-all");
// forEach can be applied for node list
queryAllElement.forEach(el => { 
  el.style.backgroundColor = "red";
});
```



## Nodes

Node: every item in the DOM tree

every html document is made up of a tree of HTML nodes. ex) `<p>` `<head>`

each node can have html attributes

each node can have content including other nodes & text

semantic tag: nodes which have a specific meaning / purpose



```html
<head>
  <title>This is title</title>
</head>
```

- `HTML`(HTMLElementNode)
  - `HEAD`(Head Element Node)
    - `#text`(new line, space..)
    - `TITLE`(Title Element Node)
      - `#text`
    - `#text`(new line)



any new line or space are valid characters

=> they are part of the DOM

but there are two exceptions

- spaces & new lines **above** the `<head>` are ignored
- spaces & new lines **below** the `</body>` are removed and placed inside the `<body>`



### different types of Node

- 1: **Element Node** - inside of tag
- 3: **Text node** - not inside of a tag. actual text
- 4: CDATA section Node - character data that is not parsed by the parser
- 7: Processing Instruction Node - used with XML to embed application-specific instructions
- 8: **Comment Node** - `<!-- -->`
- 9: **Document Node** - root document node
- 10: Document Type Node - `<!DOCTYPE html>` declaration
- 11: Document Fragment Node - a lightweight document object. sometimes you may want to extract a portion of the documents tree and create a new fragment

Every node has a nodeType, nodeName and nodeValue property



family dynamics: parents, siblings, children

이 관계는 누가 중심이냐에 따라 다르다

```html
<body>
  <div>
    <h1>This is H1</h1>
    <h2>This is H2</h2>
  </div>
</body>
```

body - div relationship is parent - child

but in div - h1 relationship div becomes parent



$0: 현재 노드

- devtool에 $0을 쓰면 현재 node(element 탭에서 클릭한..?)
- $0.nodeType => comment node면 8을 리턴
- $0.nodeName => `#comment`
- $0.nodeValue => comment content



### nodename

you can view the name of an element or tag you're dealing with.

just console log the nodeName(it returns a CAPITAL string)

ex) `<p>` => P  `<div>` => DIV

nodeName is read-only property of DOM nodes

but you can't get information like attributes

$0.tagName is kinda similar but if's only for the element node



### NodeList vs. HTMLCollection

both are collections of DOM nodes

Nodelist can contain any node type

NodeList items can only be accessed by their index number

NodeList items are typically static

NodeList is a collection of nodes. it's like an array but it is not an array.(not support array methods)

HTMLCollection only contains Element Node

HTMLCollection can be accessed by their name, id, or index number

HTMLCollections are live



### Live vs. Static Lists

you could modify HTMLCollections which is live: like appendChild()

live node lists update as the DOM updates

if you try to modify the Node List items, it won't work

Node List item is just a **reference** to the original list item

```html
<li>item1</li>
<li>item2</li>
```

- `.getElementsByTagName('li')` => HTMLCollection

  `LiHTMLCollection[0].parentNode.appendChild(document.createElement('li'));`

  parentNode here is `<ul>`. parentNode property only works on nodes. it's read-only property which returns the name of the parent node. HTMLCollection is not Node. it's just Collection of nodes. that's why you specified like [0] above, and then accessed parentNode.

  as a result of this line, `<li>` element is created and LiHTMLCollection is added also.

- `LiNodeList = document.querySelectorAll('li');`

  `LiNodeList[0].parentNode.appendChild(document.createElement('li'));`

  `<li>` will be added to the document, but LiNodeList is not nodified

  if you want to get modified list, you need to declaire it again





## Traversing the DOM

sometimes you'll want to move through the DOM without specifying each and every element beforehand.

=> traverse the DOM with parent, child, and sibling properties



how do we move up & down the DOM?

how family structures of DOM tree work?

=> parentNode, parentElement



descendants: nodes beyond one level of nesting

sibling: any node in the same level.(don't have to be of the same type)



traversing the DOM: getting one element from a neighboring element in the DOM. traversing uses relationship between nodes

accessing the DOM: starting with `document.`. using DOM access mehod.(it's better way than traversing the DOM)

document.documentElement => htmlElement



though there are several ways of getting around the DOM, sometimes we don't know what we're looking for

=> all of our elements in the DOM have at least one combination of parents, children and siblings



to move up and down the DOM tree, there are a few methods we can use.

firstChild, lastChild, previousSibling, nextSibling, children, parentNode



### parentNode

body - main - wrapper - h2

`let h2 = document.getElementById('h2');`

`h2.parentNode.parentNode.parentNode;` // body

you can chain the mehtods. like parentNode.parentNode...



### siblings

elements that share the same parent in the same tree level

siblings do not have to be of the same type

nodes higher than a sibling are ancestors

nodes lower than a sibling are descendants

body - main - h1, div

h1 sees div as nextSibling

div sees h1 as previousSibling

`div.previousSibling` = #text 

because there is a spaces or new line between `</h1>` and `<div>`.

previousSibling takes not only ElementNode but all Nodes

if you want to find element only,

uses `div.previousElementSibling`



### children

- firstChild, lastChild

  only child like main in body - main, main becomes firstChild and lastChild

  if there is no child, both first and lastChild returns null.

- children

  collection of child elements(HTMLCollection)

  though it looks like an array, it's not a true array

  but we can iterate through the coolection

  it has length propery

  body - main - h1, div

  main = body.children[0]

  if there is no child, children returns empty HTMLCollection not null

  `<h1>Hi</h1>` 

  chidren of h1 returns empty HTMLCollection

  first/lastChild of h1 return 'Hi'

  first/lastChild return ANY type of node

  children returns only Element Node

  firstElementChild returns only Element Node



- an HTML element may have many levels of other elements nested under it (if it directly nested below => children). all of these elements are called descendants of our starting element.

- childNodes vs. children

  childNodes returns a NodeList(all node children)

  children returns a HTMLCollection

  children is a property of an Element

  children are all Element

  - child element number?

    children.length;

    childElementCount;

  - all the nodes number?

    childNodes.length;





## Creating, Removing and Cloning DOM Elements

- static website: Elements are added to the page by directly writing code in html file

  dynamic website: Elements are added with JS

  

- createElement: DOM API

  adds an HTML Element to the DOM

  the most common way of creating am element

  it's in the Document object

  

  call createElement on document object

  `document.createElement(<html tag name>);`

  

  ```js
  let newPara = document.createElement('p');
  console.log(newPara); // <p></p>
  
  let html = document.documentElement;
  console.log(html);
  ```

  when you log html variable, 

  you can see there is no `<p></p>` in the html

  it means element is not added to the document

  by just call createElement on document

  

  the newPara variable held a reference to newly created `<p>` element(which is not in the DOM)

  in order for this element to ba a part of the DOM,

  we need somewhere to put it

  1. find a parent
  2. attach it to the parent: `appendChild()`

  

  add a text to newly created p element by using the `textContent` property

  `newPara.textContent = "I'm kinda NEW";`

  innerHTML can be used too

  but innerHTML exposes your site to possible cross-site scripting

  because inline JS can be added to an element

  textContent is safer as it strips out the HTML tag

  

- Document VS. document

  - `console.dir(document)`

  - `_proto_` of document is the HTMLDocument

  - `window.document.constructor` => HTMLDocument

    document object is constructed from the HTMLDocument constructor

  - `window.document.nodeType` => 9(DOCUMENT_NODE)

  - the HTMLDocument constructor function creates the document

  - the document is a DOCUMENT_NODE object which ingerits from the Document node

  - the Document node is not the root of the page

    first Element node in the Document is the root, 

    and that is the html element

  - HTML element is the root of our HTML document

    when this HTML file is looked in our browser,

    it becomes the document object

  - Document is the ultimate node from which our document inherits from

  

- appendChild

  attached element to a parent

  it always adds the element to become the **last** child of the parent

  if body - h1 - script.appendChild('p'),

  p would be added after the `<script>` 

  

  there are multiple methods of adding elements

  - appendChild()

  - insertBefore()

  - replaceChild()

    

- insertBefore

  two arguments

  1. first: element you wnat to insert
  2. second: a reference to the siblings you want to **precede**

  

  `bodyElement.insertBefore(newElement, scriptElement);`

  newElement is inserted before scriptElement 

  

  there is NO insertAfter but you can trick the browser 

  by combining `insertBefore()` with `node.nextSibling`

  body - h1("I am title") - script

  ```js
  let h1Element = document.querySelector('h1');
  let bodyElement = document.querySelector('body');
  let h1NextElement = h1Element.nextElmentSibling;
  bodyElement.insertBefore(newElement, h1NextElmeent);
  ```

  it's convenient when you don't know the next Element.

  

- remove elements

  remove nodes from the DOM

  `parentNode.removeChild()`

  

  this method will not travel up and down the DOM to find the elemnt

  we have to call removeChild from the parent of the child we want to remove

  

  what do we do if we don't have direct access to an elements parent?

  `newElement.parentNode.removeChild(newElement);`

  

  `remove()` is kinda new method(from 2011) that not all browser support it

  just use removeChild to be safe

  `newElement.remove();`

  remove children, grand children...too

  

- clone

  creating identical replicas

  cloneNode() on the element we wish to clone

  

  we also need to provide a true or false argument

  `node.cloneNode(true);` clone all the children too

  `node.cloneNode(false);` clone the element only

  

  ```js
  let bodyElement = document.querySelector('body');
  let paraElement = document.querySelector('.message');
  
  function cloning() {
    // passing 'true' to clone text, too
  	let clonedText = paraElement.cloneNode(true);
    bodyElement.appendChild(clonedText);
  }
  
  // execute cloning every one seconde
  setInterval(cloning, 1000);
  ```

  setInterval is a built in DOM function from the window object

  

  cloning a node copies all of the node's attributes and values,

  including inline event listeners(not be addEventListener)

  it copy and paste elements as a block

  it's a deep copy(copies all the descendants and any nodes contained within the items and the descendants)



## Introduction to Events

you need to know about event to create dynamic pages

- What is an event?

  an event is an action a user(or browser) has taken

  ex) clicks a button, hovers an element...

  events take place in the browser

  we can use events through javascript

  > web events are not part of the core javascript language. they are given to us by the DOM API built into the browser

  > when the event fires, javascript can comes in. after js executes, then the DOM API can continue to do its business and update the page if required.
  >
  > though event and js are very closely related, they are different!

  event listener and event handler are two most important things.

- event listener

  listens out for the event

  DOM API gives us a way to listen to events happening in the DOM

  you can add event listeners to any DOM object(not necessarily a HTML element)

  this "listener" is a function that is subscribed to the event, meaning that when the event is actually fired, it will be notified. this listener will then call the event handler to execute.(not keep watching the element)

  - inline event listeners
  - inline properties
  - event listeners

- event handler

  each event(click, keypress..) needs an event handler

  if you want to react to a certain event and do something when a specific action takes place write a js function that deals with the event. this function is the handler of the event.

  an event handler is a block of code 

  when the event happens(fires) execute this event handler

### Inline Event LIsteners

`<button onclick=boom()>Click me</button>`

when the button is clicked, boom function is fired

onclick is provided by a DOM API.

boom is js function

`function boom() {alert('BOOM!');}`

- why attribute vales are not wrapped by quotation mark?

  like `<button onclick="boom()">Click me </button>`

  when we write an inline event listener within HTML, it is an attribute of that HTML element

  like class or type.

  then... why some attribute values needed to be wrapped by quotation mark?

  actually `<button type=button>`, `<button class=awesome>` these code is valid html, too.

  **an attribute value can be used without quotes under certain conditions.**

  - if attribute value does not contain spaces

    `<button class="beautiful funky">` if quotes are omitted in this case, 

    button will have two attributes, class(beautiful) and funky(funky=""). but funky is not a valid HTML

  - if attribute value does not contain

    ```js
    ""
    ''
    ``
    =
    <
    >
    ```

  - other than two condition, we have to wrap attribut values in single or double quotation marks.

  if it confuses you, just wrap your attribute values in quotes all the time.(good practice)

- inline event listener is not recommended way but you should know about it to deal with it.

  this is unmanageable, inefficient, and not search engine friendly way.

  javascript code in html file makes engine hard to parse

  (inline CSS on an HTML element is also not good)

- test

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Changing Element Colors</title>
      <style>
          h1, p {
              text-align: center;
          }
          button {
              display: block;
              margin: 2em 0;
              margin-left: auto;
              margin-right: auto;
          }
      </style>
  </head>
  <body>
      <h1 id="title">This is a really fun Website</h1>
      <p id="first-paragraph">Wally The Warthog is a great pet</p>
      <p id="second-paragraph">Wally eats a lot of grass</p>
      <div class="wrapper">
          <button onclick="allBlue()">How about making everything blue?</button>
          <button onclick="allRed()">How about making everything red?</button>
      </div>
      <!-- task: think about how to add an inline event listener here and make this dynamic - so when a user clicks the button, all text on your page turns blue (and red); -->
      <script>
          let title = document.getElementById('title');
          let para1 = document.getElementById('first-paragraph');
          let para2 = document.getElementById('second-paragraph');
          let arr = [title, para1, para2]
          function allBlue() {
              for (var i=0; i<arr.length; ++i) {
                  arr[i].style.color="blue";
              }
          }
          function allRed() {
              for (var i=0; i<arr.length; ++i) {
                  arr[i].style.color="red";
              }
          }
      </script>
  </body>
  </html>
  ```

  

### Inline Properties

`<button id="btn">Click me</button>`

```js
let btn = document.getElementById('btn');
btn.onclick = () => {
  alert("BOOM");
}
```

very similar to the inline event listener

both approaches attach an event listener as a property on HTML element

but, it sets property by using javascript

it starts from accessing the button.

- test

  ```js
  // (1) add an inline property to the anchor tag by using JavaScript; 
  // and (2)  effect the CSS of the <div> element with ID of content.
  
  let ancBtn = document.getElementById("show-more");
  let contents = document.getElementById("content");
  ancBtn.onclick = () => {
    if (ancBtn.innerText == "Show More") { // expand
      ancBtn.innerText = "Collapse";
      contents.style.maxHeight = "100%";
    } else { // shrink
      contents.style.maxHeight = "148px";
      ancBtn.innerText = "Show More";
    }
  }
  ```

  using class of elements(`if (contents.className = 'open')`) would be more elegant way

### addEventListener()      

`<button id="btn">Click me</button>`

```js
let btn = document.getElementById('btn');
btn.addEventListener('click', boom);
function boom() {
  alert("BOOM");
}
```

this is the latest standard and recommended way of attaching event listeners.

it attaches a method to a DOM element, rather than attaching an attribute.

this event listener will **listen** or watch for an event being fired on the element.

when the event fires, it automatically gives us access to the **event** object.

(usually name this object `e`, but call it whatever you like)

addEventListener() is not js but DOM API

> People confuse what's Javascript and what's DOM API. 
>
> Because Web APIs are mostly used with JS, but you don't strictly have to always use JS.

`element.addEventListener(event, callback)`

- event is the action we're watching out for(onclick, hover)
- callback is event handler
- target(the element that fired the event) will automatically be given to us in the callback function



### callback functions

callback function is a function to be called after something else has happened

the first argument to the addEventListener is the event

the second argument is the event handler, which is a callback function

this callback function is automatically executed when the event fires

data about the event is given to us automatically through this callback

: target, where the event occurred, type of event...

```js
let h1 = document.querySelector(".title");
h1.addEventListener("click", (data) => {
  console.log(data)
})
// data in this case is MouseEvent object(it has all the information we want to know)
```

a callback function is just a function which is

- accessible by another function; and
- invoked after the first function completes
- it is passed as an argument to anothier function
- it is executed inside of the function it was passed into



why do we need callbacks?

- to run code in response to somthing happening

- to stop a process from blocking out other code

  > client-side JS runs in the browser. but this JS process is a single threaded event loop. it means that if we try to execute long-running operations within a single-threaded event loop, these processes will be blocked. this is bad because this will stop other JS code executing and we'll have to wait for the operation to complete.
  >
  > in order to prevent blocking on long-running operations, callbacks are typically used.



- how do we set colors

  - keyword: case insensitive `red`

  - HSL system: hue, saturation and lightness. extra alpha `hsl(9, 100%, 14%)`

  - RGB system: red, green and blue. hexadecimal(`#ff0000`) or functional notations(`rgb(255, 0, 0)`).

  - make event handler which changes the color of element randomly

    ```js
    let circle = document.getElementById("circle");
    function randomGenerator() {
      let randomColor = Math.floor(Math.random() * 16777216).toString(16); // hex
      circle.style.backgroundColor = '#'+randomColor;
    }
    circle.addEventListener("click", randomGenerator);
    ```

    there is 6 digit in rgb, each digit can have 16 options(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F)

    so, `16^6` = `256*256*256` = `16777216`

    this number includes 0.

    `Math.random() * 16777216` = random number between 0 and 16777215.999

    `Math.floor()` will round down to nearest whole number.

    `Math` object is a JS object, available to us automatically in every borwser

    `toString()` method converts an object( or number) to a stirng. 

    - every object has a toString() method. 
    - this function accepts a single optional parameter base. 
      the base specifies how the integer should be represented in string.

## Different types of events

## Event Challenges

## Object and node hierarchy

## Capturing and Bubbling

## Event Delegation and Challenges

## Website Project - A Shopping List

## Tips

1. console - sources - New Snippet
2. 