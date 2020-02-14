import React from "react";
import { Field } from "formik";
import { Button, Intent } from "@blueprintjs/core";

import {
  RenderText,
  RenderSelect,
  RenderDate,
} from "../../../../components/Form";
import Fieldset from "../../../../components/Fieldset/Fieldset";

import { assigneeOptionsItems, orderStatusItems } from '../../../../utilities/constants';
import { PropsWithFormik } from "./types";
import Styles from "./AddShipment.module.scss";

const AddShipmentContent: React.FC<PropsWithFormik> = ({
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  setFieldValue,
  loading,
  dialogCloseHandler
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Fieldset disabled={isSubmitting} aria-busy={isSubmitting}>
        <div className={Styles.row}>
          <div>
            <Field
              name="name"
              label="Name"
              component={RenderText}
              captionClassName={Styles.formCaption}
              dataClassName={Styles.formData}
            />
          </div>
        </div>
        <div className={Styles.row}>
          <div>
            <Field
              name="origin"
              label="Origin"
              component={RenderText}
              captionClassName={Styles.formCaption}
              dataClassName={Styles.formData}
            />
          </div>
          <div>
            <Field
              name="destination"
              label="Destination"
              component={RenderText}
              captionClassName={Styles.formCaption}
              dataClassName={Styles.formData}
            />
          </div>
        </div>
        <div className={Styles.row}>
          <div>
            <Field
              name="assignee"
              label="Assignee"
              captionClassName={Styles.formCaption}
              dataClassName={Styles.formData}
              component={RenderSelect}
              items={assigneeOptionsItems}
            />
          </div>
          <div>
            <Field
              name="orderStatus"
              label="Order Status"
              captionClassName={Styles.formCaption}
              dataClassName={Styles.formData}
              component={RenderSelect}
              items={orderStatusItems}
            />
          </div>
        </div>
        <div className={Styles.row}>
          <div>
            <Field
              name="pickupDate"
              label="Pickup Date"
              captionClassName={Styles.formCaption}
              dataClassName={Styles.formData}
              component={RenderDate}
              callback={setFieldValue}
              formatNumber={3}
            />
          </div>
          <div>
            <Field
              name="deliveryDate"
              label="delivery Date"
              captionClassName={Styles.formCaption}
              dataClassName={Styles.formData}
              component={RenderDate}
              callback={setFieldValue}
              formatNumber={3}
            />
          </div>
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

export default AddShipmentContent;
