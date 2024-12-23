import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function ResetPassword() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        newPassword: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Fetch the token from local storage
    const token = localStorage.getItem('forgotPasswordToken');

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();

        if (!token) {
            setError('Token is missing. Please request a new reset link.');
            return;
        }

        // Include the token in the request body
        const requestData = { token, ...data };

        axios
            .post('http://localhost:5000/api/user/reset-password', requestData)
            .then(() => {
                setSuccess('Password changed successfully');
                setError('');
                // Clear the form data after successful submission
                setData({
                    newPassword: '',
                    confirmPassword: '',
                });
                navigate('/login');
            })
            .catch((err) => {
                setSuccess('');
                setError(
                    err.response?.data || 'An error occurred. Please try again.'
                );
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white p-6 rounded-md shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
                <form onSubmit={submitHandler} className="space-y-4">
                    <div>
                        <label
                            htmlFor="newPassword"
                            className="block text-sm font-medium text-gray-700"
                        >
                            New Password
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={data.newPassword}
                            onChange={changeHandler}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={data.confirmPassword}
                            onChange={changeHandler}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                            required
                        />
                    </div>
                    {error && (
                        <div className="text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="text-green-500 text-sm text-center">
                            {success}
                        </div>
                    )}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="mt-4 w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary transition-colors font-bold"
                        >
                            Reset Password
                        </button>
                    </div>
                </form>

                <div className="mt-4 text-center text-sm text-gray-600">
                    <p>
                        Don't have an account?{' '}
                        <a href="/" className="text-primary hover:underline">
                            Sign Up
                        </a>
                    </p>
                    <p className="mt-2">
                        <a href="/login" className="text-primary hover:underline">
                            Sign In
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
