import React, { useContext } from "react";
import { useSelector } from "../../../../hooks/react-redux.hooks";
import { Formik, FormikActions } from "formik";
import wait from "waait";

import DialogBox from "../../../../components/DialogBox";
import { authValidate } from "../../../../utilities/utility";
import { FormValues, IFormProps } from "./types";
import { IDialogProps, BtnType } from "../../../../components/DialogBox/types";
import SignInContent from "./SignInContent";
import { AuthContext } from "../../../../context/AuthProvider";

import Styles from "./SignIn.module.scss";

const dialogProps: IDialogProps = {
  btn: {
    btnType: BtnType.BUTTON,
    btnProps: {
      className: "",
      icon: "add",
      text: "Sign In"  
    }
  },
  dialog: {
    icon: "log-in",
    title: "Sign In"
  },
  operationBtn: true
};

export function SignIn(props: IFormProps) {
  const loading = useSelector(({ app }: any) => app.loading);
  const { signIn, loggedIn, authMessage }: any = useContext(AuthContext);

  const SingInHandler = async (
    formValues: FormValues,
    actions: FormikActions<FormValues>
  ) => {
    await signIn(formValues);

    if (!loggedIn) {
      actions.setSubmitting(false);
      return;
    }

    await wait(500);

    actions.setSubmitting(false);
    await props.dialogCloseHandler();
  };

  const initialValues = {
    username: "",
    password: "",
  };


  return (
    <div className={Styles.SignIn}>
      <Formik
        initialValues={initialValues}
        validate={authValidate}        
        onSubmit={SingInHandler}
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
          <SignInContent
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
            authMessage={authMessage}
          />
        )}
      </Formik>
    </div>
  );
}

export default DialogBox(SignIn, dialogProps);
