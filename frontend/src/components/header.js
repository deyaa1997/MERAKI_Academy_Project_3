import React from "react";
import { Link, Route } from "react-router-dom";

export default function Header({ token }) {
  return (
    <>
      {!token ? (
        <div className="header">
          <Link to="/login">Login </Link>
          <Link to="/rigster">Rigster</Link>
        </div>
      ) : (
        ""
      )}

      {token ? (
        <div className="header">
          <Link to="/dashboard">Dashboard </Link>
          <Link to="/newArticle">NewArticle</Link>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
