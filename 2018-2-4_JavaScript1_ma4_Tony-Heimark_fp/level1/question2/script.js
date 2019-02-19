// declaring global variables and adding some HTML
let countFalse = 0;
let countTotal = 0;
const parent = document.querySelector("body");
const heading = document.createElement("h1");
const topWrapper = document.createElement("div");
topWrapper.setAttribute("id", "totalwrap");
parent.appendChild(heading);
parent.appendChild(topWrapper);


// fetching JSON and calling functions
fetch('https://jsonplaceholder.typicode.com/todos')
  .then(function(response) {
    return response.json();
  })
  .then((res) => {
    sortElements(res);
    createElements(res);
  })
.catch(err => console.log(err))


// Sorting all todos to show all the ones yet to be completed at the top.
function sortElements(todo){
    todo.sort(function(a, b){
        if (!a.completed && b.completed) {
            return -1
        } else if (!b.completed && a.completed){
            return 1
        } else {
            return 0
        }
    })
}

// creating HTML elements and putting the JSON info inside it.
function createElements(todo){    
         for(let i = 1; i < todo.length; i++){
            const wrapper = document.createElement("div");
            topWrapper.appendChild(wrapper);
            wrapper.setAttribute("id", "wrapper" + i);
            const wrapperContent = document.getElementById("wrapper" + i);
            wrapperContent.innerHTML = '<div class="container"><div class="title-holder"><h2 class="title"></h2></div><div class="information"><p class="completed"></p></div></div>';
            if(JSON.stringify(todo[i].completed) == "false"){
                countFalse = countFalse + 1;
                countTotal = countTotal + 1;
                wrapperContent.querySelector(".information").style.background = "#f94040";
            } else{
                wrapperContent.querySelector(".information").style.background = "#84d145";
                countTotal = countTotal + 1;
            }
             
            wrapperContent.querySelector("h2").innerHTML = JSON.stringify(todo[i].title);
            wrapperContent.querySelector("p").innerHTML = JSON.stringify(todo[i].completed);
        }
    headingUpdater();
}

// allows you to click to make a todo complete or incomplete.
addEventListener("click", function(e) {
    const currentColor = e.target.parentElement.style.backgroundColor;

    if (currentColor == "rgb(249, 64, 64)") {
        e.target.parentElement.style.backgroundColor = "rgb(132, 209, 69)";
        e.target.innerHTML = "true";
        countFalse = countFalse - 1;
        headingUpdater();
    }
    else if (currentColor == "rgb(132, 209, 69)"){
        e.target.parentElement.style.backgroundColor = "rgb(249, 64, 64)";
        e.target.innerHTML = "false";
        countFalse = countFalse + 1;
        headingUpdater();
    }
});

function headingUpdater(){
    heading.innerHTML = `Hello, welcome to your ${countTotal} todos.<br />You currently have ${countFalse} left to complete!<br />You have completed ${countTotal - countFalse} so far, Good job!`
}


