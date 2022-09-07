let myLibrary = [];
const form = document.querySelector('.form-div');
const newbook = document.querySelector('#newbook');
const add = document.querySelector('#add');
const addDiv = document.querySelector('.add-div')
const tbody = document.querySelector('tbody');


// update table once loaded
document.addEventListener('DOMContentLoaded',addBookToLibrary)

newbook.addEventListener('click',(e)=>{
    form.style.display='block';
    addDiv.style.display='none';
})






add.addEventListener('click',(e)=>{
    let author = document.querySelector('#author')
    let title = document.querySelector('#title')
    let pages = document.querySelector('#pages')
    let read = document.querySelector('#read')
    if (author.value=='' | title.value=='' | pages.value==''){
        return;
    }
    book = new Book(author.value,title.value,pages.value,read.checked)
    book.addBook()
    addBookToLibrary()
    // put back to the default
    author.value=''
    title.value=''
    pages.value=''
    read.checked=false;
    form.style.display='none';
    addDiv.style.display='block';
})

function Book(author,title,pages,read) {
   this.author= author;
   this.title = title;
   this.pages = pages;
   this.read= read;
   return this
}

Book.prototype.addBook = function (){
    myLibrary.push(this)
}

Book.prototype.switchRead = function(){
    this.read = !this.read
}

Book.prototype.removeBook = function(){
    console.log(myLibrary.indexOf(this))
}

function addBookToLibrary(){
    // empty table first 
    tbody.innerHTML = '<tr class="header">\
    <th>Author</th>\
    <th>Title</th>\
    <th>Pages</th>\
    <th>Read</th>\
    <th>Edit</th>\
    </tr>'
  for (let i =0;i <myLibrary.length;i++){
    const book = myLibrary.at(i)
    const tr = document.createElement('tr')
    let string =''
    if (book.read == true){
      string = 'Read'
   } else{
    string = 'Unread'
   }
    tr.innerHTML = `
    <td>${book.author}</td>
    <td>${book.title}</td>
    <td>${book.pages}</td>
    <td>${string}  <button class='blue'><i class="bi bi-arrow-left-right"></i></button></td>
    <td><button class='red'>Remove</button>`
tr.setAttribute('id',i+1)
// add trigger to the remove button 
const button = tr.querySelector('.red')
button.addEventListener('click',(e)=>
{
    //remove the item from the array 
    const index = parseInt(button.closest('tr').id)
    myLibrary.splice(index-1,1);
    addBookToLibrary()
    
})
// add trigger to the toggle button

const toggle = tr.querySelector('.blue')
toggle.addEventListener('click',(e)=>
 {const index= parseInt(button.closest('tr').id) -1
  const book = myLibrary.at(index)
  book.switchRead()
  addBookToLibrary()
  
 }
)



tbody.appendChild(tr)
  }
    
}

book1 = new Book('Stephen King','It',450,true)
book1.addBook()
book2 = new Book('Min Jin Lee','Pachinko',440,true)
book2.addBook()

book3 = new Book('Pluto','Naoki Urasawa',190,true)
book3.addBook()

book4 = new Book('Stories of Sherlock Holmes','Conan Doyle',230,true)
book4.addBook()