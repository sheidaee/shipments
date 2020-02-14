import React, { useState, useContext } from "react";
import { Button, Intent } from "@blueprintjs/core";

import DialogBox from "../../../../components/DialogBox";
import { IDialogProps, BtnType } from "../../../../components/DialogBox/types";
import { IProps } from "./types";
import { AuthContext } from "../../../../context/AuthProvider";

import Styles from "./SignOut.module.scss";

const dialogProps: IDialogProps = {
  btn: {
    btnType: BtnType.BUTTON,
    btnProps: {
      className: "",
      icon: "cross",
      text: "Sign Out"  
    }
  },
  dialog: {
    icon: "log-out",
    title: "Sign Out"
  },
  operationBtn: true
};

function SignOut(props: IProps) {
  const { logOut }: any = useContext(AuthContext);
  const [submitting, setSubmitting] = useState(false);

  const SignOutHandler = async () => {
    setSubmitting(true);

    logOut()

    await props.dialogCloseHandler();
  };

  return (
    <div className={Styles.DeleteShipment}>
      <div className={Styles.row}>
        <div>
          <p>Are you sure about sign out from your account?</p>
        </div>
      </div>
      <div className="pt-dialog-footer">
        <div className={`pt-dialog-footer-actions ${Styles.actionBar}`}>
          <Button text="No" onClick={props.dialogCloseHandler} />
          <Button
            text="Yes"
            intent={Intent.PRIMARY}
            onClick={SignOutHandler}
            disabled={submitting === true}
          />
        </div>
      </div>
    </div>
  );
}

export default DialogBox(SignOut, dialogProps);
