import React, { useState, useEffect } from "react";
import api from "../api/axios";

const AdminDashboard = () => {
  const token = localStorage.getItem("pv_token");
  const [polls, setPolls] = useState([]);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]); // minimum 2 options
  const [closingDate, setClosingDate] = useState("");

  // Fetch all polls
  const fetchPolls = async () => {
    try {
      const res = await api.get("/polls", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPolls(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  // Add new option input
  const addOption = () => setOptions([...options, ""]);

  // Update option text
  const updateOption = (index, value) => {
    const newOpts = [...options];
    newOpts[index] = value;
    setOptions(newOpts);
  };

  // Create poll
  const createPoll = async (e) => {
    e.preventDefault();
    if (options.some((opt) => !opt.trim())) {
      alert("All options must be filled");
      return;
    }
    try {
      await api.post(
        "/polls",
        { question, options, closingDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setQuestion("");
      setOptions(["", ""]);
      setClosingDate("");
      fetchPolls();
      alert("Poll created successfully");
    } catch (err) {
      alert("Failed to create poll");
      console.error(err);
    }
  };

  // Delete poll
  const deletePoll = async (id) => {
    if (!window.confirm("Are you sure you want to delete this poll?")) return;
    try {
      await api.delete(`/polls/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPolls();
    } catch (err) {
      alert("Failed to delete poll");
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>

      {/* Create Poll Form */}
      <div className="card form-card">
        <h3>Create Poll</h3>
        <form onSubmit={createPoll}>
          <input
            type="text"
            placeholder="Poll Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
          {options.map((opt, i) => (
            <input
              key={i}
              type="text"
              placeholder={`Option ${i + 1}`}
              value={opt}
              onChange={(e) => updateOption(i, e.target.value)}
              required
            />
          ))}
          <button type="button" onClick={addOption} className="btn small">
            Add Option
          </button>
          <input
            type="datetime-local"
            value={closingDate}
            onChange={(e) => setClosingDate(e.target.value)}
            required
          />
          <button type="submit" className="btn">
            Create Poll
          </button>
        </form>
      </div>

      {/* All Polls */}
      <div className="card">
        <h3>All Polls</h3>
        {polls.map((poll) => (
          <div key={poll._id} className="poll-card admin-row">
            <div>
              <strong>{poll.question}</strong>
              <p>Closes: {new Date(poll.closingDate).toLocaleString()}</p>
            </div>
            <div>
              <button
                className="btn danger small"
                onClick={() => deletePoll(poll._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
