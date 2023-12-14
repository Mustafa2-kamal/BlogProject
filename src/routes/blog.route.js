import { Router } from "express";
const router=Router();

import * as blogController from "../controllers/blog.controller.js"
import { auth } from "../middlewares/auth.middleware.js";
import { validation } from "../middlewares/validation.middleware.js";
import { blogSchema } from "../validators/blog.validator.js";

router.post('/',auth,validation(blogSchema),blogController.addBlog);
router.get('/',auth,blogController.getBlogs);
router.patch('/:blogId',auth,blogController.updateBlog);
router.delete('/:blogId',auth,blogController.deleteBlog);


export default router;