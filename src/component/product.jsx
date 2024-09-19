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
    { id: 1, name: 'Product 1', image: 'https://s7g10.scene7.com/is/image/ktm/config-banner?wid=1200&dpr=off' },
    { id: 2, name: 'Product 2', image: 'https://cdn.pixabay.com/photo/2016/04/07/06/53/bmw-1313343_1280.jpg' },
    { id: 3, name: 'Product 3', image: 'https://www.verneidemotoplex.com/imglib/promos/Indian/2024/2024-imc-na-own-americas-first-web-banner-scout-family-1920x640.jpg' },
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
    < div className='containerfull'>
    <header className='header-1'>
      <h1 style={{position:"relative",color:"blue"}}>Product list</h1>
      <button  className="btn-1" onClick={() => { navigate('/') } } style={{padding:"10px",position:"relative",backgroundColor:" rgb(137, 43, 226)",color:"white",borderRadius:"10px",margin:"10px"}}>Back</button>
    </header>

    <main className='main-container1'>
      <section  className='scroll-container'>
      <button className="button-prev" style={{position:"absolute",top:"40%",left:"0",zIndex:"1000",padding:"5px",borderRadius:"50%",border:"none"}} onClick={handlePrevious}>
        &#10094; 
      </button>
        <div className='carousel-wrapper'>
      <div className="carousel" ref={carouselRef}>
          {productlist.map(product => (
            <div key={product.id} className="carousel-item">
              <img  src={product.image} alt={product.name} />
            </div>
          ))}
        </div>
        </div>
        <button className="button-next" style={{position:"absolute",top:"40%",right:"0",border:"none",borderRadius:"50%",padding:"5px"}} onClick={handleNext}>
        &#10095; {/* Unicode character for right arrow */}
      </button>
     
      </section>
      <section className="products">
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


      </section>
      </main>
      </div> 
  );
};

export default Product;
