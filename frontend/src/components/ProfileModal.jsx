import React, { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};

export default function ProfileModal({ open, handleClose }) {
  const { userType, authTokens } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:8000/users/profile/`, {
        headers: {
          Authorization: "Bearer " + authTokens?.access,
        },
      })
      .then((res) => {
        setUserData(res.data);
      });
    //eslint-disable-next-line
  }, []);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            sx={{ fontWeight: "bold" }}
          >
            Profile
          </Typography>
          {userType === "Customer" ? (
            <>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <strong>First Name:</strong> {userData.first_name}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <strong>Last Name:</strong> {userData.last_name}
              </Typography>
            </>
          ) : (
            <>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <strong>Name:</strong> {userData.user_name}
              </Typography>
            </>
          )}
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>User Type:</strong> {userType}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Email Address:</strong> {userData.email}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Phone Number:</strong> {userData.phone_number}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
