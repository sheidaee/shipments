import { ShipmentActionTypes } from "../../features/shipments/types";

export default (initialState: object) => (reducerMap: any) => (
  state = initialState,
  action: ShipmentActionTypes
) => {
  const reducer = reducerMap[action.type];
  return reducer ? reducer(state, action) : state;
};
