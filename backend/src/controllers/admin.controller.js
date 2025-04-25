import { asyncHandler } from '../utils/asynchandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { validationResult } from 'express-validator';
import { Admin } from '../models/admin.model.js';

const registerAdmin = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors) res.status(400).json(ApiResponse.error(400, errors.array(), 'Validation error'));

    const { email, password } = req.body;
    const localFile = req.file

    const existingAdmin = await Admin.findOne({ email });
    if (!existingAdmin) res.status(400).json(ApiResponse.error(400, 'Admin already exists'))

    const newAdmin = await Admin.create({
        email,
        password
    })
})

export {
    registerAdmin
}