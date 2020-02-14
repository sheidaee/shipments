import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, FormikActions } from "formik";

import { shipmentOperations } from "../../";
import DialogBox from "../../../../components/DialogBox";
import { validate } from "../../../../utilities/utility";
import { IDialogProps, BtnType } from "../../../../components/DialogBox/types";

import Styles from "./EditShipment.module.scss";
import { FormValues, IFormProps } from "./types";
import EditShipmentContent from "./EditShipmentContent";

const dialogProps: IDialogProps = {
  btn: {
    btnType: BtnType.ICON,
    btnProps: {
      icon: "edit",
      className: Styles.EditBtn,
      text: "Edit shipment"
    }
  },
  dialog: {
    icon: "inbox",
    title: "Edit Shipment"
  },
  operationBtn: true
};

/**
 * Edit shipment form
 *
 */
export function EditShipment(props: IFormProps) {
  const dispatch = useDispatch();
  const loading = useSelector(({ app }: any) => app.loading);

  const { dialogCloseHandler, initialValues } = props;

  const editShipmentHandler = async (
    formValues: FormValues,
    actions: FormikActions<FormValues>
  ) => {
    const {
      _id,      
      name,
      assignee,
      pickupDate,
      deliveryDate      
    } = formValues;

    dispatch(
      await shipmentOperations.editShipment({        
        _id,        
        name,
        assignee,
        pickupDate,
        deliveryDate,
      })
    );

    setTimeout(async () => {
      actions.setSubmitting(false);
      await dialogCloseHandler();
    }, 500);
  };

  return (
    <div className={Styles.EditShipment}>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={editShipmentHandler}
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
          <EditShipmentContent
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

export default DialogBox(EditShipment, dialogProps);
