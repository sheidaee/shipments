import React from "react";
import { Field } from "formik";
import { Button, Intent } from "@blueprintjs/core";

import {
  RenderText,
} from "../../../../components/Form";
import Fieldset from "../../../../components/Fieldset/Fieldset";
import { PropsWithFormik } from "./types";

import Styles from "./SignIn.module.scss";

const SignInContent: React.FC<PropsWithFormik> = ({
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  setFieldValue,
  loading,
  dialogCloseHandler,
  authMessage
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Fieldset disabled={isSubmitting} aria-busy={isSubmitting}>  
        <div className={Styles.row}>
          <h3 className={Styles.message}>{authMessage}</h3>          
        </div>      
        <div className={Styles.row}>
          <div>
            <Field
              name="username"
              label="User Name"
              component={RenderText}
              captionClassName={Styles.formCaption}
              dataClassName={Styles.formData}
            />            
          </div>
        </div>
        <div className={Styles.row}>
          <div>
            <Field
              name="password"
              label="Password"
              type="password"
              component={RenderText}
              captionClassName={Styles.formCaption}
              dataClassName={Styles.formData}
            />
          </div>
        </div>
        <div className={Styles.row}>
          <div>
            <p><i>Username: admin | biker[1-10]</i></p>
            <p><i>password: 1234</i></p>
          </div>
        </div>
        <div className={`pt-dialog-footer-actions ${Styles.actionBar}`}>
          <Button text="close" onClick={dialogCloseHandler} />
          <Button
            text="sign in"
            type="submit"
            intent={Intent.PRIMARY}
            disabled={isSubmitting || loading}
          />
        </div>
      </Fieldset>
    </form>
  );
};

export default SignInContent;
