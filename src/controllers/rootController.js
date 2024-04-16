import noteController from "./noteController.js";

const getDashboardPage = async (req, res, next) => {
    const notes = await noteController.getNotes(req, res, next);
    res.render("pages/dashboard", { userNotes: notes });
}

const getWelcomePage = (req, res, next) => {
    return res.render("pages/welcome");
}

export default {
    getWelcomePage,
    getDashboardPage
}