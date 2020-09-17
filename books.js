const title = document.querySelector('#title');
const author = document.querySelector('#author');
const isbn = document.querySelector('#isbn');

const btn = document.querySelector('.btn');
const bookList = document.querySelector('#book-list');

btn.addEventListener('click', function(e){
    e.preventDefault();

    if(title.value == '' || author.value == '' || isbn.value == ''){
        alert("Please fill in all the fields");
    }else{
        const newRow = document.createElement('tr');

        const newTitle = document.createElement('td');
        newTitle.innerHTML = title.value;
        newRow.appendChild(newTitle);

        const newAuthor = document.createElement('td');
        newAuthor.innerHTML = author.value;
        newRow.appendChild(newAuthor);

        const newIsbn = document.createElement('td');
        newIsbn.innerHTML = isbn.value;
        newRow.appendChild(newIsbn);
        

        bookList.appendChild(newRow);

        // clears the fields after submiting
        clearFields();
    }
});

function clearFields(){
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
}