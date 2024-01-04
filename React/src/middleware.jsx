import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { useEffect, useState } from "react";


function ProtectedRoutes({children}) {
 
 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const location = useLocation();
  // const firstName = location.state.firstName;
  // const lastName = location.state.lastName;


  const getSession = async () => {
    const { data } = await axios.get("http://localhost:3000/auth/getsession", {
      withCredentials: true,
    });
    console.log("data",data)
    data.error ? setIsLoggedIn(false) : setIsLoggedIn(true);
  };

  useEffect(() => {
    void getSession();
  }, []);

  return <>{isLoggedIn != true ? <Navigate to="/" replace /> : children}</>;
}

ProtectedRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoutes;
