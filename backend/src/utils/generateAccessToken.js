import { Admin } from '../models/admin.model'
import { User } from '../models/user.model'


const generateAcessTokenForUser = async (id) => {
    try {
        const user = await User.findById(id).select('+password +refreshToken')
        const token = await user.generateAccessToken()
        if (!token) throw new Error('Error while generating refresh token')
        return { token }

    } catch (error) {
        console.error('Error:', error)
    }
}
const generateAcessTokenForAdmin = async (id) => {
    try {
        const admin = await Admin.findById(id).select('+password +refreshToken')
        const token = await admin.generateAccessToken()
        if (!token) throw new Error('Error while generating refresh token', token)
        return { token }

    } catch (error) {
        console.error('Error:', error)
    }
}