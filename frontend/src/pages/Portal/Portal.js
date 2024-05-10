import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Box, TableCell, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { TableContainer } from "@mui/material";
import { Table } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableRow } from "@mui/material";
import { Button } from "@mui/material";
import { TableBody } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import EventManagementForm from "../../components/EventManagementForm/EventManagementForm";
import client from "../../utils/build-client";
import { useNavigate } from "react-router-dom";
import formatdate from "../../utils/format-date";

export default function Portal() {
  const [currentDetails, setCurrentDetails] = useState(null);
  const [type, setType] = useState(null);
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [currPage, setCurrPage] = useState(1);
  const handleEventManagementFormOpen = () => setOpen(true);
  const handleEventManagementFormClose = () => setOpen(false);

  // filter by status state
  const [filterStatus, setFilterByStatus] = useState("");
  const [display, setDisplay] = useState(null);
  const navigate = useNavigate();
  // Form State
  const handleNameChange = (newName) => {
    setCurrentDetails({ ...currentDetails, name: newName });
  };
  const handleDescriptionChange = (newDescription) => {
    setCurrentDetails({ ...currentDetails, description: newDescription });
  };
  const handleStatusChange = (newStatus) => {
    setCurrentDetails({ ...currentDetails, status: newStatus });
  };
  const handleNoOfParticipants = (newNoOfParticipants) => {
    setCurrentDetails({
      ...currentDetails,
      numberOfParticipants: newNoOfParticipants,
    });
  };
  const handleFee = (newFee) => {
    setCurrentDetails({ ...currentDetails, fee: newFee });
  };
  const handleOrganizerChange = (newOrganizer) => {
    setCurrentDetails({ ...currentDetails, organizer: newOrganizer });
  };
  const handleLocationChange = (newLocation) => {
    setCurrentDetails({ ...currentDetails, location: newLocation });
  };
  const handleImageChange = (newImage) => {
    setCurrentDetails({ ...currentDetails, image: newImage });
  };
  const handleTagsChange = (newTags) => {
    setCurrentDetails({ ...currentDetails, tags: [...newTags] });
  };
  const handleStartDateChange = (newStartDate) => {
    setCurrentDetails({ ...currentDetails, startDate: newStartDate });
  };
  const handleEndDateChange = (newEndDate) => {
    setCurrentDetails({ ...currentDetails, endDate: newEndDate });
  };

  const handleSubmit = async () => {
    const formDataObject = new FormData();

    for (const key in currentDetails) {
      formDataObject.append(key, currentDetails[key]);
    }
    try {
      if (type === "EDIT") {
        let response = await client.put(
          "event/" + currentDetails._id,
          formDataObject,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        let response = await client.post("event", formDataObject, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      let response = await client.delete("event/" + id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await client.get("event");
        setEvents(response.data);
        setDisplay(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getEvents();
  }, []);

  useEffect(() => {
    if (filterStatus) {
      let displays = events.filter((x) => x.status === filterStatus);
      setDisplay(displays);
    } else {
      setDisplay(events);
    }
  }, [filterStatus]);

  useEffect(() => {
    const checkIsAdmin = async () => {
      try {
        let res = await client.post("auth/checkisadmin");
        console.log(res);
        // if(res.data)
      } catch (error) {
        console.log(error);
        navigate("/");
      }
    };
    checkIsAdmin();
  }, []);

  return (
    <div>
      <Navbar title="RedLobby" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <h2>Events</h2>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Typography variant="h6"> Filter By Status</Typography>
          <Button onClick={() => setFilterByStatus("")}>ALL</Button>
          <Button onClick={() => setFilterByStatus("Coming Soon")}>
            COMING SOON
          </Button>
          <Button onClick={() => setFilterByStatus("Ongoing")}>ONGOING</Button>
          <Button onClick={() => setFilterByStatus("Completed")}>
            COMPLETED
          </Button>
          <Button onClick={() => setFilterByStatus("Cancelled")}>
            CANCELLED
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        ></Box>
        <>
          <Grid
            container
            spacing={1}
            sx={{
              justifyContent: "center",
            }}
          >
            <Grid item md={10} xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "center",
                }}
              >
                <Button
                  onClick={() => {
                    setType("CREATE");
                    setCurrentDetails({ tags: "event" });
                    handleEventManagementFormOpen();
                  }}
                >
                  Create New &nbsp; <ControlPointIcon />
                </Button>
              </Box>
            </Grid>
            <Grid item md={10} xs={12}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Image </TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Seats Available</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {display?.map((x) => (
                      <TableRow>
                        <TableCell>
                          <img
                            src={`http://localhost:3001/${x.image}`}
                            width={50}
                            height={50}
                          />
                        </TableCell>
                        <TableCell>{x.name}</TableCell>
                        <TableCell>{x.status || `Completed`}</TableCell>
                        <TableCell>{x.numberOfParticipants}</TableCell>
                        <TableCell>
                          {formatdate(x.startDate).fdate} -{" "}
                          {formatdate(x.endDate).fdate}
                        </TableCell>
                        <TableCell align="right">
                          RM {Number(x.fee).toFixed(2)}
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            variant="contained"
                            color="primary"
                            sx={{ marginRight: "10px" }}
                            onClick={() => {
                              setType("EDIT");
                              setCurrentDetails(x);
                              handleEventManagementFormOpen();
                            }}
                          >
                            <EditIcon />
                          </Button>

                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleDelete(x._id)}
                          >
                            <DeleteIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
          <EventManagementForm
            open={open}
            handleClose={handleEventManagementFormClose}
            eventDetails={currentDetails}
            type={type}
            onNameChange={handleNameChange}
            onDescriptionChange={handleDescriptionChange}
            onStatusChange={handleStatusChange}
            onNoOfParticipantsChange={handleNoOfParticipants}
            onFeeChange={handleFee}
            onOrganizerChange={handleOrganizerChange}
            onLocationChange={handleLocationChange}
            onImageChange={handleImageChange}
            onTagsChange={handleTagsChange}
            onStartDateChange={handleStartDateChange}
            onEndDateChange={handleEndDateChange}
            onSubmit={handleSubmit}
          />
        </>
      </div>
    </div>
  );
}
