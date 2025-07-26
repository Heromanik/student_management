import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState(true);

  useEffect(() => {
    if (deleted) {
      setDeleted(false);
      axios
        .get('http://localhost:5000/students')
        .then((res) => setData(res.data))
        .catch((err) => console.error(err));
    }
  }, [deleted]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      axios
        .delete(`http://localhost:5000/delete/${id}`)
        .then(() => setDeleted(true))
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 sm:mb-0">Student Records</h2>
        <Link
          to="/create"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
        >
          Add New Student
        </Link>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-800 text-white text-sm uppercase">
            <tr>
              <th className="px-6 py-3 text-center">ID</th>
              <th className="px-6 py-3 text-center">Name</th>
              <th className="px-6 py-3 text-center">Email</th>
              <th className="px-6 py-3 text-center">Age</th>
              <th className="px-6 py-3 text-center">Gender</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((student) => (
                <tr
                  key={student.id}
                  className="border-b hover:bg-gray-100 text-center"
                >
                  <td className="px-6 py-4">{student.id}</td>
                  <td className="px-6 py-4">{student.name}</td>
                  <td className="px-6 py-4">{student.email}</td>
                  <td className="px-6 py-4">{student.age}</td>
                  <td className="px-6 py-4">{student.gender}</td>
                  <td className="px-6 py-4 space-x-2">
                    <Link
                      to={`/read/${student.id}`}
                      className="inline-block px-3 py-1 text-sm text-gray-700 border border-gray-400 rounded hover:bg-gray-100"
                    >
                      View
                    </Link>
                    <Link
                      to={`/edit/${student.id}`}
                      className="inline-block px-3 py-1 text-sm text-blue-600 border border-blue-500 rounded hover:bg-blue-100"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="inline-block px-3 py-1 text-sm text-red-600 border border-red-500 rounded hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No student records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;

