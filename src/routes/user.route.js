import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router=Router();

router.get('/',auth,userController.getUser);
router.patch('/',auth,userController.updateUser);
router.patch('/updatePassword',auth,userController.updatePassword);

export default router;