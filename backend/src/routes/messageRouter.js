import {Router} from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { getUsers, getMessages, sendMessage } from "../controllers/messageControllers.js";


const router = Router();



router.get('/', (req, res)=>{
    res.send("This is a message route");
});

router.get('/users', isLoggedIn, getUsers);
router.get('/:id', isLoggedIn, getMessages);
router.post('/send/:id', isLoggedIn, sendMessage);



export default router;