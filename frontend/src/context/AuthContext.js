import React, { useState, createContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const history = useHistory();
  const [signInError, setSignInError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(JSON.parse(localStorage.getItem("authTokens")).access)
      : null
  );

  const loginUser = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios
      .post(
        "http://localhost:8000/users/auth/token/",
        {
          email: data.get("email").toLowerCase(),
          password: data.get("password"),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setAuthTokens(res.data);
          setUser(jwt_decode(res.data.access));
          localStorage.setItem("authTokens", JSON.stringify(res.data));
          setSignInError(false);
        }
      })
      .catch(() => {
        console.clear();
        setSignInError(true);
      });
  };

  const updateToken = () => {
    axios
      .post(
        `http://localhost:8000/users/auth/token/refresh/`,
        {
          refresh: authTokens?.refresh,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setAuthTokens(res.data);
          setUser(jwt_decode(res.data.access));
          localStorage.setItem("authTokens", JSON.stringify(res.data));
        } else {
          logoutUser();
        }
      });
    if (loading) {
      setLoading(false);
    }
  };

  const logoutUser = (event) => {
    event.preventDefault();
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    history.push("/signin");
  };

  useEffect(() => {
    if (loading) {
      if (authTokens) {
        updateToken();
      } else {
        setLoading(false);
      }
    }
    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, 270000);
    return () => clearInterval(interval);
    //eslint-disable-next-line
  }, [authTokens, loading]);

  let contextData = {
    authTokens: authTokens,
    user: user,
    userType: user?.userType,
    loginUser: loginUser,
    logoutUser: logoutUser,
    signInError: signInError,
  };
  return (
    <AuthContext.Provider value={contextData}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
