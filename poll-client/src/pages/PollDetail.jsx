import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios.js";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useRef } from "react";

const PollDetail = () => {
  const { id } = useParams();

  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState("");
  const [voted, setVoted] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch poll
 const fetchPoll = async () => {
  try {
    const res = await api.get(`/polls/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("pv_token")}` }
    });
    setPoll(res.data);
    setLoading(false);
  } catch (err) {
    console.error(err);
    setLoading(false);
  }
};

useEffect(() => {
  fetchPoll();
}, [id]);

  // Vote submit
 const submitVote = async () => {
    if (!user) { alert('Login first'); return }
    if (!selected) { alert('Choose an option'); return }

    const token = localStorage.getItem("pv_token");
    if (!token) { alert("Login token missing"); return }

    try {
        await api.post(
            `/polls/${id}/vote`,
            { optionId: selected },
            { headers: { Authorization: `Bearer ${token}` } }
        )
        alert('Vote recorded')
        fetchPoll()
    } catch (err) {
        console.log(err)
        alert(err.response?.data?.error || 'Vote failed')
    }
}


  //THESE must be inside the component
  if (loading) return <p>Loading...</p>;
  if (!poll) return <p>Poll not found</p>;

  const isClosed =
    poll.closedManually || new Date(poll.closingDate) <= new Date();

  return (
    <div className="card">
      <h2>{poll.question}</h2>

      <p className="meta">
        Closes: {new Date(poll.closingDate).toLocaleString()}
      </p>

      {/* Poll Open */}
      {!isClosed ? (
        <div>
          <h3>Options</h3>
          <ul className="options">
            {poll.options.map((opt) => (
              <li key={opt._id}>
                <label>
                  <input
                    type="radio"
                    name="opt"
                    value={opt._id}
                    onChange={() => setSelected(opt._id)}
                    disabled={voted}
                  />
                  {opt.text}
                </label>
              </li>
            ))}
          </ul>

          <button className="btn" onClick={submitVote} disabled={voted}>
            Vote
          </button>

          {voted && (
            <p className="muted">
              You already voted. Results will show once the poll closes.
            </p>
          )}
        </div>
      ) : (
        // Poll Closed -> Show results
        <div>
          <h3>Results</h3>
          <ResultsChart poll={poll} />
        </div>
      )}
    </div>
  );
};

// Chart Component
function ResultsChart({ poll }) {
  const canvasRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    // Destroy old chart if exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new chart instance
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: poll.options.map(o => o.text),
        datasets: [
          {
            label: "Votes",
            data: poll.options.map(o => o.votes),
            backgroundColor: "rgba(54,162,235,0.6)",
          }
        ]
      },
      options: {
        plugins: { legend: { display: false } },
        responsive: true,
        maintainAspectRatio: false
      }
    });

    // Cleanup when component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };

  }, [poll]);

  return (
    <div style={{ width: "100%", height: "350px" }}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default PollDetail;
