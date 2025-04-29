import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import { loginAdmin } from '../services/admin.service';
import { AdminDataContext } from '../context/AdminContext';
import Loading from '../components/Loading';
import SocialIcon from '../components/SocialIcon';

const AdminLogin = () => {
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const { adminData, setAdminData } = useContext(AdminDataContext);
    const navigate = useNavigate()

    const cleanInputs = () => {
        setFormData({
            email: '',
            password: '',
            confirmPassword: ''
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
        const { name, value } = e.target;

        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: validate(name, value) }));

        if (name === 'confirm-password') {
            setFormData(prev => ({ ...prev, 'confirmPassword': value }))
            setErrors(prev => ({ ...prev, 'confirmPassword': validate(name, value) }));
        }
        if (!value) {
            setErrors(prev => ({ ...prev, [name]: '' }));
            setErrors(prev => ({ ...prev, 'confirmPassword': '' }));
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password || !formData.confirmPassword) return alert('Please first fill all the fields ')

        const loginData = {
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword
        }
        setIsLoading(true);
        try {
            const response = await loginAdmin(loginData);
            if (response.status === 200) {
                setAdminData(response.data.data);
                console.log(response.data.data);
                navigate('/admin-dashboard')
            }
        } catch (error) {
            console.error('Error:', error)
        } finally {
            cleanInputs()
            setIsLoading(false)

        }

    }

    useEffect(() => {
        console.log('Admin Data Updated:', adminData);
    }, [adminData]);

    return (
        <div className="min-h-screen h-screen flex justify-center items-center p-3 bg-gray-100">
            {isLoading ? (
                <div><Loading /></div>
            ) : (
                <div className={`flex flex-col items-center justify-center max-h-full min-h-150  border border-gray-300 rounded-2xl p-5 w-90 max-w-md bg-white shadow-lg`}>
                    {/* Main Form */}
                    <div className="w-full text-center">
                        <form onSubmit={handleSubmit} className={`flex flex-col gap-3 `}>
                            <h3 className="font-extrabold text-3xl mb-1">Login</h3>
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
                            <button className="border p-2 font-bold text-xl rounded-lg bg-yellow-400 text-white">Login</button>
                            <p className='text-sm'>Don't have a account ? <Link to='/admin-register' className='text-blue-500'>Register here </Link></p>
                            <p className="text-sm text-gray-600">Or login with social platforms</p>
                            <div className="flex gap-2 justify-center">
                                <SocialIcon icon="ri-github-fill" />
                                <SocialIcon icon="ri-facebook-fill" />
                                <SocialIcon icon="ri-google-fill" />
                                <SocialIcon icon="ri-linkedin-fill" />
                            </div>
                            <Link to='/login' className='mt-3 bg-green-600 text-white p-2 text-lg font-bold rounded-lg'>Login as Employee</Link>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};


export default AdminLogin;
