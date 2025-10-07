import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [error, setError] = useState("");

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    //Validate the form data
    if (!email || !password) {
      setError("Check Submitted Data");
      return;
    }

    const response = await fetch(`${BASE_URL}/user/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      setError("Unable to login user, please try different credientials!");
      return;
    }

    const token = await response.json();

    if (!token) {
      setError("Incorrect token");
      return;
    }

    login(email, token);
    navigate('/');
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 5,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Login to Your Account
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            mt: 2,
            border: 1,
            padding: 1,
            borderRadius: 2,
            borderColor: "#d7d7d7ff",
          }}
        >
          <TextField
            inputRef={emailRef}
            label="Eamil"
            type="email"
            name="email"
          />
          <TextField
            inputRef={passwordRef}
            label="Password"
            type="password"
            name="password"
          />
          <Button onClick={onSubmit} variant="contained">
            Login
          </Button>
          {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
