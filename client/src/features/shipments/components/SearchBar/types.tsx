import { ShipmentObject } from "../../types";

export interface IProps {
  loading: boolean;
  shipmentRecords: ShipmentObject[] | null;
}

export type UseSearch = [
  string,
  string,
  string,
  string,
  string,
  string,
  (value: any, fieldName: string) => void
];
