import { ShipmentObject } from "../../types";

export interface IProps {
  loading: boolean;
  didSearch: boolean;
  shipmentRecords: ShipmentObject[] | null;
  searchedRecords: ShipmentObject[] | null;
}
