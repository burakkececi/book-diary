import { Router } from "express";
import authController from "../controllers/authController.js"

const router = Router();

// Login
router
    .route("/login")
    .get(authController.getLoginPage)
    .post(authController.loginWithEmailAndPassword);

router
    .route("/google")
    .get(authController.loginWithGoogle);

router
    .route("/google/dashboard")
    .get(authController.redirectLoginWithGoogle);

// Register
router
    .route("/register")
    .get(authController.getRegisterPage)
    .post(authController.registerWithEmailAndPassword);

// Logout
router
    .route("/logout")
    .get(authController.logout);

export default router;