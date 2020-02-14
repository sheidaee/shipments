import React from "react";
import moment from "moment";

import DialogBox from "../../../../components/DialogBox";
import ShipmentDetail from "./ShipmentDetail/ShipmentDetail";
import { IDialogProps, BtnType } from "../../../../components/DialogBox/types";
import { IProps } from "./types";
import { assigneeOptionsItems, orderStatusItems } from "../../../../utilities/constants"

import Styles from "./ShipmentDetails.module.scss";

const dialogProps: IDialogProps = {
  btn: {
    btnType: BtnType.ICON,
    btnProps: {
      icon: "eye-open",
      className: Styles.ViewBtn
    }
  },
  dialog: {
    icon: "inbox",
    title: "Shipment details"
  },
  operationBtn: true
};

const ShipmentDetails = (props: IProps) => {
  const {
    name,
    origin,
    destination,
    assignee,
    orderStatus,
    pickupDate,
    deliveryDate
  } = props.data;

  const formattedAssigneeItems = assignee ? assigneeOptionsItems[parseInt(assignee) -1].caption : "---";
  const formattedOderStatus = orderStatus ? orderStatusItems[parseInt(orderStatus) -1].caption : "---";

  return (
    <div className={Styles.Shipment}>
      <div className={Styles.singleRow}>
        <ShipmentDetail caption="Name" value={name} />        
      </div>
      <div className={Styles.row}>
        <ShipmentDetail
          caption="Assignee"
          value={formattedAssigneeItems}
        />
        <ShipmentDetail
          caption="Order Status"
          value={formattedOderStatus}
        />
      </div>
      <div className={Styles.row}>
        <ShipmentDetail
          caption="Origin"
          value={origin}
        />
        <ShipmentDetail caption="Destination" value={destination} />
      </div>
      <div className={Styles.row}>
        <ShipmentDetail
          caption="Pickup Date"
          value={moment(pickupDate).format("YYYY/MM/DD HH:mm")}
        />
        <ShipmentDetail
          caption="Delivery Date"
          value={moment(deliveryDate).format("YYYY/MM/DD HH:mm")}
        />
      </div>      
    </div>
  );
};

export default DialogBox(ShipmentDetails, dialogProps);
