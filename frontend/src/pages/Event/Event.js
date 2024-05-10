import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useLocation } from "react-router-dom";
import { Box, Button, Paper, Typography } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BusinessIcon from "@mui/icons-material/Business";
import PlaceIcon from "@mui/icons-material/Place";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DateRangeIcon from "@mui/icons-material/DateRange";
import formatdate from "../../utils/format-date";

export default function Event() {
  const { state } = useLocation();

  return (
    <div>
      <Navbar title={"RedLobby"} />
      <Paper
        elevation={8}
        sx={{
          display: "flex",
          width: "1000px",
          height: "500px",
          marginTop: "3em",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div
          style={{
            backgroundColor: "grey",
            overflow: "hidden",
            flex: 1,
          }}
        >
          <img
            src={`http://localhost:3001/${state.image}`}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div
          style={{
            flex: 1,
            padding: "20px 20px 0 20px",
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: "20px" }}>
            {state.name}
          </Typography>
          <Typography variant="subtitle">{state.description}</Typography>
          <Box
            sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}
          >
            <AttachMoneyIcon />
            <Typography variant="subtitle">Fees : RM {state.fee}</Typography>
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}
          >
            <BusinessIcon /> &nbsp;
            <Typography variant="subtitle">
              Organizer : {state.organizer}
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}
          >
            <DateRangeIcon /> &nbsp;
            <Typography variant="subtitle">
              Start Date : {formatdate(state.startDate).fdate}{" "}
              {formatdate(state.startDate).fullTime} (UTC)
            </Typography>
          </Box>

          <Box
            sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}
          >
            <DateRangeIcon /> &nbsp;
            <Typography variant="subtitle">
              End Date : {formatdate(state.endDate).fdate}{" "}
              {formatdate(state.endDate).fullTime} (UTC)
            </Typography>
          </Box>

          <Box
            sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}
          >
            <PlaceIcon /> &nbsp;
            <Typography variant="subtitle">
              Location : {state.location}
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}
          >
            <PeopleAltIcon /> &nbsp;
            <Typography variant="subtitle">
              Seats : {state.numberOfParticipants}
            </Typography>
          </Box>
          <br />
          <Button>Register Now!</Button>
        </div>
      </Paper>
    </div>
  );
}
