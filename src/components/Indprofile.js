import React, { useState, useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/review.css';

const Indprofile = () => {
  const { fullname, email, skill, _id } = useParams();
  const [rating, setRating] = useState(null);
  const [review, setReview] = useState([]);

  useEffect(() => {
    axios
      .get(`https://jashwanth26.github.io/Developers-Hub---Basic-Freelancer-website-backend/api/review/${_id}`, {
        headers: {
          'x-token': localStorage.getItem('token'),
        },
      })
      .then((res) => setReview(res.data))
      .catch((err) => {
        console.error('Error fetching reviews:', err);
      });
  }, []);

  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" />;
  }

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .get('https://jashwanth26.github.io/Developers-Hub---Basic-Freelancer-website-backend/api/user/myprofile', {
        headers: {
          'x-token': localStorage.getItem('token'),
        },
      })
      .then((res) => {
        const taskProviderName = res.data.fullname;
        const taskWorkerId = _id;

        if (!rating || !taskProviderName || !taskWorkerId) {
          alert('All fields are required.');
          return;
        }

        const numericRating = parseInt(rating, 10);

        if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
          alert('Please enter a valid rating between 1 and 5.');
          return;
        }

        const review = {
          taskprovider: taskProviderName,
          taskworker: taskWorkerId,
          rating: numericRating,
        };

        axios
          .post('https://jashwanth26.github.io/Developers-Hub---Basic-Freelancer-website-backend/api/review/addreview', review, {
            headers: {
              'x-token': localStorage.getItem('token'),
            },
          })
          .then((res) => alert(res.data))
          .catch((err) => {
            console.error('Error posting review:', err.response ? err.response.data : err.message);
            alert('Error posting review. Please try again.');
          });
      })
      .catch((err) => {
        console.error('Error fetching profile:', err.response ? err.response.data : err.message);
        alert('Error fetching profile. Please try again.');
      });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <Link to="/dashboard" className="text-indigo-600 hover:text-indigo-700">
            <i className="fas fa-arrow-left"></i> Back to Profiles
          </Link>
          <nav className="flex space-x-4">
            <Link to="/myprofile" className="text-indigo-600 hover:text-indigo-700">My Profile</Link>
            <Link to="/login" onClick={() => localStorage.removeItem('token')} className="text-indigo-600 hover:text-indigo-700">Logout</Link>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-center mb-4">
              <img
                className="w-24 h-24 rounded-full"
                src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y&s=200"
                alt=""
              />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">{fullname}</h1>
            <p className="text-gray-600 mb-2">{email}</p>
            <ul className="space-y-2">
              {skill.split(',').map((s, index) => (
                <li key={index} className="text-indigo-600">
                  <i className="fas fa-check"></i> {s}
                </li>
              ))}
            </ul>
            <p className="text-gray-600 mt-4">India</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Reviews and Ratings</h2>
            <div className="space-y-4">
              {review && review.length > 0 ? (
                review.map((review) => (
                  <div key={review._id} className="p-4 border rounded-lg">
                    <h4 className="text-lg font-semibold text-indigo-600">{review.taskprovider}</h4>
                    <p className="text-gray-600">{review.rating}/5</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No reviews available</p>
              )}
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Enter your review</h4>
              <form className="space-y-4" onSubmit={submitHandler}>
                <input
                  type="number"
                  placeholder="Enter rating out of 5"
                  className="w-full p-3 border rounded-md"
                  onChange={(e) => setRating(e.target.value)}
                  required
                />
                <button type="submit" className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                  Add Rating
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Indprofile;
