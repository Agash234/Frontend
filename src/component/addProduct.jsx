import React, { useState } from 'react';
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import './addproduct.css'
import axiosInstance from './refresh';

const AddProduct = () => {

  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0)
  const [error, setError] = useState('');
  const [Image,setimage]=useState();
  const[filename,setfilename]=useState('')

  const handlefilechange = (e) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile)
    setimage(selectedFile);
  }

  const handleSubmit = async (e) => {
    console.log("clicked")
    e.preventDefault();
    if (!name || !price || !description) {
      setError('All fields are required');
      return;
    }

    setError('');
         const formdata=new FormData()
           formdata.append('file',Image)
           formdata.append('name', name);
          formdata.append('price', price);
          formdata.append('description', description);
          formdata.append('quantity', quantity)
  
   try {
    const token=localStorage.getItem("token")
  
      const response=await axios.post('http://localhost:8001/images',formdata);
    

      console.log(response);
      const imageUrl=response.data.imageUrl;

      const productdata={name, price, description, quantity, Image: imageUrl}
     const productadd= await axiosInstance.post('http://localhost:8001/api/products/addproduct',productdata)
     

      setName('');
      setPrice('');
      setDescription('');
      setQuantity(0); 
      setimage('')
      alert('Product added successfully!');
    } 
    catch (error) {
     console.log("Error in Adding Product",error)
    }
  };

  return (
    < div className="wholeConatiner">
     
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className='back'>
          <button onClick={()=>{navigate("/")}}>Back</button>
      </div>
      <div className='container'>
          <h2>Add Product</h2>
          
      <table>
          <tbody>
          <tr>
          <td><label htmlFor="name">Name:</label></td>
          <td><input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          /></td>
        </tr>
        <tr>
          <td><label htmlFor="price">Price:</label></td>
          <td><input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          /></td>
        </tr> 
        <tr>
         <td> <label htmlFor="quantity">Quantity:</label></td>
          <td><input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e)=>setQuantity(e.target.value)}
            required
          /></td>
        </tr>
       
        <tr>
          <td><label htmlFor="image_url">Image</label></td>
         <td><input type="file" id="image_url" 
          onChange={handlefilechange}
          required/></td> 
       </tr>
       <tr>
          <td><label htmlFor="description">Description:</label></td>
          <td><textarea style={{backgroundColor:" #e6e6e6",color:"#666",outline:"none",border:"white",padding:"0.5rem"}}
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea></td>
        </tr>
        </tbody>
        </table>
        <button  onClick={handleSubmit}>Add Product</button>
      </div>
    
    </div>
  );
};

export default AddProduct;
