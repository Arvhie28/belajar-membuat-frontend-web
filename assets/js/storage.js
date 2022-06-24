function getData() {
  return JSON.parse(localStorage.getItem(localStorageKey)) || [];
}

function insertData(books) {
  alert(`Data Buku Berhasil Ditambahkan!`);

  let book = books;
  let bookData = [];

  if (localStorage.getItem(localStorageKey) === null) {
    bookData = [];
  } else {
    bookData = JSON.parse(localStorage.getItem(localStorageKey));
  }
  bookData.push(book);

  localStorage.setItem(localStorageKey, JSON.stringify(bookData));

  renderData(getData());
}

function getBooksInformation() {
  const bookshelf = getData();

  const allBooks = bookshelf.length;


  for (let i = 0; i < allBooks; i++) {
    bookshelf[i]
  }

  document.querySelector("#totalBook").innerHTML = allBooks;
}

function renderData(books = []) {
  const inCompleted = document.querySelector("#inCompleteBookshelfList");
  const completed = document.querySelector("#completeBookshelfList");

  inCompleted.innerHTML = "";
  completed.innerHTML = "";

  books.forEach((book) => {
    if (book.isCompleted == false) {
      let i = `
          <article class="book-item card">
            <div class="book-information">
                <h3 style="text-align:justify;">${book.title}</h3>
                <p style="text-align:justify;">Penulis: ${book.author}</p>
                <p>Tahun: ${book.year}</p>
            </div>
            <div class="action action-control-book">
              <button class="bg-success text-white" onclick="readedBook('${book.id}')">
                  <span>Selesai Dibaca</span>
              </button>
              <button class="bg-danger text-white" onclick="removeBook('${book.id}')">
                <span>Hapus Buku</span>
                </button>
              </div>
          </article>
          `;

      inCompleted.innerHTML += i;
    } else {
      let i = `
          <article class="book-item card">
            <div class="book-information">
              <h3 style="text-align:justify;">${book.title}</h3>
              <p style="text-align:justify;">Penulis: ${book.author}</p>
              <p>Tahun: ${book.year}</p>
            </div>
            <div class="action action-control-book" >
              <button class="bg-success text-white" onclick="unreadedBook('${book.id}')"> 
                <span>Belum Dibaca</span>
              </button>
              <button class="bg-danger text-white" onclick="removeBook('${book.id}')">
                <span>Hapus Buku</span>
              </button>
              </div>
          </article>
          `;
      completed.innerHTML += i;
    }
  });
  getBooksInformation();
}

function removeBook(id) {
  let cfm = confirm("Apakah Anda yakin akan menghapus data buku ini?");

  if (cfm == true) {
    const bookDataDetail = getData().filter((a) => a.id == id);
    const bookData = getData().filter((a) => a.id != id);
    localStorage.setItem(localStorageKey, JSON.stringify(bookData));
    renderData(getData());
    alert(`Buku ${bookDataDetail[0].title} telah terhapus dari rak`);
  } else {
    return 0;
  }
  getBooksInformation();
}

function readedBook(id) {
  let cfm = confirm("Pindahkan buku ke rak yang Selesai Dibaca?");

  if (cfm == true) {
    const bookDataDetail = getData().filter((a) => a.id == id);
    const newBook = {
      id: bookDataDetail[0].id,
      title: bookDataDetail[0].title,
      author: bookDataDetail[0].author,
      year: bookDataDetail[0].year,
      isCompleted: true,
    };

    const bookData = getData().filter((a) => a.id != id);
    localStorage.setItem(localStorageKey, JSON.stringify(bookData));

    insertData(newBook);
  } else {
    return 0;
  }
  getBooksInformation();

}

function unreadedBook(id) {
  let cfm = confirm("Pindahkan buku ke rak yang Belum Selesai Dibaca?");

  if (cfm == true) {
    const bookDataDetail = getData().filter((a) => a.id == id);
    const newBook = {
      id: bookDataDetail[0].id,
      title: bookDataDetail[0].title,
      author: bookDataDetail[0].author,
      year: bookDataDetail[0].year,
      isCompleted: false,
    };

    const bookData = getData().filter((a) => a.id != id);
    localStorage.setItem(localStorageKey, JSON.stringify(bookData));

    insertData(newBook);
  } else {
    return 0;
  }
  getBooksInformation();
}