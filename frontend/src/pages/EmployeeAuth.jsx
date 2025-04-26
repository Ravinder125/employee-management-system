import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import { registerEmployee, loginEmployee } from './services/employee.service';

const EmployeeRegister = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('')
    const [passError, setPassError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [data, setData] = useState(null);

    const cleanAndToggle = () => {
        setIsRegister(prev => !prev);
        setUsername('');
        setPassword('');
        setEmail('');
        setPassError('');
        setEmailError('');
    };

    const handleInputChange = (e) => {
        const { value, name } = e.target;

        if (!value?.trim()) {
            if (name === 'password') {
                setPassError('');
                setPassword('');
            }
            if (name === 'email') {
                setEmailError('');
                setEmail('');
            }
            return;
        }

        switch (name) {
            case 'username':
                setUsername(value);
                break;
            case 'avatar':
                setAvatar(value);
                break;

            case 'password':
                setPassword(value);
                if (value.length < 8) {
                    setPassError('Password must be at least 8 characters long');
                } else {
                    setPassError('');
                }
                break;

            case 'email':
                setEmail(value);
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    setEmailError('Invalid email');
                } else {
                    setEmailError('');
                }
                break;

            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password || (!isRegister && !username)) {
            alert('Please fill all fields correctly.');
            return;
        }

        if (emailError || passError) {
            alert('Please fix errors before submitting.');
            return;
        }

        if (isRegister) {
            setData({ email, password, avatar });
            loginEmployee({ email, password });

            try {
                const respone = await registerEmployee(data)
                console.log(respone)
            } catch (error) {
                console.error('Error:', error)
            }
        } else {
            setData({ username, email, password });
            registerEmployee({ username, email, password });
        }
    };

    return (
        <div className="min-h-screen h-screen flex justify-center items-center p-3 bg-gray-100">
            <div className={`relative flex flex-col items-center overflow-hidden h-full border border-gray-300 rounded-2xl p-5 w-full max-w-md bg-white shadow-lg
                ${isRegister ? 'justify-normal' : 'justify-center'}`}>

                {/* Yellow Sliding Box */}
                <div className={`absolute left-0 w-full h-full p-5 rounded-[100px] text-white bg-yellow-400 flex flex-col transition-all duration-500 ease-in-out
                    ${isRegister ? '-top-[75%] justify-end' : '-bottom-[75%] justify-start'}`}>
                    <div className="flex flex-col gap-2 justify-center items-center">
                        <h2 className="font-extrabold text-2xl">Hello, Welcome!</h2>
                        <p className="text-sm">{isRegister ? 'Already have an account?' : "Don't have an account?"}</p>
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
                    <form onSubmit={handleSubmit} className={`flex flex-col gap-4
                        ${!isRegister ? 'mb-50' : 'mt-50'}`}>
                        <h3 className="font-extrabold text-3xl mb-2">{isRegister ? 'Login' : 'Register'}</h3>

                        {!isRegister && (
                            <Input
                                type="text"
                                name="username"
                                value={username}
                                placeholder="Enter your username"
                                onChange={handleInputChange}
                                icon="user"
                            />
                        )}
                        <Input
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={handleInputChange}
                            error={emailError}
                            icon="mail"
                        />
                        <Input
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Enter your password"
                            onChange={handleInputChange}
                            error={passError}
                            icon="lock-password"
                        />
                        <Input
                            type="file"
                            name="avatar"
                            value={avatar}
                            onChange={handleInputChange}
                            icon="file"
                        />

                        <button className="border p-2 font-bold text-xl rounded-lg bg-yellow-400 text-white">
                            {isRegister ? 'Login' : 'Register'}
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
        </div>
    );
};

// Small Social Icon Button Component
const SocialIcon = ({ icon }) => (
    <h4 className="border w-10 h-10 flex justify-center items-center border-gray-400 rounded-full hover:bg-gray-200">
        <i className={`${icon} text-xl`}></i>
    </h4>
);

export default EmployeeRegister;
