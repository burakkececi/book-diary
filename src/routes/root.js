import { Router } from "express";
import authController from "../controllers/authController.js";
import rootController from "../controllers/rootController.js";

const router = Router();

router
    .route("/")
    .get(rootController.getWelcomePage);

router
    .route("/dashboard")
    .get(authController.isLoggedIn, rootController.getDashboardPage);

export default router;