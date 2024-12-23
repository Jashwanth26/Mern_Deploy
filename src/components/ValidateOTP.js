import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ValidateOTP() {
    const navigate = useNavigate();
    const [otp, setOtp] = useState(Array(6).fill('')); // Array to store each OTP digit
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (element, index) => {
        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Automatically move to the next input field
        if (element.nextSibling && element.value) {
            element.nextSibling.focus();
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('forgotPasswordToken'); // Retrieve token from localStorage
        const otpCode = otp.join(''); // Combine OTP array into a single string

        axios.post('https://jashwanth26.github.io/Developers-Hub---Basic-Freelancer-website-backend/api/user/validate-otp', {
            otp: otpCode,
            token: token,
        })
            .then(() => {
                navigate('/reset-password');
            })
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    setErrorMessage(error.response.data); // Display backend error message
                } else {
                    setErrorMessage('An unexpected error occurred.');
                }
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white p-6 rounded-md shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Enter OTP</h2>
                {errorMessage && (
                    <div className="mb-4 text-red-500 text-sm text-center">
                        {errorMessage}
                    </div>
                )}
                <form onSubmit={submitHandler} className="space-y-4">
                    <div className="flex justify-center gap-2">
                        {otp.map((value, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                value={value}
                                onChange={(e) => handleChange(e.target, index)}
                                className="w-12 h-12 text-center text-xl border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                                onKeyDown={(e) => {
                                    // Handle backspace
                                    if (e.key === 'Backspace' && !value && e.target.previousSibling) {
                                        e.target.previousSibling.focus();
                                    }
                                }}
                            />
                        ))}
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors font-bold"
                        >
                            Confirm OTP
                        </button>
                    </div>
                </form>

                <div className="mt-4 text-center text-sm text-gray-600">
                    <p>
                        Didn't receive an OTP?{' '}
                        <a href="/forgot-password" className="text-indigo-600 hover:underline">
                            Resend OTP
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
