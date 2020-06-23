import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";

export default function MaterialUIPickers(props) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(
    // new Date()
    0
  );

  const handleDateChange = (time) => {
    setSelectedDate(time);
    props.chosenTime(time);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <TimePicker
        style={{ marginBottom: 10, marginTop: 10 }}
        // margin="normal"
        // type='time'
        // id="time-picker"
        label={props.label}
        value={selectedDate}
        onChange={handleDateChange}
        // KeyboardButtonProps={{
        // "aria-label": "change time",
        // }}
      />
    </MuiPickersUtilsProvider>
  );
}
