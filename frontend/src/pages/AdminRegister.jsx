import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import { registerAdmin } from '../services/admin.service';
import { AdminDataContext } from '../context/AdminContext';
import Loading from '../components/Loading';
import SocialIcon from '../components/SocialIcon';

const AdminRegister = () => {
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        avatar: null
    });
    const [isLoading, setIsLoading] = useState(false);
    const { adminData, setAdminData } = useContext(AdminDataContext);
    const navigate = useNavigate()

    const cleanInputs = () => {
        setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            avatar: null
        });
        setErrors({});
    };

    const validate = (name, value) => {
        switch (name) {
            case 'email':
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    return 'Invalid email format';
                }
                break;
            case 'password':
                if (value.length < 8) {
                    return 'Password must be at least 8 characters long';
                }
                break;
            case 'confirm-password':
                if (value !== formData.password) {
                    return 'Password and comfirm pasword must be same'
                }
            default:
                return '';
        }
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;

        switch (name) {
            case 'avatar':
                setFormData(prev => ({ ...prev, [name]: files[0] }));
                break;
            case 'confirm-password':
                setFormData(prev => ({ ...prev, 'confirmPassword': value }))
                setErrors(prev => ({ ...prev, 'confirmPassword': validate(name, value) }));
            default:
                setFormData(prev => ({ ...prev, [name]: value }));
                setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
                if (!value) {
                    setErrors(prev => ({ ...prev, [name]: '' }));
                    setErrors(prev => ({ ...prev, 'confirmPassword': '' }));
                }
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email ||
            !formData.password ||
            !formData.confirmPassword ||
            !formData.username ||
            !formData.avatar) {
            alert('Please first fill all the fields ');
            return;
        }

        const registerformData = {
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            avatar: formData.avatar,
            username: formData.username
        }
        setIsLoading(true);
        try {
            const response = await registerAdmin(registerformData);
            if (response.status === 201) {
                setAdminData(response.data.data);
                console.log(response.data.data);
                navigate('/admin-login')
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            cleanInputs()
            setIsLoading(false);
        }
    };

    useEffect(() => {
        console.log('Admin Data Updated:', adminData);
    }, [adminData]);

    return (
        <div className="min-h-screen bg-black flex justify-center items-center p-3 ">
            {isLoading ? (
                <div><Loading /></div>
            ) : (
                <div className={`flex bg-[#222222] flex-col text-white items-center justify-center max-h-full min-h-150  border border-gray-300 rounded-2xl p-5 w-90 max-w-md shadow-lg`}>
                    {/* Main Form */}
                    <div className="w-full text-center">
                        <form onSubmit={handleSubmit} className={`flex flex-col gap-3 `}>
                            <h3 className="font-extrabold text-3xl mb-1">Register</h3>
                            <Input
                                type="text"
                                name="username"
                                value={formData.username}
                                placeholder="Enter your username"
                                onChange={handleInputChange}
                                icon="user"
                            />
                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                placeholder="Enter your email"
                                onChange={handleInputChange}
                                error={errors.email}
                                icon="mail"
                            />
                            <Input
                                type="password"
                                name="password"
                                value={formData.password}
                                placeholder="Enter your password"
                                onChange={handleInputChange}
                                error={errors.password}
                                icon="lock-password"
                            />
                            <Input
                                type="password"
                                name="confirm-password"
                                value={formData.confirmPassword}
                                placeholder="Enter your password again"
                                onChange={handleInputChange}
                                error={errors.confirmPassword}
                                icon="lock-password"
                            />
                            <Input
                                type="file"
                                name="avatar"
                                onChange={handleInputChange}
                                icon="file"
                            />
                            <button className="border border-yellow-500 p-2 font-bold text-xl rounded-lg bg-yellow-400 text-white">Register</button>
                            <p className='text-sm'>Don't have a account ? <Link to='/admin-login' className='text-blue-500'>Login here </Link></p>
                            <p className="text-sm text-gray-600">Or login with social platforms</p>
                            <div className="flex gap-2 justify-center">
                                <SocialIcon icon="ri-github-fill" />
                                <SocialIcon icon="ri-facebook-fill" />
                                <SocialIcon icon="ri-google-fill" />
                                <SocialIcon icon="ri-linkedin-fill" />
                            </div>
                            <Link to='/register' className='mt-3 border border-yellow-700 bg-green-600 text-white p-2 text-lg font-bold rounded-lg'>Register as Employee</Link>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};


export default AdminRegister;
