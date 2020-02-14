import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { default as axios } from "../utilities/axios-conf";

export const AuthContext = React.createContext({});

// const fakeUserData: any = {
//   id: 1,
//   name: 'Jhon Doe',
//   avatar: '',
//   roles: ['USER', 'ADMIN'],
// };

/**
 * We have used Fake JWT token from "jwt.io"
 * This is a sample token to show auth is working
 * Your token will come from your server when user successfully loggedIn.
 */

const fakeToken: any =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoidGFyZXEgam9iYXllcmUiLCJyb2xlcyI6ImFkbWluIn0.k74_B-zeWket405dIAt018mnQFMh_6_BTFpjB77HtRQ';

const addItem = (key: string, value = '') => {
  /**
   *  Using the local storage code....
   */
  // if (key) localStorage.setItem(key, value);

  /**
   *  Using the Cookies code...
   */
  if (key) Cookies.set(key, value, { expires: 7 });
};

const clearItem = (key: any) => {
  /**
   *  Using the local storage code....
   */
  // localStorage.removeItem(key);

  /**
   *  Using the Cookies code...
   */
  Cookies.remove(key);
};

// const isValidToken = () => {
//   /**
//    *  Using the local storage code....
//    */
//   // const token = localStorage.getItem('token');

//   /**
//    *  Using the Cookies code...
//    */
//   const token = Cookies.get('token');
//   // JWT decode & check token validity & expiration.
//   if (token) return true;
  
//   return false;
// };

const AuthProvider = (props: any) => {
  // const [loggedOut, setLoggedOut] = useState(true);
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(!!user); // isValidToken()
  const [token, setToken] = useState(null);
  const [authMessage, setAuthMessage] = useState("");

  const hasRole = (roleName: string) => {
    if (!roleName) {
      return false;
    }

    if (!loggedIn) {
      return false;
    }

    if (!user) {
      return false;
    }

    return (user as any).roles.includes(roleName);
  }
  
  const signIn = async(params: any) => {    
    try {
      setAuthMessage("");

      const { username, password } = params;
      const result = await axios.post("auth/signin", {
        username,
        password
        });

      if (result.status === 200) {
        console.log(params, 'sign in form Props');
        console.log(result.data);
      
        setUser(result.data);
        setToken(fakeToken);
        addItem('token', fakeToken);
        setLoggedIn(true);        
      }
      if (result.status === 400) {
        return result.data.message;
      }
    }
    catch(e) {
      console.log(e);  

      setAuthMessage(e.response.data.message);

      return false;
    };
  };

  const logOut = () => {
    setUser(null);
    setToken(null);
    clearItem('token');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        logOut,
        signIn,
        user,
        token,
        authMessage,
        hasRole
      }}
    >
      <>{props.children}</>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
