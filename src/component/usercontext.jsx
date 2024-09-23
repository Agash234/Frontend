import React ,{createContext,useState} from 'react'
export const Usercontext=createContext();

export const Userprovider = ({children}) => {
    const[user,setuser]=useState(null)
  return (
    <Usercontext.Provider value={{user,setuser}}>
        {children}

    </Usercontext.Provider>
  );
};

