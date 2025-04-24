import mongoose, { Schema } from 'mongoose';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';


const adminSchema = new Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength: [2, "Firstname must be at least 2 characters long"],
            maxlength: [2, "Firstname must not exceed 20 characters"],
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            minlength: [2, "Firstname must be at least 2 characters long"],
            maxlength: [2, "Firstname must not exceed 20 characters"],
            trim: true
        }
    },
    email: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [8, "Password must be at least 8 characters long"],
        select: false
    },
    refreshToken: {
        type: String,
        trim: true,
        unique: true,
        select: false
    }
}, { timestamps: true });

export const Admin = mongoose.model(adminSchema, 'Admin');

adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) next();
    await bcryptjs.hash(this.password, 10);
});

adminSchema.methods.isPasswordCorrect = async function (password) {
    await bcryptjs.compare(password, this.password);
};

adminSchema.methods.generateRefreshToken = async function () {
    try {
        jwt.sign(
            {
                _id: this._id,
                email: this.email
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: REFRESH_TOKEN_EXPIRY
            }
        )
    } catch (error) {
        console.error('Error while generating Refresh Token');
    }
};

adminSchema.methods.generateAcessToken = async function () {
    try {
        jwt.sign(
            {
                _id: this._id,
                email: this.email
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: ACCESS_TOKEN_EXPIRY
            }
        )
    } catch (error) {
        console.error('Error while generating Refresh Token');
    }
};