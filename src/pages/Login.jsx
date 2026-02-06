import { useState } from "react";   
import API from "../api/api";
import "./login.css";

function Login(){

    const[email, setEmail] = useState("");
    const[password , setpassword]= useState("");

    const login = async() =>{
       
     try{
        const res = await API.post("/auth/login",{email, password});
        localStorage.setItem("token", res.data.token);
        alert("Login Successfull");
        console.log("Token:", res.data.token);
        window.location.href = "/projects";
     }
     catch(err){
        alert("Login Failed");
        console.error(err);
     }

    };
    return(
        <div className="login-container">
          <div className="login-card">
            <h2>Login</h2>

            <input
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
            />

          <input 
            placeholder="Password"
            type = "password"
            onChange={e => setpassword(e.target.value)}
          />

          <p onClick={() => window.location.href="/forget-Password"} 
           style={{cursor:"pointer", color:"blue"}}>
               Forgot Password?
           </p>

          <button onClick = {login}>Login</button>

  


        </div>

        </div>

    );

}

export default Login;