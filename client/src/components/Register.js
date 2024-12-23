import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        fullname: '',
        email: '',
        mobile: '',
        skill: '',
        password: '',
        confirmpassword: ''
    });

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/user/register', data)
            .then(() => {
                alert("Registered successfully");
                setData({
                    fullname: '',
                    email: '',
                    mobile: '',
                    skill: '',
                    password: '',
                    confirmpassword: ''
                });
                navigate('/login');
            })
            .catch(() => alert("Error"));
    };

    return (
<div className="min-h-screen flex items-center justify-center px-4">
    <div className="w-full max-w-sm bg-white p-4 rounded-md shadow-md overflow-y-auto" style={{ height: '500px' }}>
        <h2 className="text-lg font-bold mb-2 text-center">Sign Up</h2>
        <form onSubmit={submitHandler} className="space-y-2">
            <div>
                <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
                    Full Name
                </label>
                <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    value={data.fullname}
                    onChange={changeHandler}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    required
                />
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={data.email}
                    onChange={changeHandler}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    required
                />
            </div>
            <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                    Phone Number
                </label>
                <input
                    type="text"
                    id="mobile"
                    name="mobile"
                    value={data.mobile}
                    onChange={changeHandler}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    required
                />
            </div>
            <div>
                <label htmlFor="skill" className="block text-sm font-medium text-gray-700">
                    Skills
                </label>
                <input
                    type="text"
                    id="skill"
                    name="skill"
                    value={data.skill}
                    placeholder="Provide skills separated by commas"
                    onChange={changeHandler}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    required
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={data.password}
                    onChange={changeHandler}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    required
                />
            </div>
            <div>
                <label htmlFor="confirmpassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                </label>
                <input
                    type="password"
                    id="confirmpassword"
                    name="confirmpassword"
                    value={data.confirmpassword}
                    onChange={changeHandler}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    required
                />
            </div>
            <div>
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors font-bold"
                >
                    Sign Up
                </button>
            </div>
        </form>
        <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-indigo-600 hover:underline">
                Sign In
            </a>
        </p>
    </div>
</div>

    );
}
