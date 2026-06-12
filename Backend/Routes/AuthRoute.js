import { Router } from "express";
import { Signup } from "../Controllers/AuthController.js";
const router = Router();

router.post("/signup",Signup)

export default router