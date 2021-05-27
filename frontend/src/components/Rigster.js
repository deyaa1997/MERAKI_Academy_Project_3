import React from 'react';
import axios from "axios"
export default function Rigster() {
    const rigster =()=> {
        axios.post('http://localhost:5000/users')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
    }
    return (<div >
        <input type={Text} placeholder="firstName here"></input>
        <br/>
        <input type={Text} placeholder="lastName here"></input>
        <br/>
        <input type={Number} placeholder="age here"></input>
        <br/>
        <input type={Text} placeholder="country here"></input>
        <br/>
        <input type={Text} placeholder="email here"></input>
        <br/>
        <input type="password" placeholder="password here"></input>
        <br/>
        <button onClick={rigster}>Rigster</button>
    </div>)
}