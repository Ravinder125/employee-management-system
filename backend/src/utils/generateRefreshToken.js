import { Admin } from '../models/admin.model'
import { User } from '../models/user.model'


const generateRefreshTokenForUser = async (id) => {
    try {
        const user = await User.findById(id).select('+password +refreshToken')
        const token = await user.generateRefreshToken()
        if (!token) throw new Error('Error while generating refresh token')
        return { token }

    } catch (error) {
        console.error('Error:', error)
    }
}
const generateRefreshTokenForAdmin = async (id) => {
    try {
        const admin = await Admin.findById(id).select('+password +refreshToken')
        const token = await admin.generateRefreshToken()
        if (!token) throw new Error('Error while generating refresh token', token)
        return { token }

    } catch (error) {
        console.error('Error:', error)
    }
}