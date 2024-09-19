import React from 'react'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import Sidebar from './component/sidebar'
import Register from './component/register'
import Product from './component/product'
import Login from './component/login'

import Dashboard from './component/Dashboard'
import UserProfile from './component/userprofile'
import UsersList from './component/user'
import AddProduct from './component/addProduct'
// import PrivateRoute from './component/protect'
 

const App = () => {
  
  return (
    <Router>
    
    <Routes>
      
        <Route path="/login" element={ <Login />} />
        <Route path="/register" element={ <Register/>}/>
    
        <Route path="/Dashboard" element={<Dashboard />}  />
        <Route path="/userlist" element={<UsersList />}/>
        <Route path="/products" element={<Product />} />
        <Route path="/addProduct" element={<AddProduct />} />

        {/* Default Route */}
        <Route path="/" element={<Dashboard />}  />

      </Routes>
     
      {/* <Routes>
        <Route path="/" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/Dashboard" element={<Protect><Dashboard/></Protect>}/>
        <Route path="/product" element={<Protect><Product/></Protect>}/>
        <Route path="/user" element={<Protect><UsersList/></Protect>}/>
        <Route path="/userprofile" element={<Protect><UserProfile/></Protect>}/>
      </Routes> */}
    </Router>
  );
}



export default App;