import express from "express";
import { getRegiterUser, googleLogin, login, logout, register,  } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register)

router.post('/login', login)

router.post('/logout',logout)

router.post('/google-login', googleLogin);

router.get('/register-user', getRegiterUser)

export default router;