const form = document.getElementById('book-form');
const booksList = document.getElementById('books');
const confirmationMessage = document.getElementById('confirmation-message');
const submitButton = document.getElementById('submit-btn');
const bookIdInput = document.getElementById('book-id');

const apiUrl = 'http://localhost:5000/books';


async function fetchBooks() {
  const response = await fetch(apiUrl);
  const books = await response.json();
  renderBooks(books);
}


function renderBooks(books) {
  booksList.innerHTML = '';
  books.forEach(book => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${book.title}</strong> by ${book.author} (Status: ${book.status})
      <button onclick="editBook('${book._id}', '${book.title}', '${book.author}', '${book.status}')">Edit</button>
      <button onclick="deleteBook('${book._id}')">Delete</button>
    `;
    booksList.appendChild(li);
  });
}


form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const status = document.getElementById('status').value;
  const bookId = bookIdInput.value;

  const bookData = { title, author, status };

  try {
    if (bookId) {
      
      const response = await fetch(`${apiUrl}/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });
      if (response.ok) {
        confirmationMessage.textContent = 'Book updated successfully!';
      } else {
        confirmationMessage.textContent = 'Error updating book!';
      }
    } else {
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });
      if (response.ok) {
        confirmationMessage.textContent = 'Book added successfully!';
      } else {
        confirmationMessage.textContent = 'Error adding book!';
      }
    }

    
    form.reset();
    bookIdInput.value = '';
    submitButton.textContent = 'Add Book';
    fetchBooks();
  } catch (err) {
    confirmationMessage.textContent = 'Network error, please try again later.';
  }
});


function editBook(id, title, author, status) {
  bookIdInput.value = id;
  document.getElementById('title').value = title;
  document.getElementById('author').value = author;
  document.getElementById('status').value = status;
  submitButton.textContent = 'Update Book';
}


async function deleteBook(id) {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      confirmationMessage.textContent = 'Book deleted successfully!';
      fetchBooks();
    } else {
      confirmationMessage.textContent = 'Error deleting book!';
    }
  } catch (err) {
    confirmationMessage.textContent = 'Network error, please try again later.';
  }
}


fetchBooks();
