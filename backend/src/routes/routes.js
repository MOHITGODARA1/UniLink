import express from "express";
import RegisterUser from "../controllers/registerUser.js";
import LoginCheck from "../controllers/Login.js";
const router=express.Router();

router.post("/user-Register",RegisterUser);
router.post("/Login",LoginCheck)

export default router;