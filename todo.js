// select the elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// classes names, accessed as classList in the "completeToDo" function
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// variables which stores the list of items added to the app and assign id's accordingly
let LIST, id;   /*  these are initialized depending on, whether these is data in our local storage or not
                right in the next section of our code */





/* The following lines of codes gets executed only when data already existed in the app,
otherwise the app actually starts working right from the comment line "Shows todays date"; */


// get item from localstorage
let data = localStorage.getItem("TODO");

// Check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list
    loadList(LIST); // load the list to the user interface
}else{
    //if data is empty
    LIST = [];    // if there is no data then we are initializing the variables with empty data
    id = 0;
}

// load items to the user's interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash)
    });
}

// clear the local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
})



// app starts working right from here

// Shows today's date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date()

dateElement.innerHTML = today.toLocaleDateString("en-US", options);


// Add to do function, adds the todo items in the list of works you have to do according the html li element dynamically
function addToDo(todo, id, done, trash) {

    if (trash) { return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const item = `
        <li class="item">
            <i class="fa ${DONE} co" job="complete" id="${id}"></i>
            <p class="text ${LINE}">${todo}</p>
            <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
        </li>
        `
        ;

    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}


// Add an item to the list when the user press the enter key
document.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
        const toDo = input.value;

        // if the input is not empty
        if (toDo) {
            addToDo(toDo, id, false, false);

            LIST.push({                             //storing all the inputed data in the list array
                name: toDo,
                id: id,
                done: false,
                trash: false
            });

            // add item to localstorage ( this code must be added where the LIST array is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = "";
    }
});



// target the items created dynamically in the todo list according to the 
// mouse click whether on the circle or the trash icon
list.addEventListener("click", function (event) {
    const element = event.target; //return the clicked element of the listed items residing in the UI
    const elementJob = element.attributes.job.value; //complete or delete (clicked on the cirle or the trash icon)

    if (elementJob == "complete") {
        completeToDo(element);      // calls the completeToDo function
    } else if (elementJob == "delete") {
        removeToDo(element);        // calls the removeToDo function
    }
    // add item to localstorage ( this code must be added where the LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
});


// complete to do
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST([element.id].done ? false : true);
}

// remove to do

function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}