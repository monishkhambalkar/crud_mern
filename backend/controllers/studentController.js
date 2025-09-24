const db = require("../config/db");
const multer = require("multer");
const path = require("path");

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

exports.uploadMiddleware = upload.single("photo");

exports.submitForm = (req, res) => {
    const { student_id, course, age } = req.body;
    const photo = req.file ? req.file.filename : null;

    db.query("INSERT INTO student_forms (student_id, course, age, photo) VALUES (?, ?, ?, ?)",
        [student_id, course, age, photo], (err, result) => {
            if(err) return res.status(500).json(err);
            res.status(201).json({ message: "Form submitted successfully" });
        });
};

exports.getForms = (req, res) => {
    db.query("SELECT * FROM student_forms WHERE student_id = ?", [req.user.id], (err, result) => {
        if(err) return res.status(500).json(err);
        res.json(result);
    });
};
