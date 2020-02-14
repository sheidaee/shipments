import { ReactNode } from "react";

export interface FormValues {
  _id?: string;
  name?: string;
  origin?: string;
  destination?: string;
  assignee?: string;
  orderStatus?: string;
  pickupDate?: null | Date;
  deliveryDate?: null | Date;
  loading?: boolean;
}

export interface fetchShipmentP {
  isAdmin: boolean;
  user: any;
}

export type AddShipmentP = Omit<FormValues, "id">;

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
}

export type PropsWithFormik = IFormProps & IFormikProps;
