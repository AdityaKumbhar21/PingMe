import { Router } from "express";
import {signup, login, logout, updateProfile, checkAuth} from "../controllers/authControllers.js"
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.put('/updateProfile',isLoggedIn,  updateProfile);
router.get('/check',isLoggedIn,  checkAuth);


export default router;