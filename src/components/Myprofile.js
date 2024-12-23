import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

const Myprofile = () => {
  const [data, setData] = useState(null);
  const [review, setReview] = useState([]);

  useEffect(() => {
    axios.get('https://developers-hub-basic-freelancer-website-backend-cr4r.vercel.app/api/user/myprofile', {
      headers: {
        'x-token': localStorage.getItem('token'),
      },
    }).then(res => setData(res.data));

    axios.get('https://developers-hub-basic-freelancer-website-backend-cr4r.vercel.app/api/review/myreview', {
      headers: {
        'x-token': localStorage.getItem('token'),
      },
    }).then(res => setReview(res.data));
  }, []);

  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <Link to="/dashboard" className="text-indigo-600 hover:text-indigo-700">
            <i className="fas fa-arrow-left"></i> Back to Profiles
          </Link>
          <nav className="flex space-x-4">
            <Link to="/login" onClick={() => localStorage.removeItem('token')} className="text-indigo-600 hover:text-indigo-700">Logout</Link>
          </nav>
        </div>

        {data && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-center mb-4">
              <img
                className="w-24 h-24 rounded-full"
                src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y&s=200"
                alt=""
              />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">{data.fullname}</h1>
            <p className="text-gray-600 mb-2">{data.email}</p>
            <p className="text-gray-600 mt-4">India</p>

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Reviews and Ratings</h2>
              <div className="space-y-4">
                {review.length > 0 ? (
                  review.map((r) => (
                    <div key={r._id} className="p-4 border rounded-lg">
                      <h4 className="text-lg font-semibold text-indigo-600">{r.taskprovider}</h4>
                      <p className="text-gray-600">{r.rating}/5</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No reviews available</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Myprofile;
