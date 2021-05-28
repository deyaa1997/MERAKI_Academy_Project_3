import React from 'react';
import { Link, Route } from "react-router-dom";
export default function Header() {
    return (<div>
        <Link to="/login">Login </Link>
        { "... " }
        <Link to="/rigster">Rigster</Link>
    </div>)
}