import React, { useState } from 'react';
import Header from "./components/header"
import Login from "./components/Login"
import Rigster from "./components/Rigster"
import Dashboard from "./components/Dashboard"
import NewArticle from "./components/NewArticle"
import { Link, Route } from "react-router-dom";


export default function App() {
  const [token,setToken] = useState("")

  return (
    <div >
      <Header token={token}/>
      <Route exact path="/rigster" component={Rigster} />
      <Route exact path="/login"   render={() => <Login func={setToken} />} />
      <Route exact path="/dashboard"   component={Dashboard} />
      <Route exact path="/newarticle"   render={()=> <NewArticle token={token}/>} />
    </div>
  );
}
