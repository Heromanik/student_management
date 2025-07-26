const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Manik100%",
  database: "studentdb",
});

// Test connection
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  }
  console.log("Connected to MySQL database.");
});

// ➕ Add Student
app.post("/add_user", (req, res) => {
  const { name, email, age, gender } = req.body;
  const sql =
    "INSERT INTO students (`name`, `email`, `age`, `gender`) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, email, age, gender], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error adding student", error: err });
    }
    return res.status(201).json({ success: "Student added successfully" });
  });
});

// 📋 Get All Students
app.get("/students", (req, res) => { 
  const sql = "SELECT * FROM students";
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching students", error: err });
    }
    return res.json(result);
  });
});

// 🔍 Get Student by ID
app.get("/get_student/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM students WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching student", error: err });
    }
    return res.json(result[0]); // Return single object
  });
});

// ✏️ Edit Student
app.post("/edit_user/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, age, gender } = req.body;
  const sql =
    "UPDATE students SET `name` = ?, `email` = ?, `age` = ?, `gender` = ? WHERE id = ?";
  db.query(sql, [name, email, age, gender, id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error updating student", error: err });
    }
    return res.json({ success: "Student updated successfully" });
  });
});

// ❌ Delete Student
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM students WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error deleting student", error: err });
    }
    return res.json({ success: "Student deleted successfully" });
  });
});

// 🚀 Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
