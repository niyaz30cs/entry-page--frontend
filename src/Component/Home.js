import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Home({token,onLogout,user}) {
  const[sandboxes,setSandBoxes]=useState([])
  const fetchSandboxes=async()=>{
    try {
      const response=await axios.get("https://ecom-backend-t7c9.onrender.com/home",{
        headers:{Authorization:token},

      });
      setSandBoxes(response.data)
    } catch (error) {
      console.log("Error",error);
    }
  }
  useEffect(()=>{
    if(token){
      fetchSandboxes();
    }
  },)
  return (
    <div>
      <button onClick={onLogout}>Logout</button>
      <h2>Welcom,{user&&user.username}</h2>
      <h2>My Save sandboxes</h2>
      <button onClick={fetchSandboxes}>Refresh</button>
      <ul>
        {sandboxes.map((sandbox,index)=>(
          <li key={index}>{sandbox.code}</li>
        ))}
      </ul>
    </div>
  )
}

export default Home
