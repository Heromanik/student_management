import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function Read() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/get_student/${id}`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setStudent(res.data[0]);
        } else {
          setStudent(res.data);
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!student) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Student Details
        </h2>
        <div className="space-y-4 text-gray-700 text-base">
          <p>
            <span className="font-semibold">ID:</span> {student.id}
          </p>
          <p>
            <span className="font-semibold">Name:</span> {student.name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {student.email}
          </p>
          <p>
            <span className="font-semibold">Age:</span> {student.age}
          </p>
          <p>
            <span className="font-semibold">Gender:</span> {student.gender}
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-block px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Read;
