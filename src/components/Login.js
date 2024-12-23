import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default function Login() {
    const [data, setData] = useState({
        email: '',
        password: '',
    });
    const [auth, setAuth] = useState(false);

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('https://developers-hub-basic-freelancer-website-backend-cr4r.vercel.app/api/user/login', data)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                setAuth(true);
            })
            .catch(err => alert("Login Failed"));
    }

    if (auth) {
        return <Navigate to='/dashboard' />
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Sign In</h2>
                <form onSubmit={submitHandler} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={data.email}
                            onChange={changeHandler}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={data.password}
                            onChange={changeHandler}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors font-bold"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
                <div className="mt-4 text-center text-sm text-gray-600">
                    <p>
                        Don't have an account?{" "}
                        <a href="/register" className="text-indigo-600 hover:underline">
                            Sign Up
                        </a>
                    </p>
                    <p className="mt-2">
                        <a href="/forgot-password" className="text-indigo-600 hover:underline">
                            Forgot Password
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
