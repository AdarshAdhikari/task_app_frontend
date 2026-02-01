import { useState } from "react";   
import API from "../api/api";

function Login(){

    const[email, setEmail] = useState("");
    const[password , setpassword]= useState("");

    const login = async() =>{
       
     try{
        const res = await API.post("/auth/login",{email, password});
        localStorage.setItem("token", res.data.token);
        alert("Login Successfull");
        console.log("Token:", res.data.token);
     }
     catch(err){
        alert("Login Failed");
        console.error(err);
     }

    };
    return(
        <div>
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

          <button onClick = {login}>Login</button>

        </div>



    );

}

export default Login;