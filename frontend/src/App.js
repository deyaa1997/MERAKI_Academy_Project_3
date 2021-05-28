import React from 'react';
import Header from "./components/header"
import Rigster from "./components/Rigster"
import Login from "./components/Login"
import { Link, Route } from "react-router-dom";

export default function App() {
  return (
    <div >
      <Header />
      <Route exact path="/rigster" component={Rigster} />
      <Route exact path="/login" component={Login} />
    </div>
  );
}
