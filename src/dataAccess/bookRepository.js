const findBooksByName = async (query) => {
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
        const books = await response.json();
        return books.items;
    } catch (error) {
        console.log(error);
    }
}

const findBookById = async (bookId) => {
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
        const book = await response.json();
        return book;
    } catch (error) {
        console.log(error);
    }
}

export default {
    findBookById,
    findBooksByName
}