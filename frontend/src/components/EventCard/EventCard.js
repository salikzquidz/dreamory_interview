import { Button, Paper, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function EventCard({ eventDetails }) {
  const navigate = useNavigate();
  return (
    <Paper
      sx={{
        height: "400px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ height: "250px", backgroundColor: "grey" }}>
        <img
          src={`http://localhost:3001/` + eventDetails.image}
          alt={eventDetails.name}
          width="100%"
          height="100%"
        />
      </div>

      <div
        style={{
          height: "max",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          padding: "0px 10px 0px 10px",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Typography variant="caption">
            RM {eventDetails.fee.toFixed(2)}
          </Typography>
          <Typography variant="h6">{eventDetails.name}</Typography>
          <div
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
            }}
          >
            <Typography
              sx={{
                fontSize: "13px",
              }}
            >
              {eventDetails.description}
            </Typography>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="caption">{eventDetails.date}</Typography>
          <Button
            onClick={() =>
              navigate(`/event/${eventDetails._id}`, {
                state: eventDetails,
              })
            }
          >
            See Details
          </Button>
        </div>
      </div>
    </Paper>
  );
}
