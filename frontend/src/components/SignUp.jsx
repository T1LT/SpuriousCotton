import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
    MenuItem,
    Select,
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Link,
    Grid,
    Box,
    Typography,
    Container,
    createTheme,
    ThemeProvider,
    InputLabel,
    FormControl,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { emailRegex, phoneRegex, passwordRegex } from "../utils/utils";
import axios from "axios";

const theme = createTheme();

export default function SignUp({ history }) {
    const [showPassword, setShowPassword] = useState(false);
    const [usertype, setUsertype] = useState("Customer");
    const [errors, setErrors] = useState({});
    const validate = (data) => {
        let temp = {};
        if (usertype === "Customer") {
            temp.firstName = data.get("firstName")
                ? ""
                : "This field is required.";
            temp.lastName = data.get("lastName")
                ? ""
                : "This field is required.";
        } else {
            temp.name = data.get("name") ? "" : "This field is required.";
        }
        temp.email = emailRegex.test(data.get("email")) ? "" : "Invalid email.";
        temp.phone = phoneRegex.test(data.get("phone"))
            ? ""
            : "Invalid phone number.";
        temp.password = passwordRegex.test(data.get("password"))
            ? ""
            : "Password must be atleast 6-16 characters in length and must contain atleast one number and atleast one special character.";
        setErrors({ ...temp });
        return Object.values(temp).every((e) => e === "");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (validate(data)) {
            axios
                .post(`http://localhost:8000/users/signup/`, data)
                .then((res) => {
                    history.push("/signin");
                })
                .catch((error) => console.log(error));
        }
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
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
                            Sign up
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 3 }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="select-label">
                                            Register As
                                        </InputLabel>
                                        <Select
                                            labelId="select-label"
                                            id="registerAs"
                                            label="Register As"
                                            name="registerAs"
                                            value={usertype}
                                            onChange={(e) => {
                                                setUsertype(e.target.value);
                                            }}
                                            autoFocus
                                        >
                                            <MenuItem value="Customer">
                                                Customer
                                            </MenuItem>
                                            <MenuItem value="Manufacturer">
                                                Manufacturer
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={usertype === "Customer" ? 6 : 12}
                                >
                                    {usertype === "Customer" ? (
                                        <TextField
                                            autoComplete="given-name"
                                            name="firstName"
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="First Name"
                                            {...(errors.firstName && {
                                                error: true,
                                                helperText: errors.firstName,
                                            })}
                                        />
                                    ) : (
                                        <TextField
                                            autoComplete="given-name"
                                            name="name"
                                            required
                                            fullWidth
                                            id="name"
                                            label="Name"
                                            {...(errors.name && {
                                                error: true,
                                                helperText: errors.name,
                                            })}
                                        />
                                    )}
                                </Grid>
                                {usertype === "Customer" && (
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="lastName"
                                            label="Last Name"
                                            name="lastName"
                                            autoComplete="family-name"
                                            {...(errors.lastName && {
                                                error: true,
                                                helperText: errors.lastName,
                                            })}
                                        />
                                    </Grid>
                                )}
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        {...(errors.email && {
                                            error: true,
                                            helperText: errors.email,
                                        })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="phone"
                                        label="Phone Number"
                                        name="phone"
                                        autoComplete="phone"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    +91
                                                </InputAdornment>
                                            ),
                                            inputMode: "numeric",
                                            pattern: "[0-9]*",
                                        }}
                                        {...(errors.phone && {
                                            error: true,
                                            helperText: errors.phone,
                                        })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        id="password"
                                        autoComplete="new-password"
                                        InputProps={{
                                            endAdornment: (
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={
                                                        handleClickShowPassword
                                                    }
                                                    onMouseDown={
                                                        handleMouseDownPassword
                                                    }
                                                    edge="end"
                                                >
                                                    {showPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            ),
                                        }}
                                        {...(errors.password && {
                                            error: true,
                                            helperText: errors.password,
                                        })}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-start">
                                <Grid item>
                                    Already have an account?&nbsp;
                                    <Link
                                        onClick={() => {
                                            history.push("/signin");
                                        }}
                                        variant="body2"
                                        sx={{ cursor: "pointer" }}
                                    >
                                        Sign in
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
