import {Router} from 'express'
import { createPost, deletePost, getOnePost, getPost, updatePost } from '../controllers/controllers.js'
const router = Router()

router.get("/post",getPost)
router.post("/post",createPost)
router.put("/post/:id",updatePost)
router.delete("/post/:id",deletePost)
router.get("/post/:id",getOnePost)

export default router
