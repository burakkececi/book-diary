import { Router } from "express";
import root from "./root.js"
import auth from "./auth.js"
import note from "./note.js"

const router = Router();
router.use("/", root);
router.use("/auth", auth);
router.use("/note", note);

export default router;