import { Box, Input, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { MenuItem } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { FormControl } from "@mui/material";
import { Modal } from "@mui/material";
import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import DateTimePickerComponent from "../DateTimePickerComponent/DateTimePickerComponent";

export default function EventManagementForm({
  open,
  handleClose,
  eventDetails,
  type,
  onNameChange,
  onDescriptionChange,
  onStatusChange,
  onNoOfParticipantsChange,
  onFeeChange,
  onOrganizerChange,
  onLocationChange,
  onImageChange,
  onTagsChange,
  onStartDateChange,
  onEndDateChange,
  onSubmit,
}) {
  const tagsOptions = ["event", "technology", "social", "dinner", "tournament"];

  const handleNameChange = (event) => {
    const newName = event.target.value;
    onNameChange(newName);
  };

  const handleDescriptionChange = (event) => {
    const newDescription = event.target.value;
    onDescriptionChange(newDescription);
  };

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    onStatusChange(newStatus);
  };

  const handleNoOfParticipantsChange = (event) => {
    const newNoOfParticipants = event.target.value;
    onNoOfParticipantsChange(newNoOfParticipants);
  };

  const handleFeeChange = (event) => {
    const newFee = event.target.value;
    onFeeChange(newFee);
  };

  const handleOrganizerChange = (event) => {
    const newOrganizer = event.target.value;
    onOrganizerChange(newOrganizer);
  };

  const handleLocationChange = (event) => {
    const newLocation = event.target.value;
    onLocationChange(newLocation);
  };

  const handleImageChange = (event) => {
    const newImage = event.target.files[0];
    console.log(event.target.files[0]);
    onImageChange(newImage);
  };

  const handleTagsChange = (event, values) => {
    const newTags = values;
    onTagsChange(newTags);
  };

  const handleSubmit = () => {
    onSubmit(eventDetails);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 900,
          display: "flex",
          gap: "30px",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            width: "50%",
          }}
        >
          <FormControl sx={{ width: "100%" }}>
            {/* Name */}
            <TextField
              required
              label="Name"
              defaultValue=""
              value={eventDetails?.name}
              onChange={handleNameChange}
              sx={{ width: "100%", marginBottom: "20px" }}
            />
            {/* Description */}
            <TextField
              required
              label="Description"
              multiline
              maxRows={3}
              defaultValue=""
              value={eventDetails?.description}
              onChange={handleDescriptionChange}
              sx={{ width: "auto" }}
            />

            {/* Start Date */}
            {/* Start Time */}
            <DateTimePickerComponent
              label={"Start Date and Time"}
              value={eventDetails?.startDate}
              onDateChange={onStartDateChange}
            />
            {/* End Date */}
            {/* End Time */}
            <DateTimePickerComponent
              label={"End Date and Time"}
              value={eventDetails?.endDate}
              onDateChange={onEndDateChange}
            />

            {/* Fees */}
            <TextField
              sx={{ margin: "20px 0 0px 0" }}
              required
              id="outlined-required"
              type="number"
              label="Fees"
              value={eventDetails?.fee}
              onChange={handleFeeChange}
            />
            {/* No of Participants */}
            <TextField
              sx={{ margin: "20px 0 0px 0" }}
              required
              id="outlined-required"
              type="number"
              label="Number of Participants"
              value={eventDetails?.numberOfParticipants}
              onChange={handleNoOfParticipantsChange}
            />
            {/* Organizer */}
            <TextField
              sx={{ margin: "20px 0 0px 0" }}
              required
              id="outlined-required"
              type="text"
              label="Organizer"
              value={eventDetails?.organizer}
              onChange={handleOrganizerChange}
            />
            {/* Location */}
            <TextField
              sx={{ margin: "20px 0 0px 0" }}
              required
              id="outlined-required"
              type="text"
              label="Location"
              value={eventDetails?.location}
              onChange={handleLocationChange}
            />
          </FormControl>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            width: "50%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              justifyContent: "space-between",
            }}
          >
            {/* Status and Tags */}
            <FormControl sx={{}}>
              <InputLabel id="demo-simple-select-filled-label">
                Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={eventDetails?.status}
                label="Status"
                onChange={handleStatusChange}
                // defaultValue={"Coming Soon"}
              >
                <MenuItem value={"Coming Soon"}>Coming Soon</MenuItem>
                <MenuItem value={"Ongoing"}>Ongoing</MenuItem>
                <MenuItem value={"Completed"}>Completed</MenuItem>
                <MenuItem value={"Cancelled"}>Cancelled</MenuItem>
              </Select>
              <Autocomplete
                multiple
                id="tags-outlined"
                options={tagsOptions}
                getOptionLabel={(option) => option}
                defaultValue={type === "EDIT" ? eventDetails.tags : ["event"]}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField {...params} label="Tags" placeholder="" />
                )}
                sx={{ margin: "20px 0 20px 0" }}
                onChange={handleTagsChange}
              />
              <label htmlFor="file"> Upload Image</label>
              <Input
                type="file"
                name="file"
                onChange={handleImageChange}
              ></Input>

              <img
                src={
                  eventDetails?.image
                    ? "http://localhost:3001/" + eventDetails?.image
                    : eventDetails?.image
                }
                alt=""
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl sx={{ width: "100%" }}>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                onClick={handleSubmit}
              >
                SUBMIT
              </Button>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
