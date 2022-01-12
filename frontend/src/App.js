import React, { useState } from "react";
import "./App.css";
import { HashRouter as Router, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import InformationPortal from "./components/InformationPortal";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";
import Header from "./components/Header";

const App = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Header
            open={open}
            handleClose={handleClose}
            handleOpen={handleOpen}
          />
          <PrivateRoute exact path="/" component={Homepage} />
          <PrivateRoute exact path="/info" component={InformationPortal} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
        </AuthProvider>
      </Router>
    </div>
  );
};

export default App;
