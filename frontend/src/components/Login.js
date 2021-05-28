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
                setMessage(<div><p>The email doesn't exist </p></div>)
            }if (error =="Error: Request failed with status code 403"){
                setMessage(<div><p>The password you've entered is incorrect </p></div>)
            }
        })
    }
    return (<div >
        <p>Login:</p>
          <input type={Text} placeholder="email here" onChange={(e)=>{setEmail(e.target.value)}} ></input>
          <br/>
          <input type="password" placeholder="password here" onChange={(e)=>{setPassword(e.target.value)}} ></input>
          <br/>
          <button onClick={login} >Login</button>
          {message}
      </div>)
}