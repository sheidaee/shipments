import { ReactNode } from "react";

export interface FormValues {
  _id?: string;
  username?: string;
  password?: string;
  loading?: boolean;
}

export type SignInP = Omit<FormValues, "id">;

export interface IFormikProps {
  handleChange?: (e: React.ChangeEvent) => void;
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  handleBlur?: (e: React.FocusEvent) => void;
  setFieldValue?: (field: string, value: string) => void;
  values?: FormValues;
  options?: Array<{
    code: string;
    country: string;
  }>;
}

export interface IFormProps {
  dialogCloseHandler?: any;
  handleSubmitHandler?: any;
  children?: ReactNode;
  isSubmitting?: boolean;
  loading?: boolean;
  authMessage?: string;
}

export type PropsWithFormik = IFormProps & IFormikProps;
