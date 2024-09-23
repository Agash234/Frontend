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
import { Userprovider } from './component/usercontext'
// import PrivateRoute from './component/protect'
 

const App = () => {
  
  return (
    <Userprovider>
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
     
      
    </Router>
    </Userprovider>
  );
}



export default App;