import React, { useState } from 'react';
import { Route, useHistory } from "react-router-dom";
import axios from "axios"
export default function Login(props){
    const [message,setMessage] = useState(<div></div>)
    const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const history = useHistory();
    const login =function(){
        axios.post('http://localhost:5000/login',{email:email , password:password} ).then(function(response){

            props.func(response.data.token);
            history.push("/dashboard")
        }).catch((error)=>{
            if(error =="Error: Request failed with status code 404"){
                setMessage(<div className="rigMess1"><p className="pMess">The email doesn't exist </p></div>)
            }if (error =="Error: Request failed with status code 403"){
                setMessage(<div className="rigMess1"><p className="pMess">The password you've entered is incorrect </p></div>)
            }
        })
    }
    return (<div className="Login">
        <p>Login:</p>
          <input className="inp" type={Text} placeholder="email here" onChange={(e)=>{setEmail(e.target.value)}} ></input>
          <br/>
          <input className="inp" type="password" placeholder="password here" onChange={(e)=>{setPassword(e.target.value)}} ></input>
          <br/>
          <button className="btn" onClick={login} >Login</button>
          {message}
      </div>)
}