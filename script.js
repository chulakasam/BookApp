function searchBooks(){
    const book_name = document.getElementById("book_name").value;
    const loading = document.getElementById("loading");
    const bookList = document.getElementById("book-list");
    if (!book_name) return;

    loading.classList.remove("hidden");
    bookList.innerHTML = ""; // clear the text filed



    fetch(`http://localhost:8080/api/search?query=${book_name}`)
        .then(response => response.json())
        .then(data => {
            loading.classList.add("hidden");

            if (data.length === 0) {
                bookList.innerHTML = "<p>No books found.</p>";
            } else {
                data.forEach(book => {
                    const bookItem = document.createElement("div");
                    bookItem.classList.add("book-item");





                    //  null checks to avoid undefine errors
                    const title = book.volumeInfo?.title || "No title available";
                    const authors = book.volumeInfo?.authors ? book.volumeInfo.authors.join(", ") : "No author";
                    const description = book.volumeInfo?.description || "No description available";
                    const imageUrl = book.volumeInfo?.imageLinks?.thumbnail || '';
                    const infoLink = book.volumeInfo?.infoLink || "#";

                    bookItem.innerHTML = `
                          <img src="${imageUrl}" alt="${title}" />
                          <h3>${title}</h3>
                          <p>By: ${authors}</p>
                          <p>${description}</p>
                          <a href="${infoLink}" target="_blank">More Info</a>
                    `;

                    bookList.appendChild(bookItem);
                });
            }
        })
        .catch(error => {
            loading.classList.add("hidden");
            bookList.innerHTML = "<p>Error fetching books.</p>";
            console.error(error);
        });
}