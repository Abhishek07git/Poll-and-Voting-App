import React from 'react'
import { Link } from 'react-router-dom'


export default function PollCard({ poll }) {
    const isClosed = new Date(poll.closingDate) <= new Date() || poll.closedManually
    return (
        <article className="poll-card">
            <h3>{poll.question}</h3>
            <p className="meta">Closes: {new Date(poll.closingDate).toLocaleString()}</p>
            <p className="meta">Status: {isClosed ? 'Closed' : 'Open'}</p>
            <Link to={`/polls/${poll._id}`} className="btn small">Open</Link>
        </article>
    )
}