const db = require("../config/db");

exports.submitForm = (req, res) => {
  const { student_id, course, age } = req.body;
  let photo = null;

  if (req.file) {
    photo = process.env.NODE_ENV === "production"
      ? req.file.location // S3 file URL
      : req.file.filename; // Local file name
  }

  db.query(
    "INSERT INTO student_forms (student_id, course, age, photo) VALUES (?, ?, ?, ?)",
    [student_id, course, age, photo],
    (err) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: "Form submitted successfully" });
    }
  );
};

exports.getForms = (req, res) => {
  db.query("SELECT * FROM student_forms WHERE student_id = ?", [req.user.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};
