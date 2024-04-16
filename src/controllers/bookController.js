import bookRepository from "../dataAccess/bookRepository.js";
import colors from "colors";

const findBooksByName = async (req, res, next) => {
    const query = req.body.query?.split(" ").join("+");
    if (query) {
        const books = await bookRepository.findBooksByName(query);        
        res.render("pages/searchBook", { books: books })
    } else {
        res.status(400);
        console.log(colors.red("Error on searching books query!"));
    }
}

const getSearchBookPage = (req, res, next) => {
    return res.render("pages/searchBook");
}

export default {
    getSearchBookPage,
    findBooksByName,
}