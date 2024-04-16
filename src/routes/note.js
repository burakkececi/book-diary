import { Router } from "express";
import authController from "../controllers/authController.js";
import noteController from "../controllers/noteController.js";
import bookController from "../controllers/bookController.js";

const router = Router();

router
    .route("/create/:bookId")
    .get(authController.isLoggedIn, noteController.getCreateNotePage)
    .post(authController.isLoggedIn, noteController.createNote);

router
    .route("/create")
    .get(authController.isLoggedIn, bookController.getSearchBookPage)
    .post(authController.isLoggedIn, bookController.findBooksByName);

export default router;