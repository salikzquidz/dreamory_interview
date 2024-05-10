import React, { useContext, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { FormControl } from "@mui/base/FormControl";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Store } from "../../store";
import client from "../../utils/build-client";

export default function SignIn() {
  const [emailOrName, setEmailOrName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      let response = await client.post(
        "auth/signin",
        {
          email: emailOrName,
          password,
        },
        { withCredentials: true }
      );
      // if response data // todo : find out how to persist if refresh happens
      if (response?.data?.userInfo) {
        dispatch({
          type: "LOGIN",
          payload: response?.data?.userInfo,
        });
        localStorage.setItem(
          "userInfo",
          JSON.stringify(response.data.userInfo)
        );
        navigate("/");
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
      setErrorMessage("Invalid email or password!");
    }
  };

  return (
    <>
      <Navbar title={"RedLobby"} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "3em",
        }}
      >
        <FormControl
          style={{ width: "700px", backgroundColor: "" }}
          onSubmit={() => navigate("/")}
        >
          <TextField
            required
            id="outlined-required"
            label="Name or email"
            defaultValue=""
            value={emailOrName}
            onChange={(e) => setEmailOrName(e.target.value)}
            sx={{ width: "100%", marginBottom: "20px" }}
          />
          <TextField
            required
            id="outlined-required"
            label="Password"
            type="password"
            defaultValue=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ width: "100%", marginBottom: "20px" }}
          />
          <Button type="submit" onClick={handleSignIn} sx={{ width: "100%" }}>
            Submit
          </Button>
        </FormControl>
      </Box>
    </>
  );
}
