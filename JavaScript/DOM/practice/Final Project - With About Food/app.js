// grab our entire table that contains all of our grocery items
let groceryList = document.querySelector('#grocery-list ul');

// ****** ADD SEARCH FILTER ******
const SEARCH = document.forms['search-item'].querySelector('input');
SEARCH.addEventListener('keyup', (event) => {
    // convert input text to lowercase using JavaScript's 'toLowerCase()' method
    let text = event.target.value.toLowerCase();
    // grab each li tag
    let groceries = groceryList.getElementsByTagName('li');
    // Need to convert the HTMLCollection to an array so we can use the forEach method (you can see we can't find it on the __proto__)
    let groceryArray = Array.from(groceries);
    // loop through each grocery item 
    groceryArray.forEach((grocery) => {
        let groceryName = grocery.firstElementChild.textContent;
        // convert all of our text to lowercase
        groceryNameLower = groceryName.toLowerCase();
        // now we can use indexOf to see if our text can be found within our grocery name. If nothing is found, a value of -1 is returned
        // note: we frame it this way because if we don't then the names won't come back after we delete our input box
        if(groceryNameLower.indexOf(text) == -1) {
            grocery.style.display = 'none';
        } else {
            grocery.style.display = 'block';
        }


    })

})


// ****** HIDE GROCERY ITEMS ******
let hideCheckbox = document.querySelector('#hide');
hideCheckbox.addEventListener('change', () => {
   // confirm the checkbox is checked
   let hideParent = document.getElementById('grocery-list');
   if(hideCheckbox.checked) {
       hideParent.style.display = 'none';
   } else {
       hideParent.style.display = 'block';
   }
})

// ****** ADD GROCERY ITEMS ******
const formAdd = document.getElementById('add-item');
// attach event listener
formAdd.addEventListener('submit', (event) => {
    // prevent the page from refreshing
    event.preventDefault();
    // grab user input text
    let text = formAdd.querySelector('input').value;
    // clear our input field now
    formAdd.querySelector('input').value = null;

    // create elements now
    let li = document.createElement('li');
    const groceryName = document.createElement('span');
    const deleteButton = document.createElement('span');
    // the span tags are nested within the li, so lets append them to the li
    li.appendChild(groceryName);
    li.appendChild(deleteButton);
    // append li to the DOM
    groceryList.appendChild(li);

    // add content
    deleteButton.textContent = 'delete';
    groceryName.textContent = text;  

    // add classes
    groceryName.classList.add('name');
    deleteButton.classList.add('delete');

})


// ****** DELETE GROCERY ITEMS ******

groceryList.addEventListener('click', (event) => {
    // we only want to delete the list item that the user clicked on 
    // need to find the element the user clicked on
    if(event.target.className == 'delete') {
        // let lets find the li of the element clicked
        const LI = event.target.parentElement;
        LI.remove();
    }
})

// ****** TABS ******

// lets grab our headings - our parent UL tag
let headings = document.querySelector('.heading');
let panels = document.querySelectorAll('.panel');
// define a selectedItem variable to toggle between classes
let selectedPanel = null; 

// taking advantage of event bubbling, lets attach an event listener on the ul parent element
headings.addEventListener('click', (event) => {
    // lets find out which <li> tag triggered the event
    let target = event.target; 
    // lets use dataset to get our data value ... we've called ours clicked but you can call it whatever you want
    let dataAttribute = event.target.dataset.clicked;
     
    if(target.tagName == 'LI') {
        // remove current selected element
        if(selectedPanel != null) {
            selectedPanel.classList.toggle('selected');
        } 
        selectedPanel = target;
        selectedPanel.classList.toggle('selected');

        // now lets find the panel we want to show
        let targetPanel = document.querySelector(dataAttribute);
    
        // now we need to determine whether the panel currently selected is the one displayed. We can use the forEach function because querySelectorAll returns a NodeList. 
        panels.forEach((panel) => {
            if(panel == targetPanel) {
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        })
    }
});

// lets deal with our button to display answer 
let answerButton = document.getElementById('showAnswer');
answerButton.addEventListener('click', answer);

function answer(e) {
    document.getElementById('answer').classList.add('show');
    document.getElementById('answer').textContent = "AN IMPASTA";
    answerButton.style.display = 'none';
};










// INEFFECIENT WAY (a) without bubbling and (b) without remove()
// grab all of our button elements
// let buttons = document.querySelectorAll('#grocery-list .delete');
// console.log(buttons)

// // loop through each button and add a click event listener
// buttons.forEach((button) => {
//     button.addEventListener('click', (event) => {
//         // navigate to the parent li tag
//         const LI = event.target.parentElement;
//         // delete the parent li element by implementing a trick to the get the parent
//         LI.parentNode.removeChild(LI);

//     });
// });