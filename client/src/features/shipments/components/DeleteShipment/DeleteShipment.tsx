import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Intent } from "@blueprintjs/core";

import DialogBox from "../../../../components/DialogBox";
import { shipmentOperations } from "../../";
import { IDialogProps, BtnType } from "../../../../components/DialogBox/types";
import { IProps } from "./types";

import Styles from "./DeleteShipment.module.scss";

const dialogProps: IDialogProps = {
  btn: {
    btnType: BtnType.ICON,
    btnProps: {
      icon: "cross",
      className: Styles.DeleteBtn
    }
  },
  dialog: {
    icon: "inbox",
    title: "Delete Shipment"
  },
  operationBtn: true
};

function DeleteShipment(props: IProps) {
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();

  const DeleteShipmentHandler = async () => {
    setSubmitting(true);

    dispatch(await shipmentOperations.deleteShipment(props.data._id));

    await props.dialogCloseHandler();
  };

  return (
    <div className={Styles.DeleteShipment}>
      <div className={Styles.row}>
        <div>
          <p>Are you sure about deleting this record?</p>
        </div>
      </div>
      <div className="pt-dialog-footer">
        <div className={`pt-dialog-footer-actions ${Styles.actionBar}`}>
          <Button text="No" onClick={props.dialogCloseHandler} />
          <Button
            text="Yes"
            intent={Intent.PRIMARY}
            onClick={DeleteShipmentHandler}
            disabled={submitting === true}
          />
        </div>
      </div>
    </div>
  );
}

export default DialogBox(DeleteShipment, dialogProps);
