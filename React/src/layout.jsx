import React from 'react';
import Login from './components/auth/login';
import Signup from './components/auth/signup';
import {useState} from 'react';
import Header from './components/auth/navbar';
import Instructor_layout from './components/layout/instructor_layout';

const Layout = () => {
  // const [isLogin, setIsLogin] = useState(true);
  // const updateState = (newState) => {
  //   setIsLogin(newState)
  // }

  return (
    
    <div>
      <div>
      <Instructor_layout/>
      {/* {isLogin && <Login updateState={updateState}/>}
      {!isLogin && <Signup updateState={updateState}/>} */}
      </div>
    </div>
  )
}

export default Layout;