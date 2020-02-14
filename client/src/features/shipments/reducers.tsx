import { shipmentActionNameTypes, ShipmentState } from "./types";

import { createReducer } from "../../store/utils";
import { updateObject } from "../../utilities";

/* customer record
{
  name: 'Jeans',
  origin: 'a',
  destination: 'b',
  assignee: '1',
  orderStatus: '1',
  pickupDate: '2020-01-31T20:30:00.000Z',
  deliveryDate: '2020-02-01T20:30:00.000Z'
*/

// Type-safe initialState!
const initialState: ShipmentState = {
  shipments: null,
  searchedRecords: null,
  loading: false,
  didSearch: false
};

const addShipmentCompleted = (state: any, action: any) => {
  return state.shipments
    ? updateObject(state, {
        shipments: [action.payload.shipment].concat(state.shipments),
        error: false,
        loading: false,
        didSearch: false
      })
    : updateObject(state, {
        shipments: [action.payload.shipment],
        error: false,
        loading: false,
        didSearch: false
      });
};

const editShipmentCompleted = (state: any, action: any) => {
  if (state.shipments) {
    const updatedShipments = state.shipments.filter(
      (shipment: any) =>
        shipment._id !== action.payload.shipment._id
    );

    return updateObject(state, {
      shipments: [action.payload.shipment].concat(updatedShipments),
      error: false,
      loading: false,
      didSearch: false
    });
  }

  return updateObject(state, {
    shipments: [action.payload.shipment],
    error: false,
    loading: false,
    didSearch: false
  });
};

const deleteShipmentCompleted = (state: any, action: any) => {
  if (state.shipments) {
    const updatedShipments = state.shipments.filter(
      (shipment: any) => shipment._id !== action.payload.id
    );

    return updateObject(state, {
      shipments: updatedShipments,
      error: false,
      loading: false,
      didSearch: false
    });
  }

  return updateObject(state, {
    shipments: [],
    error: false,
    loading: false,
    didSearch: false
  });
};

const reducer = createReducer(initialState)({
  [shipmentActionNameTypes.FETCH_INIT]: (state: ShipmentState, action: any) =>
    updateObject(state, { loading: action.payload.loading }),
  [shipmentActionNameTypes.FETCH_LIST_COMPLETED]: (
    state: ShipmentState,
    action: any
  ) => {
    return updateObject(state, {
      shipments: action.payload.records,
      error: false,
      loading: false,
      didSearch: false
    });
  },

  [shipmentActionNameTypes.ADD_SHIPMENT_COMPLETED]: (
    state: ShipmentState,
    action: any
  ) => addShipmentCompleted(state, action),

  [shipmentActionNameTypes.EDIT_SHIPMENT_COMPLETED]: (
    state: ShipmentState,
    action: any
  ) => editShipmentCompleted(state, action),

  [shipmentActionNameTypes.DELETE_SHIPMENT_COMPLETED]: (
    state: ShipmentState,
    action: any
  ) => deleteShipmentCompleted(state, action),

  [shipmentActionNameTypes.SEARCH_LIST_COMPLETED]: (
    state: ShipmentState,
    action: any
  ) =>
    updateObject(state, {
      searchedRecords: action.payload.shipments,
      error: false,
      loading: false,
      didSearch: true
    })
});

export { reducer as shipmentReducer };
