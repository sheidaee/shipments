import React from "react";
import { Classes } from "@blueprintjs/core";

import { classNames } from "../../utilities";
import { SelectItem, IProps } from "./types";

import Styles from "./SelectField.module.scss";

function SelectField(props: IProps) {
  const { name, items, value, ...rest } = props;
  
  return (
    <div className={classNames(Classes.INPUT, Styles.fillSelect)}>
      <select name={name} value={value === null ? "..." : value} {...rest}>
        <option value="...">...</option>
        {items.map((item: SelectItem) => (
          <option value={item.value} key={item.value}>
            {item.caption}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectField;
