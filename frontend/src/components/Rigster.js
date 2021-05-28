import React, { useState } from 'react';
import axios from "axios"
export default function Rigster() {
  const [message,setMessage] = useState(<div></div>)
  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")
  const [age,setAge] = useState(0)
  const [country,setCountry] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
    const rigster =()=> {
        axios.post('http://localhost:5000/users',{firstName , lastName , age , country, email , password})
  .then(function (response) {
    // handle success
    console.log(response);
    setMessage(<div><p>The user has been created successfully</p></div>)
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    setMessage(<div><p>Error happened while register, please try again</p></div>)
  })
    }
    return (<div >
        <input type={Text} placeholder="firstName here" onChange={(e)=>{setFirstName(e.target.value)}}></input>
        <br/>
        <input type={Text} placeholder="lastName here" onChange={(e)=>{setLastName(e.target.value)}}></input>
        <br/>
        <input type={Number} placeholder="age here" onChange={(e)=>{setAge(e.target.value)}}></input>
        <br/>
        <input type={Text} placeholder="country here" onChange={(e)=>{setCountry(e.target.value)}}></input>
        <br/>
        <input type={Text} placeholder="email here" onChange={(e)=>{setEmail(e.target.value)}}></input>
        <br/>
        <input type="password" placeholder="password here" onChange={(e)=>{setPassword(e.target.value)}}></input>
        <br/>
        <button onClick={rigster}>Rigster</button>
        {message}
    </div>)
}