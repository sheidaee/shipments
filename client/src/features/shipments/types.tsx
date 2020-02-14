// Use `enum`s for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
export enum shipmentActionNameTypes {
  ADD_SHIPMENT_COMPLETED = "@@customer/ADD_SHIPMENT_COMPLETED",
  EDIT_SHIPMENT_COMPLETED = "@@customer/EDIT_SHIPMENT_COMPLETED",
  DELETE_SHIPMENT_COMPLETED = "@@customer/DELETE_SHIPMENT_COMPLETED",
  FETCH_INIT = "@@customer/FETCH_LIST",
  FETCH_LIST_COMPLETED = "@@customer/FETCH_LIST_COMPLETED",
  SEARCH_LIST_COMPLETED = "@@customer/SEARCH_LIST_COMPLETED"
}

interface AddCustomerCompletedAction {
  type: typeof shipmentActionNameTypes.ADD_SHIPMENT_COMPLETED;
  payload: { shipment: ShipmentShape };
}

interface DeleteCustomerCompletedAction {
  type: typeof shipmentActionNameTypes.DELETE_SHIPMENT_COMPLETED;
  payload: { id: number };
}

interface SearchListCompletedAction {
  type: typeof shipmentActionNameTypes.SEARCH_LIST_COMPLETED;
  payload: { shipments: ShipmentObject[] };
}

interface EditCustomerCompletedAction {
  type: typeof shipmentActionNameTypes.EDIT_SHIPMENT_COMPLETED;
  payload: { shipment: ShipmentObject };
}

interface FetchListCompletedAction {
  type: typeof shipmentActionNameTypes.FETCH_LIST_COMPLETED;
  payload: { records: ShipmentShape[] };
}

export type ShipmentShape = {
  _id: number;
  name: string;
  origin: string;
  destination: string;
  assignee: string;
  orderStatus: string;
  pickupDate: string;
  deliveryDate: string;
};

export type ShipmentObject = {
  _id: number;
  name: string;
  assignee: string | number;
  pickupDate: string;
  deliveryDate: string;
};


export interface ShipmentState {
  readonly shipments: ShipmentObject[] | null;
  readonly searchedRecords: [] | null;
  readonly loading: boolean;
  readonly didSearch: boolean;
}

export interface SearchShipment {
  shipmentRecords: ShipmentObject[] | null;
  name: string; 
  origin: string; 
  destination: string; 
  orderStatus: string; 
  pickupDate: string; 
  deliveryDate: string;  
}

export type ShipmentActionTypes =
  | AddCustomerCompletedAction
  | DeleteCustomerCompletedAction
  | SearchListCompletedAction
  | EditCustomerCompletedAction
  | FetchListCompletedAction;
