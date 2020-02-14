import React from "react";

import { IProps } from "./types";

import Styles from "./ShipmentDetail.module.scss";

const ShipmentDetail = ({ caption, value }: IProps) => {
  return (
    <div>
      <div className={Styles.formCaption}>{caption}:</div>
      <div className={Styles.data}>{value}</div>
    </div>
  );
};

export default ShipmentDetail;
