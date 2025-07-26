import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Create() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    age: '',
    gender: ''
  });

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post('http://localhost:5000/add_user', values)
      .then((res) => {
        console.log('Saved successfully:', res.data);
        navigate('/');
      })
      .catch((err) => {
        console.error('Error saving student:', err);
      });
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 sm:mb-0">Add Student</h2>
        <Link
          to="/"
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
        >
          Home
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-5">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            required
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email"
          />
        </div>

        <div>
          <label htmlFor="gender" className="block text-gray-700 font-medium mb-1">
            Gender
          </label>
          <input
            type="text"
            name="gender"
            required
            value={values.gender}
            onChange={(e) => setValues({ ...values, gender: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Male / Female / Other"
          />
        </div>

        <div>
          <label htmlFor="age" className="block text-gray-700 font-medium mb-1">
            Age
          </label>
          <input
            type="number"
            name="age"
            required
            value={values.age}
            onChange={(e) => setValues({ ...values, age: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter age"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded transition"
        >
          Save Student
        </button>
      </form>
    </div>
  );
}

export default Create;
