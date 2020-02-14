import { memo, ReactNode } from "react";
import { Validate, AuthValidate } from "./types";

/**
 * update old object immutable
 *
 * @param {object} oldObject
 * @param {object} updatedProperties
 * @returns updated object
 */
export function updateObject(oldObject: object, updatedProperties: object) {
  return {
    ...oldObject,
    ...updatedProperties
  };
}

interface Roles {
  required: boolean;
  minLength?: number;
  maxLength?: number;
  isEmail?: boolean;
  isNumeric?: boolean;
}

/**
 * validating form field
 *
 * @export
 * @param {string|number} value
 * @param {object} rules
 * @returns true if is valid
 */
export function checkValidity(value: any, rules: Roles) {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
}

/**
 * Joining strings with space
 *
 * @param {array|string} class names
 * @param {array} rest
 *
 * @returns {string} class names
 */
export function classNames(classes: string[] | string, ...rest: string[]) {
  if (classes && classes.constructor === Array) {
    return (classes as string[]).join(" ");
  } else if (arguments[0] !== undefined) {
    return [...(classes as []), ...rest].join(" ");
  }

  return "";
}

export const validate = (values: Validate) => {
  const errors: any = {};

  if (!values.name) errors.name = "Please enter shipment name";

  if (!values.origin) errors.origin = "Please enter origin";

  if (!values.destination) errors.destination = "Please enter destination";

  // if (!values.assignee || values.assignee === "...")
  //   errors.assignee = "Please select assignee";

  if (!values.orderStatus || values.orderStatus === "...")
    errors.orderStatus = "Please select shipment order Status";

  return errors;
};

export const authValidate = (values: AuthValidate) => {
  const errors: any = {};

  if (!values.username) errors.username = "Please enter username";

  if (!values.password) errors.password = "Please enter password";

  return errors;
};


export const withMemo = (Component: ReactNode, checkedProps: any) => {
  function areEqual(prevProps: any, nextProps: any) {
    let isEqual = true;
    // for (let i = 0; i < checkedProps.length; i++) {
    //   const checkedProp = checkedProps[i];
    //   if (
    //     JSON.stringify(prevProps[checkedProp]) !==
    //     JSON.stringify(nextProps[checkedProp])
    //   ) {
    //     isEqual = false;
    //     break;
    //   }
    // }
    checkedProps.forEach((prop: string) => {
      if (prevProps[prop] !== nextProps[prop]) {
        isEqual = false;
        return;
      }
    });
    return isEqual;
  }

  return memo(Component as any, areEqual);
};
