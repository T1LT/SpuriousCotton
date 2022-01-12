import React, { useState, useContext } from "react";
import QrReader from "react-qr-reader";
import { Button } from "@mui/material";
import CryptoJS from "crypto-js";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { dateFormatter } from "../utils/utils";
import { Alert, AlertTitle, Box, Typography, Modal } from "@mui/material";

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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
};

export default function ScanProductModal({ open, handleClose }) {
    const { REACT_APP_SECRET_KEY } = process.env;
    const { authTokens } = useContext(AuthContext);
    const [inputMode, setInputMode] = useState("upload");
    const [formStep, setFormStep] = useState(1);
    const [productDetails, setProductDetails] = useState({});
    const [QRError, setQRError] = useState(false);
    const handleScan = (data) => {
        if (data) {
            setFormStep(2);
            try {
                let bytes = CryptoJS.AES.decrypt(
                    data.toString(),
                    REACT_APP_SECRET_KEY
                );
                let decryptedData = JSON.parse(
                    bytes.toString(CryptoJS.enc.Utf8)
                );
                axios
                    .post(
                        `http://localhost:8000/products/scanned-product-details/`,
                        {
                            id: +decryptedData,
                        },
                        {
                            headers: {
                                Authorization: "Bearer " + authTokens.access,
                            },
                        }
                    )
                    .then((res) => {
                        setProductDetails(res.data);
                    });
            } catch (error) {
                console.log(error);
                setQRError(true);
            }
        }
    };
    const handleError = (error) => {
        console.error(error);
    };
    const handleClick = () => {
        if (inputMode === "upload") {
            setInputMode("camera");
        } else {
            setInputMode("upload");
        }
    };
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
                    >
                        Scan A Product
                    </Typography>
                    {formStep === 1 ? (
                        <>
                            <Button
                                variant="text"
                                onClick={handleClick}
                                sx={{ m: 2 }}
                            >
                                {inputMode === "camera"
                                    ? "Close Camera"
                                    : "Open Camera"}
                            </Button>
                            {inputMode === "camera" && (
                                <QrReader
                                    delay={300}
                                    onError={handleError}
                                    onScan={handleScan}
                                    style={{ width: "100%" }}
                                />
                            )}
                        </>
                    ) : (
                        <>
                            <div>
                                {QRError && (
                                    <Alert severity="error">
                                        <AlertTitle>Invalid QR Code</AlertTitle>
                                        This is an invalid QR Code, please check
                                        the QR Code again!
                                    </Alert>
                                )}
                                {productDetails.status ? (
                                    <>
                                        {productDetails.status === 1 ? (
                                            <ul>
                                                <li>
                                                    Manufacturer:{" "}
                                                    {
                                                        productDetails.manufacturer_name
                                                    }
                                                </li>
                                                <li>
                                                    Packaged On:{" "}
                                                    {dateFormatter(
                                                        productDetails.manufactured_date
                                                    )}
                                                </li>
                                                <li>
                                                    Best Before:{" "}
                                                    {dateFormatter(
                                                        productDetails.expiry_date
                                                    )}
                                                </li>
                                                <li>
                                                    Price: Rs.{" "}
                                                    {parseInt(
                                                        productDetails.price
                                                    )}
                                                </li>
                                                <li>
                                                    Variety:{" "}
                                                    {productDetails.variety}
                                                </li>
                                                <li>
                                                    Quantity:{" "}
                                                    {parseInt(
                                                        productDetails.quantity
                                                    )}{" "}
                                                    grams
                                                </li>
                                            </ul>
                                        ) : (
                                            <>
                                                Dear Customer, this QRcode has
                                                already been scanned on{" "}
                                                {productDetails.scanned_date}
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {!QRError && (
                                            <p>
                                                Dear Customer, looks like this
                                                product is fake.
                                            </p>
                                        )}
                                    </>
                                )}
                            </div>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => {
                                    handleClose();
                                    setFormStep(1);
                                    setQRError(false);
                                }}
                            >
                                Done
                            </Button>
                        </>
                    )}
                </Box>
            </Modal>
        </div>
    );
}
