let myLibrary = [];
let bookGrid = document.querySelector(".book-grid");
let form = document.querySelector(".form");
let titleInput = document.querySelector("#title");
let authorInput = document.querySelector("#author");
let pagesInput = document.querySelector("#numPages");
let readInput = document.querySelector("#readStatus");
let titleError = document.querySelector("#titleError");
let authorError = document.querySelector("#authorError");
let pagesError = document.querySelector("#pagesError");

const red = "#f55f5f";
const green = "#79e888";

function Book(title, author, pages, readStatus){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

function showForm(){
    form.style.display = "block";
}

function addBookToLibrary(){
    if(titleInput.value && authorInput.value && pagesInput.value){
        myLibrary.push(new Book(titleInput.value, authorInput.value, pagesInput.value, readInput.checked));
        display(myLibrary[myLibrary.length - 1]);
        hideErrors();
    } else {
        if(!titleInput.value) titleError.style.visibility = "visible";
        if(!authorInput.value) authorError.style.visibility = "visible";
        if(!pagesInput.value) pagesError.style.visibility = "visible";
    }
}

function display(book){
    const bookDiv = document.createElement('div');
    bookDiv.setAttribute("class", "bookDiv");

    let cardTitle = document.createElement("h3");
    let cardAuthor = document.createElement("h3");
    let cardPages = document.createElement("h3");
    let cardRead = document.createElement("button");
    let buttonGroup = document.createElement("div");
    buttonGroup.setAttribute("class", "button-group");

    cardTitle.innerText = book.title;
    cardAuthor.innerText = book.author;
    if(book.pages != ""){
        cardPages.innerText = book.pages + " pages";
    }
    // cardRead.innerText = book.readStatus;
    cardRead.setAttribute("class", "statusButton")
    cardRead.innerText = makeRedOrGreen();
    cardRead.addEventListener("click", function(){
        if(book.readStatus){
            book.readStatus = false;
            cardRead.style["background-color"] = red;
            cardRead.innerText = "Unread";
        } else {
            book.readStatus = true;
            cardRead.style["background-color"] = green;
            cardRead.innerText = "Read";
        }
    })

    function makeRedOrGreen(){
        if(book.readStatus){
            cardRead.style["background-color"] = green;
            return "Read";
        } else {
            cardRead.style["background-color"] = red;
            return "Unread";
        }
    }

    bookDiv.appendChild(cardTitle);
    bookDiv.appendChild(cardAuthor);
    bookDiv.appendChild(cardPages);
    bookDiv.appendChild(buttonGroup);
    buttonGroup.appendChild(cardRead);


    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("id", "deleteBtn");
    deleteBtn.setAttribute("onclick", "deleteBook(this)");
    deleteBtn.innerHTML = "<i class='bi bi-trash3'></i>";
    buttonGroup.appendChild(deleteBtn);
    bookGrid.appendChild(bookDiv);
    form.style.display = "none";
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    readInput.value = "";
}

function deleteBook(book){
    let warning = confirm("Are you sure you want to delete this?");
    if(warning){
        book.parentElement.parentElement.style.display = "none";
        //delete from array
        let siblings = book.parentElement.parentElement.children;
        for(let i = 0; i < myLibrary.length; i++){
            if(myLibrary[i].title == siblings[0].innerText && myLibrary[i].author == siblings[1].innerText){
                myLibrary.splice(i, 1);
            }
        }
    }
}

function cancel(){
    form.style.display = "none";
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    hideErrors();
}

function hideErrors(){
    titleError.style.visibility = "hidden";
    authorError.style.visibility = "hidden";
    pagesError.style.visibility = "hidden";
}





