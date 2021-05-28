import React, { useState } from 'react';
import axios from "axios"
export default function Login(){
    return (<div >
        <p>Login:</p>
          <input type={Text} placeholder="email here" ></input>
          <br/>
          <input type="password" placeholder="password here" ></input>
          <br/>
          <button >Login</button>
      </div>)
}