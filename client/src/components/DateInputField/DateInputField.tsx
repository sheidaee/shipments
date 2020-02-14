import React, {useState} from "react";
import moment from "moment";
import { DateInput, TimePrecision } from "@blueprintjs/datetime";

import { IProps } from "./types";
import { withMemo } from "../../utilities/utility";

function DateInputField({ placeholder, name, value, callback, formatNumber = 2 }: IProps) {
  const [date, setDate] = useState(value);
  
  const handleChange = (v:any) => {
    if (callback) {
      callback(name, v);
    }

    setDate(v);
  }
  
  const FORMATS = [
    {
      formatDate: (date: any) => date.toLocaleString(),
      placeholder,
      parseDate: (str: string) => new Date(str)
    },
    momentFormatter("MM/DD/YYYY"),
    momentFormatter("YYYY-MM-DD"),
    momentFormatter("YYYY-MM-DD HH:mm", true),
    momentFormatter("YYYY-MM-DD HH:mm:ss", true)
  ];

 
  return (
    <DateInput
      {...FORMATS[formatNumber]}
      minDate={
        new Date(
          moment()
            .subtract(90, "years")
            .format()
        )
      }
      onChange={handleChange}
      value={date}
    />
  );
}

const momentFormatter = (format: string, activeTime?: boolean) => {
  return {
    formatDate: (date: any) => moment(date).format(format),
    parseDate: (str: string) => moment(str, format).toDate(),
    placeholder: format,
    timePrecision: activeTime ? TimePrecision.MINUTE : undefined
  };
};

export default withMemo(DateInputField, ["value"]);
