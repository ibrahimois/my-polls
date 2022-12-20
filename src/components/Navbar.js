import React from 'react'
import { Link } from "react-router-dom";
import { connect } from "react-redux"
import "../index.css"
import { handleUnSetAuthedUser } from '../actions/authedUser';
function Navbar({ dispatch, authedUser }) {

    const handleLogout = () => {
        dispatch(handleUnSetAuthedUser(authedUser))
    }

    return (
        <nav >
            <ul className='navbar'>
                <li className='home'>
                    <Link to="/">Home</Link>
                </li>
                <li className='new'>
                    <Link to="/leaderboard" >Leaderboard</Link>
                </li>
                <li className='new'>
                    <Link to="/new" >New</Link>
                </li>
                <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
            </ul>
            <hr />
        </nav >
    )
}

const mapStateToProps = ({ authedUser }) => (
    { authedUser }
)

export default connect(mapStateToProps)(Navbar)