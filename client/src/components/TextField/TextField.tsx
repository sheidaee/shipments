import React from "react";
import { Classes } from "@blueprintjs/core";

import { IProps } from "./types";
import { withMemo } from "../../utilities/utility";

function TextField({ name, value, onChange, type = "text" }: IProps) {
  return (
    <input
      className={Classes.INPUT}
      dir="auto"
      {...{ name, value, onChange, type }}
    />
  );
}

export default withMemo(TextField, ["value"]);
