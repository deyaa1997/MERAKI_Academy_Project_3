import React from "react";
import { Link, Route } from "react-router-dom";

export default function Header({ token }) {
  return (
    <>
      {!token ? (
        <div>
          <Link to="/login">Login </Link>
          {"... "}
          <Link to="/rigster">Rigster</Link>
        </div>
      ) : (
        ""
      )}

      {token ? (
        <div>
          <Link to="/dashboard">Dashboard </Link>
          {"... "}
          <Link to="/newArticle">NewArticle</Link>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
