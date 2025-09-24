import React, { useState } from "react";
import api from "../api/api";

export default function StudentForm() {
    const [form, setForm] = useState({ course: "", age: "", photo: null });

    const handleChange = e => {
        if(e.target.name === "photo") setForm({ ...form, photo: e.target.files[0] });
        else setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const data = new FormData();
        data.append("course", form.course);
        data.append("age", form.age);
        data.append("photo", form.photo);
        data.append("student_id", 1); // demo student_id, should be dynamic

        const res = await api.post("/student/submit", data);
        alert(res.data.message);
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input name="course" placeholder="Course" onChange={handleChange} />
            <input name="age" placeholder="Age" onChange={handleChange} />
            <input type="file" name="photo" onChange={handleChange} />
            <button type="submit">Submit Form</button>
        </form>
    );
}
