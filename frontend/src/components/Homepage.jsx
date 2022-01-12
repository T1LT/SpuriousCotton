import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect, useContext } from "react";
import InfoCard from "./InfoCard";
import ScanProductModal from "./ScanProductModal";
import RegisterProductModal from "./RegisterProductModal";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const Homepage = ({ history }) => {
  const { userType, authTokens } = useContext(AuthContext);
  const scanText = "Previously Scanned Products";
  const registerText = "Previously Registered Products";
  const scanButtonText = "Scan a Product";
  const registerButtonText = "Register a Product";
  const [customerModalOpen, setCustomerModalOpen] = useState(false);
  const [manufacturerModalOpen, setManufacturerModalOpen] = useState(false);
  const [productData, setProductData] = useState([]);

  const handleCustomerClose = () => {
    setCustomerModalOpen(false);
  };
  const handleManufacturerClose = () => {
    setManufacturerModalOpen(false);
  };
  const handleClick = () => {
    if (userType === "Customer") {
      setCustomerModalOpen(true);
    } else {
      setManufacturerModalOpen(true);
    }
  };

  useEffect(() => {
    if (userType === "Customer") {
      axios
        .get(`http://localhost:8000/products/scanned-product-details/`, {
          headers: {
            Authorization: "Bearer " + String(authTokens.access),
          },
        })
        .then((res) => {
          setProductData(res.data.previouslyScannedProducts);
        });
    } else {
      axios
        .get(`http://localhost:8000/products/register-product-details/`, {
          headers: {
            Authorization: "Bearer " + String(authTokens.access),
          },
        })
        .then((res) => {
          setProductData([...res.data]);
        });
    }
    //eslint-disable-next-line
  }, []);
  return (
    <div
      className="content"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <ScanProductModal
        open={customerModalOpen}
        handleClose={handleCustomerClose}
      />
      <RegisterProductModal
        open={manufacturerModalOpen}
        handleClose={handleManufacturerClose}
      />
      <Button variant="contained" size="large" onClick={handleClick}>
        {userType === "Customer" ? scanButtonText : registerButtonText}
      </Button>
      <Box sx={{ mt: 5, width: "80vw" }}>
        <InfoCard
          heading={userType === "Customer" ? scanText : registerText}
          type={"details"}
          productData={productData}
        />
      </Box>
    </div>
  );
};

export default Homepage;
