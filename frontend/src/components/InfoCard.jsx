import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import DetailsCard from "./DetailsCard";

const InfoCard = ({ text, heading, type, size, productData }) => {
  if (type === "manufacturers") {
    return (
      <Box>
        <Card
          variant="outlined"
          sx={{
            display: "flex",
            flexDirection: "column",
            boxShadow: 2,
            overflow: "auto",
            height: size === "large" ? "40em" : "100%",
          }}
        >
          <Typography
            variant="h4"
            sx={{ textAlign: "center", mt: 2, fontWeight: "bold" }}
          >
            {heading}
          </Typography>
          <CardContent
            sx={{
              display: "grid",
              placeItems: "center",
              paddingX: 2,
            }}
          >
            {productData?.map((data, index) => (
              <Box key={index} sx={{ width: "100%" }}>
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
                    <Typography
                      variant="h5"
                      sx={{ ml: 2, mt: 2, fontWeight: "bold" }}
                    >
                      {data.user_name}
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
                        <li>
                          <strong>Email:</strong> {data.email}
                        </li>
                        <li>
                          <strong>Contact:</strong> {data.phone_number}
                        </li>
                      </ul>
                    </CardContent>
                  </div>
                </Card>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Box>
    );
  } else {
    return (
      <Box>
        <Card
          variant="outlined"
          sx={{
            display: "flex",
            flexDirection: "column",
            boxShadow: 2,
            overflow: "auto",
            height: size === "large" ? "40em" : "100%",
          }}
        >
          <Typography
            variant="h4"
            sx={{ textAlign: "center", mt: 2, fontWeight: "bold" }}
          >
            {heading}
          </Typography>
          <CardContent
            sx={{
              display: "grid",
              placeItems: "center",
              paddingX: 2,
            }}
          >
            {type === "details" ? (
              <>
                {productData?.map((data) => (
                  <DetailsCard key={data.id} data={data} />
                ))}
              </>
            ) : (
              text
            )}
          </CardContent>
        </Card>
      </Box>
    );
  }
};

export default InfoCard;
