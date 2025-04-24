import { asyncHandler } from '../utils/asynchandler';
import { ApiResponse } from '../utils/ApiResponse';
import { validationResult } from 'express-validator';
import { User } from '../models/user.model';

const registerUser = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors) res.status(400).json(ApiResponse.error(400, errors.array(), 'Validation error'));

    const { email, password } = req.body;
    const localFile = req.file

    const existingUser = await User.findOne({ email });
    if (!existingUser) res.status(400).json(ApiResponse.error(400, 'User already exists'))

    const newUser = await User.create({
        email,
        password
    })
})


export {
    registerUser
}