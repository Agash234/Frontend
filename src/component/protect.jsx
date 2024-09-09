// import React, { useState, useEffect } from 'react';
// import { Navigate } from 'react-router-dom';

// const PrivateRoute = ({ element: Component }) => {
//     const [isAuthenticated, setIsAuthenticated] = useState(null);

//     useEffect(() => {
//         const checkTokenExpiry = () => {
//             const expiresIn = localStorage.getItem('expire');
//             if (expiresIn) {
//                 const expired = parseInt(expiresIn, 10);
//                 if (Date.now() <= expired) {
//                     setIsAuthenticated(true);
//                 } else {
//                     setIsAuthenticated(false);
//                     localStorage.removeItem('expire');
//                     localStorage.removeItem('token');
//                 }
//             } else {
//                 setIsAuthenticated(false);
//             }
//         };

//         checkTokenExpiry();

//         const intervalId = setInterval(checkTokenExpiry, 10000); 

//         return () => clearInterval(intervalId);
//     }, []);

//     if (isAuthenticated === null) {
//         return null; 
//     }

//     return isAuthenticated ? Component : <Navigate to="/login" />;
// };

// export default PrivateRoute;
