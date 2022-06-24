const localStorageKey = "BOOK_DATA";

const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');
const title = document.querySelector("#inputBookTitle");
const author = document.querySelector("#inputBookAuthor");
const year = document.querySelector("#inputBookYear");
const isRead = document.querySelector("#inputBookIsComplete");
const btnSubmit = document.querySelector("#buttonSubmit");
const searchValue = document.querySelector("#searchBookTitle");
const btnSearch = document.querySelector("#searchButton");
const btnReset = document.querySelector("#resetButton");

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

function formValidation() {
  function validation(check) {
    return check.value === "";
  }

  return validation(title) || validation(author) || validation(year);
}

isRead.addEventListener("change", function () {
  const isReadCheck = isRead.checked;

  if (isReadCheck) {
    document.querySelector(".isCompleted").style.display = "inline-block";
    document.querySelector(".isNotCompleted").style.display = "none";
  } else {
    document.querySelector(".isNotCompleted").style.display = "inline-block";
    document.querySelector(".isCompleted").style.display = "none";
  }
});

window.addEventListener("load", function () {
  if (localStorage.getItem(localStorageKey) !== "") {
    const booksData = getData();
    renderData(booksData);
  }
});

function clear() {
  title.value = "";
  author.value = "";
  year.value = "";
  isRead.checked = false;
}

btnSubmit.addEventListener("click", function () {
  const formVal = formValidation();
  if (formVal) {
    alert("Masih ada data yang kosong, silahkan periksa kembali!");
  } else {
    const newBook = {
      id: +new Date(),
      title: title.value.trim(),
      author: author.value.trim(),
      year: year.value,
      isCompleted: isRead.checked,
    };

    insertData(newBook);
    clear();
  }
});

function renderSearchResult(books) {
  renderData(books);
}

btnReset.addEventListener("click", function () {
  searchValue.value = "";
  renderData(getData());
});

btnSearch.addEventListener("click", function (e) {
  e.preventDefault();

  if (localStorage.getItem(localStorageKey) == "") {
    alert("Tidak ada data buku");
    return location.reload();
  } else {
    const getByTitle = getData().filter(
      (a) => a.title == searchValue.value.trim()
    );
    if (getByTitle.length == 0) {
      const getByAuthor = getData().filter(
        (a) => a.author == searchValue.value.trim()
      );
      if (getByAuthor.length == 0) {
        const getByYear = getData().filter(
          (a) => a.year == searchValue.value.trim()
        );
        if (getByYear.length == 0) {
          alert(`Data yang Anda cari tidak ditemukan`);
          return location.reload();
        } else {
            renderSearchResult(getByYear);
        }
      } else {
        renderSearchResult(getByAuthor);
      }
    } else {
        renderSearchResult(getByTitle);
    }
  }
  searchValue.value = "";
});