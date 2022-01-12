import {
  Grid,
  CssBaseline,
  Box,
  Card,
  Typography,
  CardContent,
} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import InfoCard from "./InfoCard";
import "./CSS/InformationPortal.css";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const InformationPortal = () => {
  const { authTokens } = useContext(AuthContext);
  const [manufacturersData, setManufacturersData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/users/manufacturers/`, {
        headers: {
          Authorization: "Bearer " + authTokens.access,
        },
      })
      .then((res) => {
        setManufacturersData(res.data);
      });
    //eslint-disable-next-line
  }, []);
  return (
    <div className="content">
      <CssBaseline />
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item sx={{ width: "100%" }}>
          <Box>
            <Card
              variant="outlined"
              sx={{
                display: "flex",
                flexDirection: "column",
                boxShadow: 2,
                overflow: "auto",
                height: "50rem",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  textAlign: "center",
                  mt: 3,
                  fontWeight: "bold",
                }}
              >
                Seed Quality Information
              </Typography>
              <CardContent
                className="display-linebreak"
                sx={{
                  paddingX: 5,
                }}
              >
                <h2>
                  <strong>Analysis of seed in the laboratory:</strong>
                </h2>
                <p>
                  Seed testing is possible for all those who produce, sell and
                  use seeds. Seed testing is highly specialized and technical
                  job. With a view to maintain uniformity in quality control the
                  seed analysis laboratory includes for distinct sections.
                </p>
                <ol>
                  <li>
                    Section of purity testing:
                    <ol type="a">
                      <li>Testing the cleanliness of seed lot and</li>
                      <li>Testing the genuineness of the cultivar</li>
                    </ol>
                  </li>
                  <li>Section for moisture testing</li>
                  <li>
                    Section for viability, germination and section for vigour
                    testing.
                  </li>
                </ol>
                <h2>
                  <strong>Purity analysis:</strong>
                </h2>
                <p>
                  The purity analysis of a seed sample in the seed testing
                  laboratory refers to the determination of the different
                  components of the purity viz., pure seeds, other crop seeds,
                  weed seeds and inert matter.
                </p>
                <h2>
                  <strong>Seed germination test:</strong>
                </h2>
                <p>
                  Germination is defined as the emergence and development from
                  the seed embryo, of those essential structures, for the kind
                  of seed in question, indicates its ability to produce a normal
                  plant under favourable conditions.
                </p>
                <h2>
                  <strong>Determination of moisture content:</strong>
                </h2>
                <h3>Objective:</h3>
                <p>
                  To determine the moisture content of seeds by methods suitable
                  for routine use.
                </p>
                <h3>Definition:</h3>
                <p>
                  The moisture content of a seed sample is the loss in weight
                  when it is dried. It is expressed as a percentage of the
                  weight of the original sample. It is one of the most important
                  factors in the maintenance of seed quality.
                </p>
              </CardContent>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <InfoCard
            heading={"List of Verified Manufacturers"}
            type={"manufacturers"}
            productData={manufacturersData}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default InformationPortal;
