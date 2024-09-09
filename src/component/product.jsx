import React, { useEffect, useState,useRef } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import "./product.css";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { FaStarHalfStroke } from "react-icons/fa6";

const Product = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const [Error,setError]=useState(null);
  const productlist = [
    { id: 1, name: 'Product 1', image: '/product1.jpg' },
    { id: 2, name: 'Product 2', image: '/product2.jpg' },
    { id: 3, name: 'Product 3', image: '/product3.jpg' },
    // Add more products as needed
  ];
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % productlist.length;
      carouselRef.current.style.transition = 'transform 0.5s ease-in-out';
      carouselRef.current.style.transform = `translateX(-${nextIndex * 100}%)`;
      return nextIndex;
    });
  };

  const handlePrevious = () => {
    setCurrentIndex((previndex) => {
      const prevIndex = (previndex - 1 + productlist.length) % productlist.length;
      carouselRef.current.style.transition = 'transform 0.5s ease-in-out';
      carouselRef.current.style.transform = `translateX(-${prevIndex * 100}%)`;
      return prevIndex;
    });
  };
  const handleDotClick = (index) => {
    setCurrentIndex(index);
    carouselRef.current.style.transition = 'transform 0.5s ease-in-out';
    carouselRef.current.style.transform = `translateX(-${index * 100}%)`;
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 3000); // Auto-scroll interval

    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const token =localStorage.getItem('token')
    if(!token){
      setError("no token found")
      return;
    }
    try {
      const productResponse = await axios.get('http://localhost:8001/api/products/getproducts',{
        headers:{
          Authorization:`Bearer ${token}`,
        }
      });
      setProducts(productResponse.data);
      setError(null)
    } catch (error) {
      if(error.response&&error.response.status==403){
        localStorage.removeItem('token');
        navigate('/login')
        setError('session expired')
      }
      else{
      setError('Error fetching products:', error);
    }
  }
  };

  return (
    <>
    <div className='header'style={{padding:"1rem"}}>
      <h1 style={{color:"rgb(137, 43, 226)"}}>Product list</h1>
      <button onClick={() => { navigate('/') } } style={{position:"absolute", right:"1rem",top:"0.6rem",width: "80px", height: "50px",borderRadius:"10px" ,color:"white",backgroundColor:"rgb(137, 43, 226)"}}>Back</button>
    </div>

    <div style={{margin:" 2rem 5rem"}}>
      <div className='scroll-container'>
      <button className="carousel-button prev" style={{position:"absolute",top:"2rem",left:"0",zIndex:"1000"}} onClick={handlePrevious}>
        &#10094; 
      </button>
        <div className='carousel-wrapper'>
      <div className="carousel" ref={carouselRef}>
          {productlist.map(product => (
            <div key={product.id} className="carousel-item">
              <img src={product.image} alt={product.name} />
            </div>
          ))}
        </div>
        </div>
        <button className="carousel-button next" style={{position:"absolute",top:"2rem",right:"0"}} onClick={handleNext}>
        &#10095; {/* Unicode character for right arrow */}
      </button>
      <div className="carousel-dots">
        {productlist.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
        </div>
      </div>
      <div className="products">
           {products.map(product => (
          <div className="product-card" 
          key={product._id} >
            <div className='images'>
                  <img src={product.Image} alt={product.name}  />
            </div>
           <div className='product-details' >
            <h3 >{product.name} </h3>
            <p className='discription'>{product.description}</p>
            <p className='price'><strong><span>$</span>{product.price}</strong></p>
             <p className="quantity" ><MdOutlineProductionQuantityLimits />{product.quantity}</p>
             <div  className= "star" style={{display:"flex",flexDirection:"row",justifyContent:"center"}} >
              <p><FaStar /></p>
              <p><FaStar /></p>
              <p><FaStar /></p>
              <p><FaStar /></p>
              <p><FaStarHalfStroke /></p>
             </div>
             <div className='btn' >
             <button className='product-button'>Add Cart</button>
             </div>
          </div>
          </div>
         

        ))}


      </div>
      </div></> 
  );
};

export default Product;
