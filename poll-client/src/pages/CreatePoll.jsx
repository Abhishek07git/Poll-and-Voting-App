import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const CreatePoll = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]); // at least 2
  const [closingDate, setClosingDate] = useState("");
  const token = localStorage.getItem("pv_token");
  const navigate = useNavigate();

  const addOption = () => setOptions([...options, ""]);
  const updateOption = (i, value) => {
    const newOpts = [...options];
    newOpts[i] = value;
    setOptions(newOpts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/polls", { question, options, closingDate }, { headers: { Authorization: `Bearer ${token}` } });
      alert("Poll created");
      navigate("/admin");
    } catch (err) {
      alert("Failed to create poll");
    }
  };

  return (
    <div className="form-card">
      <h2>Create Poll</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Poll question" value={question} onChange={e => setQuestion(e.target.value)} required />
        {options.map((opt, i) => (
          <input key={i} type="text" placeholder={`Option ${i + 1}`} value={opt} onChange={e => updateOption(i, e.target.value)} required />
        ))}
        <button type="button" onClick={addOption}>Add Option</button>
        <input type="datetime-local" value={closingDate} onChange={e => setClosingDate(e.target.value)} required />
        <button type="submit" className="btn">Create Poll</button>
      </form>
    </div>
  );
};

export default CreatePoll;
