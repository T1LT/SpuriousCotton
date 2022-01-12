import React, { useState, useContext } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  createTheme,
  ThemeProvider,
  Container,
  Typography,
  Box,
  Grid,
  Link,
  TextField,
  CssBaseline,
  Button,
  Avatar,
  IconButton,
  Alert,
  AlertTitle,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import AuthContext from "../context/AuthContext";

const theme = createTheme();

export default function SignIn({ history }) {
  const [showPassword, setShowPassword] = useState(false);
  const { authTokens, loginUser, user, signInError } = useContext(AuthContext);

  if (authTokens && user?.userType) {
    history.push("/");
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRedirect = () => {
    history.push("/signup");
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="login-register">
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            display: "grid",
            placeItems: "center",
            height: "90%",
          }}
        >
          <CssBaseline />
          {signInError && (
            <Alert severity="error">
              <AlertTitle>Invalid Login!</AlertTitle>
              Please enter a valid Email ID and Password!
            </Alert>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={loginUser}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="new-password"
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container sx={{ display: "grid", placeItems: "center" }}>
                <Grid item>
                  <Link
                    variant="body2"
                    onClick={handleRedirect}
                    sx={{ cursor: "pointer" }}
                  >
                    {"Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
}
