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

## Nodes

## Traversing the DOM

## Creating, Removing and Cloning DOM Elements

## Introduction to Events

## Different types of events

## Event Challenges

## Object and node hierarchy

## Capturing and Bubbling

## Event Delegation and Challenges

## Website Project - A Shopping List