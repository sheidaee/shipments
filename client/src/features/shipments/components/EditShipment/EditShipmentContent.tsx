import React, { useContext } from "react";
import { Field } from "formik";
import { Button, Intent } from "@blueprintjs/core";

import {
  RenderText,
  RenderSelect,
  RenderDate,
} from "../../../../components/Form";
import { assigneeOptionsItems } from '../../../../utilities/constants';
import Fieldset from "../../../../components/Fieldset";
import { AuthContext } from "../../../../context/AuthProvider";

import { PropsWithFormik } from "./types";
import Styles from "./EditShipment.module.scss";

const EditShipmentContent: React.FC<PropsWithFormik> = ({
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  loading,
  dialogCloseHandler,
  setFieldValue
}) => {
  const { hasRole }: any = useContext(AuthContext);

  let formFields: any = [    
    {
      name: "pickupDate",
      label: "Pickup Date",
      component: RenderDate,
      callback: setFieldValue,
      formatNumber: 3,
    },
    {
      name: "deliveryDate",
      label: "delivery Date",
      component: RenderDate,
      callback: setFieldValue,
      formatNumber: 3,
    }
  ];

  if (hasRole('ADMIN')) {
    formFields = [{
      name: "name", 
      label: "Name", 
      component: RenderText, 
    },
    {
      name: "assignee",
      label: "Assignee",
      component: RenderSelect,
      items: assigneeOptionsItems,
    }].concat(formFields);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Fieldset disabled={isSubmitting} aria-busy={isSubmitting}>        
        <div className={Styles.row}>
          {
            formFields.map( ({ name, label, component, callback, formatNumber, items }: any) => (
              <div key={name}>
                  <Field                   
                    name={name}
                    label={label}
                    component={component}
                    captionClassName={Styles.formCaption}
                    dataClassName={Styles.formData}
                    callback={callback}
                    formatNumber={formatNumber}
                    items={items}
                  />
              </div>            
            ))
          }
        </div>
        <div className={`pt-dialog-footer-actions ${Styles.actionBar}`}>
          <Button text="close" onClick={dialogCloseHandler} />
          <Button
            text="save"
            type="submit"
            intent={Intent.PRIMARY}
            disabled={isSubmitting || loading}
          />
        </div>
      </Fieldset>
    </form>
  );
};

export default EditShipmentContent;
