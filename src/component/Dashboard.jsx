// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar';
import {useNavigate} from "react-router-dom";
import { LuUsers } from "react-icons/lu";
import { MdOutlineElectricBike } from "react-icons/md"
import "./dashboard.css"
import { IoSearch } from "react-icons/io5";
import { IoNotificationsSharp } from "react-icons/io5";
import { BsPersonCircle } from "react-icons/bs";
import { Usercontext } from './usercontext';
import { useContext } from 'react';
import axiosInstance from './refresh';



const Dashboard=()=> {
 
  const navigate = useNavigate()
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const[error,setError]=useState(null)
  const{user}=useContext(Usercontext)

  useEffect(()=>{
    const token=localStorage.getItem('token')
    if(!token){
      // setToken(localStorage.getItem('token'));
      navigate('/login')
    }
    else{
      navigate('/Dashboard')
    }
  }, [navigate]);

  useEffect(() => {
    fetchWithToken()
    fetchProducts()
  }, []);
  
 
    const fetchWithToken=async()=>{
    try {
      const userResponse = await axiosInstance.get('users/getusers')
      //   {
      //   headers:{
      //     Authorization: `Bearer ${token}`
      //   }
      // });
      
      setUserCount(userResponse.data.length);
      setError(null)
    } 

    // catch (error) {
    //   if(error.response && error.response.status === 403) {
     
    //     localStorage.removeItem('token')
    //     navigate('/login')
    //     console.log("session expired")
    // }
    catch (error) {
      console.log('Error fetching data', error);
  }
  }



  const fetchProducts=async()=>{
    try {
      // const productRespose = await axios.get('/api/products');
      const productResponse = await axiosInstance.get('products/getproducts')
      // {
      //   headers:{
      //     Authorization:`bearer ${token}`
      //   }
      // });
      console.log(productResponse.data.length)
      
      setProductCount(productResponse.data.length);
      setError(null)
    } catch (error) {
    //   if(error.response&&error.response.status==403){
    //     localStorage.removeItem('token')
    //     setError("session expired")
    //     navigate('/login')
    //   }
    //   else{
    //   setError('Error fetching counts:', error);
    // }
    console,log("Error fetching data",error)
  }
  }


 

  return (
    <div className='dashboard-main'>
        
           <Sidebar />
        
      <div className='main'>
        <div className='header'>
           {/* <h3 style={{position:"absolute",margin:" 2% 3%",color:"#333",fontSize:"1.4rem"}}>Dashboard </h3> */}
           <h3 style={{ marginLeft:"1rem", color:"#333",fontSize:"1.4rem"}}>Dashboard </h3>
           
           <div className='header1'>
           <div className='search' style={{backgroundColor:" #e6e6e6",width:"50%",borderRadius:"40px",padding:"4px"}}><input style={{padding:"5px"}}type='text' placeholder='Search' id='text' /><IoSearch /></div>
           <div >
            <span><IoNotificationsSharp /></span>
            </div>
            <div className="user-info1 useinfo2"><BsPersonCircle className='icon'/> {user} </div>
            </div>
            
              

        </div>
  
         <div className='content'>
           <h1 style={{fontWeight:"700",color:"#222", marginLeft:"2%",fontSize:"2.2rem",marginTop:"2%"}}>Welcome <span style={{color:"rgba(137, 43, 226, 0.774)"}}>{user}!</span> </h1>
           <h2 style={{textAlign:"center",color:"#333",marginTop:"1.5rem",marginBottom:"1rem",fontSize:"2rem",fontFamily: "Roboto Slab"}}> Your <span className="scribble" style={{fontFamily: "Roboto Slab"}}>Ultimate</span> Bike Hub at a Glance!</h2>
         

          <div className='cards-container'>
               <div className='card'>
              <span style={{fontSize:"1.5rem"}}><LuUsers /></span> <h3>Users</h3>
              <p>{userCount}</p>
              </div>
          
              <div className='card'>
                <span style={{fontSize:"1.7rem"}}><MdOutlineElectricBike /></span><h3>Products</h3>
                <p>{productCount}</p>
               </div>
          </div>
          </div>
      </div>
      </div>

      
  );
}


export default Dashboard;
