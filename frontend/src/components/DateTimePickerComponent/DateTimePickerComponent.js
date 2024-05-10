import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Stack from "@mui/material/Stack";

import React, { useState } from "react";
import dayjs from "dayjs";
import { Button } from "@mui/material";

function Label({ componentName }) {
  const content = (
    <span>
      <strong>{componentName}</strong>
    </span>
  );

  return content;
}
export default function DateTimePickerComponent({
  label,
  value,
  onDateChange,
}) {
  const [date, setdate] = useState(null);
  console.log(date);
  console.log(date?.toISOString());

  const handleDate = (e) => {
    console.log(e);
    setdate(dayjs(new Date(e)));
    onDateChange(e.toISOString());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateTimePicker"]}>
        <DemoItem label={<Label componentName={label} />}>
          <DateTimePicker
            value={dayjs(new Date(value))}
            onChange={handleDate}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
