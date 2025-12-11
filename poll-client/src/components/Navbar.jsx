import React from 'react'
import { Link } from 'react-router-dom'


export default function Navbar({ user, onLogout }) {
    return (
        <header className="nav">
            <div className="nav-left">
                <Link to="/" className="brand">Polls</Link>
            </div>
            <div className="nav-right">
                <Link to="/">Open Polls</Link>
                {user?.role === 'admin' && <Link to="/admin">Admin</Link>}
                {user ? (
                    <>
                        <span className="nav-user">{user.username} ({user.role})</span>
                        <button className="btn" onClick={onLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </>
                )}
            </div>
        </header>
    )
}