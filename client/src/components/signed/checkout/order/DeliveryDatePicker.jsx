import React, { useState, useEffect } from "react";
import axios from "axios";
import { domain } from "../../../../config";
import { Badge } from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

export default function DeliveryDatePicker({ selectedDate, handleDateChange }) {
  const [selectedDays, setSelectedDays] = useState([new Date("2021,06,18")]);

  useEffect(() => {
    // get unavailable dates
    let didCancel = false;
    const getUnavailableDates = async () => {
      const res = await axios.get(`${domain}/orders`);
      setSelectedDays(res.data.unavailableDates);
    };
    getUnavailableDates();
    return () => {
      didCancel = true;
    };
  }, []);

  function disableUnavailableDates(date) {
    console.log(selectedDays.includes(date.toDateString()));
    console.log(selectedDays, date.toDateString());
    return selectedDays.includes(date.toDateString());
  }
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        label="Choose Delivery Date"
        value={selectedDate}
        onChange={handleDateChange}
        disablePast={true}
        shouldDisableDate={disableUnavailableDates}
        renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => {
          return <Badge>{dayComponent} </Badge>;
        }}
      />
    </MuiPickersUtilsProvider>
  );
}
