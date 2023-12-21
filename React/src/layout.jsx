import React from 'react';
import Login from './components/login';
import Signup from './components/signup';
import {useState} from 'react';


const Layout = () => {
  const [isLogin, setIsLogin] = useState(true);
  const updateState = (newState) => {
    setIsLogin(newState)
  }

  return (
    <div>
    {isLogin && <Login updateState={updateState}/>}
    {!isLogin && <Signup updateState={updateState}/>}
    </div>
  )
}

export default Layout
