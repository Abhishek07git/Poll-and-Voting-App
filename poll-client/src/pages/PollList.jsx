import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import PollCard from '../components/PollCard'


export default function PollList({ user }) {
    const [polls, setPolls] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => { fetchPolls() }, [])
    const fetchPolls = async () => {
        setLoading(true)
        try {
            const res = await api.get('/polls?status=open')
            setPolls(res.data)
        } catch (e) { alert('Failed to load polls') }
        finally { setLoading(false) }
    }


    return (
        <div>
            <h2>Open Polls</h2>
            {loading ? <p>Loading...</p> : (
                <div className="grid">
                    {polls.length === 0 ? <p>No open polls.</p> : polls.map(p => <PollCard key={p._id} poll={p} />)}
                </div>
            )}
        </div>
    )
}