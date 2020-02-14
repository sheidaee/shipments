import React from "react";
import { useSelector, useDispatch } from "../../../../hooks/react-redux.hooks";
import { Formik, FormikActions } from "formik";
import wait from "waait";

import { shipmentOperations } from "../../";
import DialogBox from "../../../../components/DialogBox";
import { validate } from "../../../../utilities/utility";
import { FormValues, IFormProps } from "./types";

import { IDialogProps, BtnType } from "../../../../components/DialogBox/types";

import AddShipmentContent from "./AddShipmentContent";
import Styles from "./AddShipment.module.scss";

const dialogProps: IDialogProps = {
  btn: {
    btnType: BtnType.BUTTON,
    btnProps: {
      className: "",
      icon: "add",
      text: "Add shipment"
    }
  },
  dialog: {
    icon: "inbox",
    title: "Add shipment"
  },
  operationBtn: true
};

export function AddShipment(props: IFormProps) {
  const dispatch = useDispatch();
  const loading = useSelector(({ app }: any) => app.loading);

  const addShipmentHandler = async (
    formValues: FormValues,
    actions: FormikActions<FormValues>
  ) => {
    const { name, origin, destination, assignee, orderStatus, pickupDate, deliveryDate } = formValues;
        
    dispatch(
      await shipmentOperations.addShipment({
        name,
        origin,
        destination,
        assignee,
        orderStatus,
        pickupDate, 
        deliveryDate
      })
    );

    await wait(500);

    actions.setSubmitting(false);
    await props.dialogCloseHandler();
  };

  const initialValues = {
    name: "",
    origin: "",
    destination: "",
    assignee: "",
    orderStatus: "",
    pickupDate: null, 
    deliveryDate: null,
  };

  return (
    <div className={Styles.Shipment}>
      <Formik
        initialValues={initialValues}
        validate={validate}        
        onSubmit={addShipmentHandler}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue
        }) => (
          <AddShipmentContent
            {...{
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue
            }}
            {...props}
            loading={loading as boolean}
          />
        )}
      </Formik>
    </div>
  );
}

export default DialogBox(AddShipment, dialogProps);
