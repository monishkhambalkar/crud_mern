const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password) return res.status(400).json({ message: "All fields required" });

    db.query("SELECT * FROM students WHERE email = ?", [email], (err, result) => {
        if(result.length > 0) return res.status(400).json({ message: "Email already exists" });

        const hashedPassword = bcrypt.hashSync(password, 8);
        db.query("INSERT INTO students (name, email, password) VALUES (?, ?, ?)", 
                 [name, email, hashedPassword], (err, result) => {
            if(err) return res.status(500).json(err);
            res.status(201).json({ message: "Student registered successfully" });
        });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).json({ message: "All fields required" });

    db.query("SELECT * FROM students WHERE email = ?", [email], (err, result) => {
        if(result.length === 0) return res.status(400).json({ message: "Email not found" });

        const student = result[0];
        const validPassword = bcrypt.compareSync(password, student.password);
        if(!validPassword) return res.status(400).json({ message: "Invalid password" });

        const token = jwt.sign({ id: student.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, student: { id: student.id, name: student.name, email: student.email } });
    });
};
