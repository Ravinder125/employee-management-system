import { Router } from 'express';
import { body } from 'express-validator';
import { upload } from '../middlewares/multer.middleware.js';
import { registerUser } from '../controllers/user.controller.js'


const router = Router();

router
    .route('/register')
    .post(upload.field[{ name: 'avatar', maxCount: 1 }, { name: 'coverImage' }],
        body('email').isEmail().withMessage('Email is not valid'),
        body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
        registerUser
    )

router.route('/login').post()