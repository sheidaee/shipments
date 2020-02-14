import React from "react";

import { ISearchField } from "./types";
import Styles from "./SearchField.module.scss";

const SearchFieldC = ({
  name,
  caption,
  Field,
  value,
  handleChange,
  items,
  ...props
}: ISearchField) => {
  return (
    <div>
      <div className={Styles.formCaption}>{caption}</div>
      <div className={Styles.data}>
        <Field name={name} value={value} onChange={handleChange} items={items} {...props} />
      </div>
    </div>
  );
};

export default SearchFieldC;
