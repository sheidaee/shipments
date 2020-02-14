import { action } from "typesafe-actions";
import {
  shipmentActionNameTypes,
  ShipmentShape,
  ShipmentActionTypes,
  ShipmentObject
} from "./types";

// Here we use the `action` helper function provided by `typesafe-actions`.
// This library provides really useful helpers for writing Redux actions in a type-safe manner.
// For more info: https://github.com/piotrwitek/typesafe-actions
export const fetchInit = () =>
  action(shipmentActionNameTypes.FETCH_INIT, { loading: true });


// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly as well.
export const fetchListComplete = (
  records: ShipmentShape[]
): ShipmentActionTypes =>
  action(shipmentActionNameTypes.FETCH_LIST_COMPLETED, { records });

export const editShipmentComplete = (shipment: ShipmentObject): ShipmentActionTypes =>
  action(shipmentActionNameTypes.EDIT_SHIPMENT_COMPLETED, {
    shipment
  });

export const addShipmentComplete = (
  shipment: ShipmentShape
): ShipmentActionTypes =>
  action(shipmentActionNameTypes.ADD_SHIPMENT_COMPLETED, { shipment });

export const deleteShipmentComplete = (
  id: number
): ShipmentActionTypes =>
  action(shipmentActionNameTypes.DELETE_SHIPMENT_COMPLETED, { id });

export const searchListComplete = (
  shipments: ShipmentObject[]
): ShipmentActionTypes =>
  action(shipmentActionNameTypes.SEARCH_LIST_COMPLETED, { shipments });
