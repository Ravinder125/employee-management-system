import { Admin } from '../models/admin.model.js'
import { User } from '../models/user.model.js'


const generateTokenForUser = async (id) => {
    try {
        const user = await User.findById(id).select('+password +refreshToken')
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()
        if (!accessToken || !refreshToken) throw new Error('Error while generating refresh token')

        const options = {
            httpOnly: true,
            secure: true
        }

        return { accessToken, refreshToken, options }

    } catch (error) {
        console.error('Error:', error)
    }
}
const generateTokenForAdmin = async (id) => {
    try {
        const admin = await Admin.findById(id).select('+password +refreshToken')
        const accessToken = await admin.generateAccessToken()
        const refreshToken = await admin.generateRefreshToken()
        if (!accessToken || !refreshToken) throw new Error('Error while generating refresh token')

        const options = {
            httpOnly: true,
            secure: true
        }

        return { accessToken, refreshToken, options }

    } catch (error) {
        console.error('Error:', error)
    }
}

export {
    generateTokenForUser,
    generateTokenForAdmin
}