import { Router } from "express";
const router =Router();

import * as authController from '../controllers/auth.controller.js'
import { validation } from "../middlewares/validation.middleware.js";
import { signinSchema, signupSchema } from "../validators/auth.validator.js";

router.post('/signup',validation(signupSchema),authController.signup);
router.post('/signin',validation(signinSchema),authController.singin);

export default router;