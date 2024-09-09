import axios from 'axios'
import {useNavigate } from 'react-router-dom';

export const refreshToken = async() => {
    const navigate=useNavigate();
    try{
        const refreshtoken=localStorage.getItem('refresh')
        console.log(refreshtoken)
        if(!refreshtoken){
            throw new Error("the refresh token is not found")

        } 
        const response =await axios.post('http://localhost:8001/api/refresh/refreshtoken',{refreshtoken});
            const{token,refreshtoken:newRefreshToken}=response.data

    localStorage.setItem('token', token);
    localStorage.setItem('refresh', newRefreshToken || refreshToken);

    return token;
  }
   catch (error) {
    console.error('Failed to refresh token:', error);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    navigate('/login')
    throw error;
  }
};