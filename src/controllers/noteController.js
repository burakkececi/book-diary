import bookRepository from '../dataAccess/bookRepository.js';
import noteRepository from '../dataAccess/noteRepository.js';
import sequelize from '../dataAccess/index.js';
import colors from "colors";

const { Note } = sequelize.models;

const getCreateNotePage = async (req, res, next) => {
    const { bookId } = req.params
    const book = await bookRepository.findBookById(bookId);
    return res.render("pages/createNote", { book: book });
}

const createNote = async (req, res, next) => {
    const { title, content } = req.body;
    try {
        const note = await Note.create({
            UserId: req.user.id,
            bookId: req.params.bookId,
            title: title,
            content: content
        });

        if (note) {
            console.log(colors.green(`Created Note ${JSON.stringify(note, null, 4)}`));
            return res.status(201).redirect("/dashboard");
        }
    } catch (error) {
        throw error;
    }
}

const getNotes = async (req, res, next) => {
    const user = req.user;
    let userNotes = [];
    try {
        const notes = await noteRepository.findNotesAll(user.id);
        userNotes = await Promise.all(notes.map(async function (note) {
            const book = await bookRepository.findBookById(note.bookId);
            const bookNote = {
                id: note.id,
                title: note.title,
                content: note.content,
                createdAt: new Date(note.createdAt).toLocaleDateString(),
                image: book.volumeInfo.imageLinks?.thumbnail,
                bookName: book.volumeInfo.title,
                authors: book.volumeInfo.authors,
            }
            return bookNote;
        }));
        return userNotes;
    } catch (error) {
        console.log(error);
    }
}

export default {
    getCreateNotePage,
    createNote,
    getNotes
}