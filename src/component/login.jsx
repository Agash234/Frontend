
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

import { FaUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import "./login.css"


function Login() {
    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [isFocused1, setIsFocused1] = useState(false);
     

   const navigate = useNavigate();

//page render
useEffect(()=>{
   const token=localStorage.getItem("token")
  if(token ){
       navigate("/Dashboard")
  } 
},[navigate]);

//handlesubmit
const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8001/api/auth/login', { username, password });

            // console.log(response.data.token)
            if (response.data.token) { 
               
                console.log("response...",response)

                //   setuser(response.data.user.username)
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('data',response.data.user.username)
                localStorage.setItem('refresh',response.data.refreshToken)

            
                alert("login sucessfully")
                setTimeout(()=>{
                    navigate('/Dashboard')
                },0)
                
            }



        } catch (error)  {
            alert('Login failed: ' + error.message);
        }
    };
   

    return (
        <div className="form-container">


            <div className='container1'>
                <div className="image">
                    <img src="https://colorlib.com/etc/lf/Login_v1/images/img-01.png"/>
                </div>
                <div className='main-container'>
                    <h2> Member login</h2>
                    <div  className={`text-container ${isFocused ? 'smoke-effect' : ''}`}
                          onFocus={() => setIsFocused(true)}
                          onBlur={() => setIsFocused(false)}>
                        <span style={{marginLeft:isFocused?"0.7rem":"1rem",color:isFocused ? '#c850c0':"#333"}}><FaUser /></span>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setusername(e.target.value)}
                            placeholder="Username"
                            required
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                    </div>
                    <div  className={`text-container ${isFocused1 ? 'smoke-effect' : ''}`}
                      onFocus={() => setIsFocused1(true)}
                      onBlur={() => setIsFocused1(false)}>
                        <span style={{marginLeft:isFocused1?"0.7rem":"1rem",color:isFocused1? '#c850c0':"#333"}}><RiLockPasswordLine /></span>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            onFocus={() => setIsFocused1(true)}
                            onBlur={() => setIsFocused1(false)}
                        />
                    </div>


                    <button className='btn-click' onClick={handleSubmit}>Login</button>
                    <p>If could not register {" "}<Link to="/register" style={{marginLeft:"7px",color:"blueviolet"}}>signup</Link></p>


                </div>
            </div>
        </div>

    );
}

export default Login;
