# FORM

## basic

### novalidate

form's default option is validate

`<form novalidate>`

`<form novalidate="">`

you can use novalidate 

- on the form itself or
- on a per control basis



why do we need this property?

- user can save progress
- create your own client side validation
- go balls to the wall with server side validation



you cna insert an attribute called `formnovalidate` 

but only on 3 widgets

- button
- input:submit
- input:image

if there isn't novalidate attribute on form,

though you insert novalidate attr to the input:number,

it will do the validation

- it's not one of the 3 widgets
- it's `formnovalidate`, not novalidate



### target

target is used to specify in which browsing context(tab, window of iframe) 

you would like to show the response from the remote server



after user submit the form,

after server responds to the submitted form,

where that response will be displayed is the target

- on the form element itself
- on elements that can submit a form via the form target attribute



if there is a conflict, the input submit or button will **override** the target attribute of the form



target attr has been reinstated in HTML5



value

- _blank: new window/tab. default
- _parent: parent page/iframe of the form's iframe
- _self: same iframe that contains the form
- _top: topmost context, the result will open in the entire window
- framename: named iframe, name attr of the iframe



:bulb: accept-charset doesn't have default value(it is set to 'UNKNOWN' and matches the encoding of the entire page)

:bulb: enctype instructs the browser to send the form by packaging its context in a specific way





## Section 12

front-side validation is not enough

### submitting forms

if you use action, `<form action="serverURL">`

you won't need any extra javascript.

but when you want more options, you could use `AJAX`



AJAX submits the form  without leaving the page(no refresh page is needed)



AJAX: Asynchronous JavaScript And XML

AJAX requires us to write JS.



:bulb: empty() function checks whether a variable is empty or not.

​		this function returns **false** if the variable exists