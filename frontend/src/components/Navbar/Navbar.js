import React, { useContext } from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Store } from "../../store";
import { useNavigate } from "react-router-dom";
import client from "../../utils/build-client";
import axios from "axios";

export default function Navbar({ title }) {
  const { state, dispatch } = useContext(Store);
  const navigate = useNavigate();

  const handleClickLogin = () => {
    if (state?.userInfo !== null) {
    } else {
      navigate("/signin");
    }
  };

  const handleClickLogout = async () => {
    // if (state?.userInfo !== null) {
    try {
      const response = await client.post("auth/signout");
      localStorage.removeItem("userInfo");
      dispatch("LOGOUT");
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
    // } else {
    // navigate("/");
    // }
  };
  console.log(state);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            component={"div"}
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            RedLobby
          </Typography>

          <Box>
            {state?.userInfo?.role === "admin" && (
              <Button color="inherit" onClick={() => navigate("/portal")}>
                Portal
              </Button>
            )}
            <Button color="inherit" sx={{}} onClick={handleClickLogin}>
              {state?.userInfo?.name ? state?.userInfo?.name : <>Login</>}
            </Button>
            <Button
              color="inherit"
              onClick={handleClickLogout}
              sx={{ display: !state?.userInfo && "none" }}
            >
              {state?.userInfo && <>Logout</>}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
