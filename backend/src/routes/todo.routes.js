import { Router } from 'express'
import { body } from 'express-validator'
import { createTodo, updateTodo, toggleDeleteTodo, getAllTodos } from '../controllers/todo.controller.js'
import { authAdmin } from '../middlewares/auth.middleware.js';



const router = Router();

router.route('/').get(authAdmin, getAllTodos)

router
    .route('/create')
    .post(authAdmin,
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('description').notEmpty().withMessage('Description is required')
    ],
        createTodo)

router.route('/:todoId')
    .patch(authAdmin, updateTodo)
    .delete(authAdmin, toggleDeleteTodo)


export default router
