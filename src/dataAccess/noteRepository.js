import sequelize from "./index.js"

const { Note } = sequelize.models;

const findNoteById = async (noteId) => {
    try {
        const note = await Note.findByPk(noteId);
        if (note === null) {
            console.log('Not found!');
            return null;
        } else {
            if (note instanceof Note) {
                return note;
            }
            return null;
        }
    } catch (error) {
        console.log(error);
    }
}

const findNotesAll = async (userId) => {
    try {
        const notes = await Note.findAll({ where: { UserId: userId } });
        if (notes === null) {
            console.log('Not found!');
        } else {
            if (notes.every(note => note instanceof Note)) {
                return notes;
            }
        }
        return null;
    } catch (error) {
        console.log(error);
    }
}

export default {
    findNoteById,
    findNotesAll
}