import React, { useState } from 'react'
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import "./register.css"
import { FaUser } from "react-icons/fa";


const Register = () => {
    const[username,setUsername]=useState('')
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const[email,setemail]=useState('');
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
      });
    const navigate= useNavigate()





    const validate = () => {
        const newErrors = {};
    
        if (!username) newErrors.username = 'Username is required';
        else if (!isCapitalized(username)) newErrors.username = 'Username must be in capitalized format';
        if (!email) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          newErrors.email = 'Email is invalid';
        }
        if (!password) newErrors.password = 'Password is required';
        else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters ';
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
      };
      const isCapitalized = (str) => {
        return /^[A-Z]/.test(str);
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(validate()){
        try {
            await axios.post('http://localhost:8001/api/auth/register', { username, password ,email});
            setMessage('Registration successful!');
            setErrors({});
        } catch (error) {
            setMessage('Registration failed: ' + error.message);
        }
    }
    else{
        setMessage('please fix errors')
    }
};
    const handleclick=()=>{
        navigate("/login");
    }
    

  return (
    <div className='container-main'>
        
        
        <div className='container-table'>
        <div className='image1'>
        <img src="https://colorlib.com/etc/lf/Login_v1/images/img-01.png"/>
        </div>
       <div className='container-right'>
        
        <h2>Register</h2>
        <div className='line'></div>
        <table>
            <tbody>
            <tr>
               <td><label>Username</label></td>
               <td className='in-put'><input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} required/> {errors.username && <p className="error">{errors.username}</p>}</td>
              

            </tr>
            <tr>
                <td><label>Email</label></td>
                <td className='in-put'><input type="email" value={email} onChange={(e)=>setemail(e.target.value)} required/> {errors.email && <p className="error">{errors.email}</p>}</td>
               

            </tr> 
            <tr>
                <td><label>Password</label></td>
                <td className='in-put'><input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>{errors.password && <p className="error">{errors.password}</p>}</td>
            </tr> 
            </tbody>
            
        </table>

        <button style={{width:"60%"}} onClick={handleSubmit}>Register</button>
        
        <p style={{color:"green"}}>{message}</p>
        <button onClick={handleclick}>Have an Account</button>
    
        </div>
        </div>
       
        </div>
        

  )
}
export default Register;