import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import { registerAdmin, loginAdmin } from '../services/admin.service';
import { AdminDataContext } from '../context/AdminContext';
import Loading from '../components/Loading';

const AdminAuth = () => {
    const [isRegister, setIsRegister] = useState(true);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        avatar: null
    });
    const [isLoading, setIsLoading] = useState(false);
    const { adminData, setAdminData } = useContext(AdminDataContext);
    const navigate = useNavigate()

    const cleanAndToggle = () => {
        setIsRegister(prev => !prev);
        setFormData({
            username: '',
            email: '',
            password: '',
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
            default:
                return '';
        }
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'avatar') {
            setFormData(prev => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
            if (!value) {
                return setErrors(prev => ({ ...prev, [name]: '' }));
            }
            setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (isRegister) {
                const registerformData = {
                    email: formData.email,
                    password: formData.password,
                    avatar: formData.avatar,
                    username: formData.username
                };
                const response = await registerAdmin(registerformData);
                if (response.status === 201) {
                    setAdminData(response.data.data);
                    console.log(response.data.data); // log the fresh data
                }
                cleanAndToggle()
            } else {
                const loginData = {
                    email: formData.email,
                    password: formData.password,
                };
                const response = await loginAdmin(loginData);
                if (response.status === 200) {
                    setAdminData(response.data.data);
                    console.log(response.data.data); // log the fresh data
                    navigate('/dashboard')
                }
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        console.log('Employee Data Updated:', adminData);
    }, [adminData]);

    return (
        <div className="min-h-screen h-screen flex justify-center items-center p-3 bg-gray-100">
            {isLoading ? (
                <div><Loading /></div>
            ) : (
                <div className={`relative flex flex-col items-center overflow-hidden h-full border border-gray-300 rounded-2xl p-5 w-full max-w-md bg-white shadow-lg
                ${isRegister ? 'justify-normal' : 'justify-center'}`}>
                    <div className={`absolute left-0 w-full h-full p-5 rounded-[100px] text-white bg-yellow-400 flex flex-col transition-all duration-500 ease-in-out
                            ${!isRegister ? '-top-[75%] justify-end' : '-bottom-[75%] justify-start'}`}>
                        <div className="flex flex-col gap-2 justify-center items-center">
                            <h2 className="font-extrabold text-2xl">Hello, Welcome!</h2>
                            <p className="text-sm">{!isRegister ? 'Already have an account?' : "Don't have an account?"}</p>
                            <Link
                                onClick={cleanAndToggle}
                                className="border px-6 py-2 text-sm rounded-lg bg-white text-yellow-400 hover:bg-yellow-500 hover:text-white transition-all"
                            >
                                {isRegister ? 'Login' : 'Register'}
                            </Link>
                        </div>
                    </div>

                    {/* Main Form */}
                    <div className="w-full text-center">
                        <form onSubmit={handleSubmit} className={`flex flex-col gap-3 ${isRegister ? 'mb-45' : 'mt-43'}`}>
                            <h3 className="font-extrabold text-3xl mb-1">{!isRegister ? 'Login' : 'Register'}</h3>

                            {isRegister && (
                                <Input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    placeholder="Enter your username"
                                    onChange={handleInputChange}
                                    icon="user"
                                />
                            )}
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
                            {isRegister && (
                                <Input
                                    type="file"
                                    name="avatar"
                                    onChange={handleInputChange}
                                    icon="file"
                                />
                            )}

                            <button className="border p-2 font-bold text-xl rounded-lg bg-yellow-400 text-white">
                                {!isRegister ? 'Login' : 'Register'}
                            </button>

                            <p className="text-sm text-gray-600">Or login with social platforms</p>
                            <div className="flex gap-2 justify-center">
                                <SocialIcon icon="ri-github-fill" />
                                <SocialIcon icon="ri-facebook-fill" />
                                <SocialIcon icon="ri-google-fill" />
                                <SocialIcon icon="ri-linkedin-fill" />
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

// Small Social Icon Button Component
const SocialIcon = ({ icon }) => (
    <h4 className="border w-10 h-10 flex justify-center items-center border-gray-400 rounded-full hover:bg-gray-200">
        <i className={`${icon} text-xl`}></i>
    </h4>
);

export default AdminAuth;
