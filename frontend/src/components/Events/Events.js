import { Box, Button, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../EventCard/EventCard";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadMoreButtonValue, setLoadMoreButtonValue] = useState("");

  const getEvents = async () => {
    setLoading(true);
    try {
      let response = await axios.get("http://localhost:3001/event", {
        params: {
          page: currPage,
          limit: 6,
        },
      });
      setEvents((prevEvents) => [...prevEvents, ...response.data]);
      console.log(response.data);
      if (response.data.length > 0) {
        setCurrPage((prevPage) => prevPage + 1);
        setLoadMoreButtonValue("Load More");
      } else {
        setLoadMoreButtonValue("Oops, you have reached the end of the page.");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getEvents();
  }, []);

  const handleLoadMore = () => {
    getEvents();
  };

  return (
    <Container maxWidth="lg">
      <Grid
        container
        rowSpacing={2}
        columnSpacing={2}
        sx={{ marginTop: "2em" }}
      >
        {events.length ? (
          <>
            {events.map((event) => (
              <>
                <Grid item xs={12} sm={6} md={4} sx={{ cursor: "pointer" }}>
                  <EventCard eventDetails={event} />
                </Grid>
              </>
            ))}
          </>
        ) : (
          <p>No events detected</p>
        )}

        {loading && <p>Loading...</p>}
      </Grid>

      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <Button onClick={handleLoadMore}>{loadMoreButtonValue} </Button>
      </Box>
    </Container>
  );
}
