// Global variable creation

let kitchenInput = document.getElementById("kitchen-input");
let addBtn = document.getElementById("add-btn");
let kitchenItems = document.getElementById("kitchen-items-list");

let kitchenInputData;
let kitchenInputDataArray = [];


//assign to local storage 
function setLocalStorage()
{
    localStorage.setItem("kitchenInputs",JSON.stringify(kitchenInputDataArray));//Only String format is accepted in local storage
}

//get from local storage
function getLocalStorage(){
   if(localStorage.getItem("kitchenInputs")){
    kitchenInputDataArray = JSON.parse(localStorage.getItem("kitchenInputs"));
    buildUI();//build UI function is called
    console.log("worked")
   }
   else{
    console.log("not worked")
   }

}


function buildUI(){
    kitchenItems.textContent = (" "); // It avoids the repeating looping contents

    kitchenInputDataArray.forEach((abin) =>{// array creation for displaying all items from the local storage (array list)


    let li = document.createElement("li");   //creates li
    let spanEl = document.createElement("span");
    let currentIndex = kitchenItems.children.length + 1;// for indexing
    li.appendChild(spanEl); //appending child node with parent node li

    spanEl.innerText = `${currentIndex}.  ${abin}`// displaying child node
    kitchenItems.appendChild(li);//appending child node with parent node kitchenItems

    kitchenInput.value = ""; // Reset input value
    kitchenInput.focus(); // Focus back on the input
    
    //trash Button
    let trashBtn = document.createElement("i");
    trashBtn.classList.add("fas", "fa-trash");// adding two classes
    li.appendChild(trashBtn);
    
    //Edit Button
    let editBtn = document.createElement("i");
    editBtn.classList.add("fas", "fa-edit");
    li.appendChild(editBtn);
    });
    

    
}
// Function to add items to the list
function kitchenItemsList(event) {

    
     kitchenInputData = kitchenInput.value.trim(); // trim to remove any leading/trailing whitespace

     //pushing kitchenInputData into array by using push function

     kitchenInputDataArray.push(kitchenInputData)
     console.log(kitchenInputDataArray)

    setLocalStorage();
    getLocalStorage();
    

   // Check if the input is empty
    if (kitchenInputData.length === 0) {
        alert("Make sure you typed something");
        kitchenInput.focus(); // Focus back on the input
        return; // Exit the function if the input is empty
    }

    

    
}

// Enter key function
kitchenInput.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        addBtn.click();
    }
});

function deleteItemsList(event){
    // console.log(event.target.classList[0]);
     if (event.target.classList[1] === `fa-trash`){
        let item = event.target.parentElement;
        // item.remove(); // to remove a item
        item.classList.add("slideOut");
        item.addEventListener("transitionend", () => {
            console.log("Transition ended");
            item.remove();
          });
     }
}

function editItemsLists(event){
    if (event.target.classList[1] === `fa-edit`){
        let editedItems = prompt("please");
        let item = event.target.parentElement;
        let spanEl = item.querySelector("span");
        spanEl.innerText = editedItems;

                 
    } 
}

//Add event listner to button
addBtn.addEventListener("click", kitchenItemsList);
kitchenItems.addEventListener("click", deleteItemsList);
kitchenItems.addEventListener("click", editItemsLists);

getLocalStorage();// globlly calling getLocalStorage 