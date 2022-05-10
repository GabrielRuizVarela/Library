
// ============= // 
const addButton = document.querySelector('.add');
const overlay = document.querySelector('.overlay');
const addContainer = document.querySelector('.add-container');
const submit = document.querySelector('.submit');
const bookContainer = document.querySelector('.book-container');
const author = document.querySelector('#entry-author');
const title = document.querySelector('#entry-title');
const year = document.querySelector('#entry-year');
const entryStatus = document.querySelector('#entry-status');
addButton.addEventListener('click', enableOverlay);
document.addEventListener('mouseup', e => clickOverlay(e));
document.addEventListener('keydown', e => escapeOverlay(e));
submit.addEventListener('click',addBooktoLibrary);
entryStatus.addEventListener('mouseup',e=>toggleStatus(e));

let myLibrary = [];

function Book(author, title, year, read) {
    this.author = author;
    this.title = title;
    this.year = year;
    this.read = read;
}

// ======= //

function enableOverlay(){
   overlay.classList.add('active');
   addContainer.classList.add('active');
}

function disableOverlay(){
    overlay.classList.remove('active');
    addContainer.classList.remove('active');
}

function clickOverlay(e){
    if(!addContainer.contains(e.target) && overlay.classList.contains("active")){
        disableOverlay();
    }
}

function escapeOverlay(e){
    if(e.key==='Escape'){
        disableOverlay();
    }
}

function toggleStatus(e){
    e.target.classList.toggle('not-read');
    if(e.target.textContent === 'Not read'){
        e.target.textContent = 'Read';
    }else{
        e.target.textContent = 'Not read';
    }
}

// ======= //

function addBooktoLibrary(){
    let read = true;
    if(entryStatus.textContent==='Not read'){read = false}
    const newBook = new Book(author.value, title.value, year.value, read);
    myLibrary.push(newBook);
    drawCards();
    disableOverlay();
}

function drawCards(){
    bookContainer.innerHTML = '';
    myLibrary.forEach((book,item)=>setupCards(book,item));
    let statusButtons = document.querySelectorAll('.status'); 
    let removeButtons = document.querySelectorAll('.remove');
    statusButtons.forEach(item => item.addEventListener('mouseup',e=>toggleStatus(e)));
    removeButtons.forEach(item => item.addEventListener('mouseup',e=>removeBook(e)));
}

function setupCards(book,index){
    if(!book.read){
            bookContainer.innerHTML+=`<div class="card" data-order="${index}">
                <div class="info">Author:</div><div class="added" id="author">${book.author}</div>
                <span></span>
                <div class="info">Title:</div><div class="added" id="title">${book.title}</div>
                <span></span>
                <div class="info">Year:</div><div class="added" id="year">${book.year}</div>
                <button class="status not-read">Not read</button>
                <button class="remove">Remove</button>
                </div>`;
        } else{
            bookContainer.innerHTML+=`<div class="card" data-order="${index}">
                <div class="info">Author:</div><div class="added" id="author">${book.author}</div>
                <span></span>
                <div class="info">Title:</div><div class="added" id="title">${book.title}</div>
                <span></span>
                <div class="info">Year:</div><div class="added" id="year">${book.year}</div>
                <button class="status">Read</button>
                <button class="remove">Remove</button>
                </div>`;
        }
}

function removeBook(e){
    let index = e.target.parentElement.getAttribute('data-order');
    myLibrary.splice(Number(index),1);
    drawCards();
}