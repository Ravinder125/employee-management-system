import { asyncHandler } from '../utils/asynchandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { validationResult } from 'express-validator';
import { User } from '../models/user.model.js';
import { generateTokenForUser } from '../utils/generateToken.js';

const registerUser = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors) {
        res.status(400).json(ApiResponse.error(400, errors.array(), 'Validation error'));
    }

    const { email, password, fullname } = req.body;
    const localFile = req.file
    console.log(localFile)

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        res.status(400).json(ApiResponse.error(400, 'User already exists'))
    }

    const newUser = await User.create({
        email,
        password,
        fullName: {
            firstName: fullname.firstname,
            lastName: fullname.lastname
        }
    })

    return res.status(200).json(ApiResponse.success(200, newUser, 'User successfully created'))
})

const loginUser = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors) {
        res.status(400).json(ApiResponse.error(400, errors.array(), 'Validation error'));
    }
    const { email, password } = req.body;
    const isUserExist = await User.findOne({ email });

    if (!isUserExist || !isUserExist.isPasswordCorrect()) {
        return res.status(401).json(ApiResponse.error(401, 'Email or password is invalid'));
    }

    const { accessToken, refreshToken, options } = await generateTokenForUser()

    return res
        .status(201)
        .cookies('accessToken', accessToken, options)
        .cookies('accessToken', accessToken, options)
        .json(ApiResponse.success(201, isUserExist, 'User successfully logined in'))

})


export {
    registerUser,
    loginUser
}