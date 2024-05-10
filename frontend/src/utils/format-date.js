const months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const formatdate = (fulldate) => {
  fulldate = new Date(fulldate);
  let year = fulldate.getFullYear();
  let month = fulldate.getMonth();
  month = months[month];
  let date = fulldate.getDate();
  let date1 = fulldate.getDay();

  let hours = fulldate.getHours().toString();
  let minutes = fulldate.getMinutes().toString();

  if (hours.toString().length < 2) {
    hours = "0" + hours.toString();
  }
  if (minutes.length < 2) {
    minutes = "0" + minutes;
  }

  let meridiem;
  if (hours < 12) {
    meridiem = "AM";
  } else {
    meridiem = "PM";
  }

  let fdate = date + " " + month + " " + year + " (" + day[date1] + ")";

  let fullTime = hours + ":" + minutes + " " + meridiem;
  return { fdate, fullTime };
};

export default formatdate;
