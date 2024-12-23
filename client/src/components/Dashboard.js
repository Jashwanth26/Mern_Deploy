import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('https://mern-deploy-server-theta.vercel.app/api/user/allprofiles', {
            headers: {
                'x-token': localStorage.getItem('token')
            }
        }).then(res => setData(res.data))
    }, [])

    if (!localStorage.getItem('token')) {
        return <Navigate to='/login' />
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center">
                    <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                        <span className="block">Welcome to </span>
                        <span className="block text-indigo-600">Developers Hub</span>
                    </h1>
                    <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                        Browse and connect with developers, share knowledge, and grow your network.
                    </p>
                    <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                        <div className="rounded-md shadow">
                            <Link
                                to="/myprofile"
                                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                            >
                                My Profile
                            </Link>
                        </div>
                        <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                            <Link
                                to="/login"
                                onClick={() => localStorage.removeItem('token')}
                                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10"
                            >
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>

                <section className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Developer Profiles</h2>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {data.length >= 1 ? 
                            data.map(profile => (
                                <div key={profile._id} className="bg-white p-6 rounded-lg shadow-md">
                                    <img
                                        className="w-24 h-24 rounded-full mx-auto mb-4"
                                        src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y&s=200"
                                        alt="Profile"
                                    />
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{profile.fullname}</h3>
                                    <p className="text-gray-600">{profile.email}</p>
                                    <p className="text-gray-600">India</p>
                                    <div className="mt-4">
                                        <Link
                                            to={`/indprofile/${profile.fullname}/${profile.email}/${profile.skill}/${profile._id}`}
                                            className="btn btn-primary text-white bg-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-700"
                                        >
                                            View Profile
                                        </Link>
                                    </div>
                                    <ul className='mt-4'>
                                        {profile.skill.split(",").map((skill, index) => (
                                            <li key={index} className="text-indigo-600">
                                                <i className="fas fa-check"></i> {skill}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )) : (
                                <p className="text-gray-500 text-center col-span-3">No profiles available</p>
                            )}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Dashboard;
