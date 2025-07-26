import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Edit() {
  const [data, setData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/get_student/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/edit_user/${id}`, data)
      .then(() => navigate("/"))
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-screen bg-blue-50 px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 sm:mb-0">
            Edit Student #{id}
          </h2>
          <Link
            to="/"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Back
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={data.name}
              required
              onChange={(e) => setData({ ...data, name: e.target.value })}
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
              value={data.email}
              required
              onChange={(e) => setData({ ...data, email: e.target.value })}
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
              value={data.gender}
              required
              onChange={(e) => setData({ ...data, gender: e.target.value })}
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
              value={data.age}
              required
              onChange={(e) => setData({ ...data, age: e.target.value })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter age"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded transition"
          >
            Update Student
          </button>
        </form>
      </div>
    </div>
  );
}

export default Edit;
