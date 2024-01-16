import { Router } from "express";
import { registerUser, loginUser } from '../controllers/auth'
import { registerValidation } from "../middleware/register-validation";
import { loginValidation } from "../middleware/login-validation";

const router = Router();

router.post('/register', registerValidation, registerUser);
router.post('/login', loginValidation, loginUser);

export default router
