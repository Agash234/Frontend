import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsPersonCircle } from "react-icons/bs";
import { IoLogoBitbucket } from "react-icons/io";

import { Usercontext } from './usercontext';
import { useContext } from 'react';



const Sidebar = () => {
  const{user}=useContext(Usercontext)
  const[isopen,setisopen]=useState(false)
  const navigate = useNavigate();
  const handlesubmit=()=>{
     setisopen(!isopen);
  }


  return (
    <div className='left'>
    <div className={`sidebar ${isopen?'active':''}`}>
      
      <div className='user-info' ><IoLogoBitbucket style={{color:"blueviolet",fontSize:"2.2rem"}}/>DRAGO</div>
      <div className='sidebar-right'>
  
      <div className='sidebar-link' onClick={() => navigate('/addProduct')}>Add Product</div>
      <div className='sidebar-link' onClick={() => navigate('/products')}>Products</div>
      <div className='sidebar-link' onClick={() => navigate('/userlist')}>User List</div>
      <div className='sidebar-link' onClick={() => {
        localStorage.removeItem('token');
        localStorage.removeItem('expire');
        localStorage.removeItem('data');
        navigate('/login');
      }}>Logout</div>
      </div>

      <div className="user-info1" ><BsPersonCircle className='icon'/> {user}</div>
    </div>
    {isopen?<button className='close-btn' onClick={handlesubmit}>X</button>:<button className="hamburger"onClick={handlesubmit}> &#9776;</button>}
    </div>
  );
}

export default Sidebar;
