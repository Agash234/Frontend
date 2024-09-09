import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom"

const UserList = () => {
  const navigate = useNavigate()
  const [users, setusers] = useState([]);
  const[error,setError]=useState(null)

  useEffect(() => {
    fetchUsers();
  }, []);

const token= localStorage.getItem('token')
  const fetchUsers = async () => {
    try {
      const userResponse = await axios.get('http://localhost:8001/api/users/getusers',{
        headers:{
          Authorization:`bearer ${token}`
        }
      });
      setusers(userResponse.data);
      setError(null)
    } catch (error) {
      if(error.response&&error.response.status==403){
        localStorage.removeItem('token')
        setError("session expired")
        navigate('/login')
      }
      else{
      setError('Error fetching counts:', error);
    }
  }
  };

  return (
    <>
    <div className="headers" style={{padding:"1rem", boxShadow: "0 6px 0 rgba(0, 0, 0, 0.1)"}}>
       <h1 style={{fontWeight:"600",color:"rgb(137, 43, 226)"}}>Users List</h1>
    </div>

    <div className="product">
      
      <table>
        <thead>
          <tr style={{color:"rgb(137, 43, 226)"}}>
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>CreatedAt</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user,index) => (
            <tr key={user._id} style={{color:"#222",textAlign:"center"}}>
              <td style={{textAlign:"center"}}>{index+1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        .product {
          
          margin: 2rem;
          font-family:"Arial"
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
        }
        th {
          background-color: #f2f2f2;
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
          font-family: "Roboto";
        }
      `}</style>

      <button style={{ backgroundColor:"rgb(137, 43, 226)",position:"absolute",right:"1rem",top:"0.5rem",padding:"0.7rem 0.8rem",borderRadius:"10px",color:"white"}} onClick={()=>{navigate('/')}}>Back</button>
    </div>
    </>
  );
};

export default UserList;
