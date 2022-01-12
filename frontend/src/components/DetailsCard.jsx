import React, { useContext } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { dateFormatter } from "../utils/utils";
import AuthContext from "../context/AuthContext";

const DetailsCard = ({ data }) => {
  const { userType } = useContext(AuthContext);
  return (
    <Box sx={{ width: "100%" }}>
      <Card
        variant="outlined"
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          boxShadow: 2,
          m: 1,
        }}
      >
        <div>
          <Typography variant="h5" sx={{ ml: 2, mt: 2, fontWeight: "bold" }}>
            PACKAGE #{data.id}
          </Typography>
          <CardContent
            sx={{
              p: 0,
              "&:last-child": {
                paddingBottom: 0,
              },
            }}
          >
            <ul>
              {userType === "Customer" && (
                <li>Manufacturer: {data.manufacturer_name}</li>
              )}
              <li>Packaged On: {dateFormatter(data.manufactured_date)}</li>
              <li>Best Before: {dateFormatter(data.expiry_date)}</li>
              <li>Price: Rs. {parseInt(data.price)}</li>
              <li>Variety: {data.variety}</li>
              <li>Quantity: {parseInt(data.quantity)} grams</li>
            </ul>
          </CardContent>
        </div>
      </Card>
    </Box>
  );
};

export default DetailsCard;
