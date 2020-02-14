import _ from "lodash";
import matchSorter from "match-sorter";
import moment from "moment";
import { Dispatch } from "redux";

import {
  addShipmentComplete,
  fetchListComplete,
  fetchInit,
  deleteShipmentComplete,
  searchListComplete,
  editShipmentComplete
} from "./actions";

import { default as axios } from "../../utilities/axios-conf";

import {
  FormValues as ShipmentP,
  AddShipmentP,
  fetchShipmentP
} from "./components/AddShipment/types";
import { ShipmentObject, SearchShipment } from "./types";

const fetchList = ({ isAdmin, user }: fetchShipmentP) => async (dispatch: Dispatch) => {
  try {
    dispatch(fetchInit());
    const url = isAdmin ? "/shipments" : `/assignee_shipments/${user.id}`
    const { data } = await axios.get(url);
    
    dispatch(fetchListComplete(data));
  } catch (error) {
    console.log("error");
  }
};

const addShipment = ({
  name,
  origin,
  destination,
  assignee,
  orderStatus,
  pickupDate,
  deliveryDate
}: AddShipmentP) => async (dispatch: Dispatch) => {
  try {
    const { data } = await axios.post("/shipments", {
      name,
      origin,
      destination,
      assignee: assignee === "..." ? "" : assignee,
      orderStatus,
      pickupDate: pickupDate ? pickupDate.toISOString() : null,
      deliveryDate: deliveryDate ? deliveryDate.toISOString(): null
    });
    dispatch(addShipmentComplete(data));
  } catch (error) {
    console.log(error);
  }
};

const editShipment = ({ _id, name, assignee, pickupDate, deliveryDate }: ShipmentP) => async (
  dispatch: Dispatch
) => {
  try {
    const { data: shipment } = await axios.put(`/shipments/${_id}`, {
      name, 
      assignee: assignee === "..." ? "" : assignee,
      pickupDate,
      deliveryDate
    });

    dispatch(editShipmentComplete({ ...shipment }));
  } catch (error) {
    console.log(error);
  }
};

const deleteShipment = (shipmentID: number) => async (dispatch: Dispatch) => {
  try {
    await axios.delete(`/shipments/${shipmentID}`)   
    dispatch(deleteShipmentComplete(shipmentID));
  }
  catch(error) {
    console.log(error);
  }
}

const searchShipment = ({
  shipmentRecords,
  name, origin, destination, orderStatus, pickupDate, deliveryDate
}: SearchShipment) => (dispatch: Dispatch) => {
  if (!shipmentRecords) {
    return;
  }
  
  dispatch(fetchInit());

  let filteredRecords: ShipmentObject[] = _.cloneDeep(shipmentRecords);

  if (!_.isNull(name)) {
    filteredRecords = matchSorter(filteredRecords, name, {
      keys: ["name"],
      threshold: matchSorter.rankings.CONTAINS
    });
  }

  if (!_.isNull(origin)) {
    filteredRecords = matchSorter(filteredRecords, origin, {
      keys: ["origin"],
      threshold: matchSorter.rankings.CONTAINS
    });
  }

  if (!_.isNull(destination)) {
    filteredRecords = matchSorter(filteredRecords, destination, {
      keys: ["destination"],
      threshold: matchSorter.rankings.CONTAINS
    });
  }

  if (!_.isNull(orderStatus) && orderStatus !== "...") {
    filteredRecords = matchSorter(filteredRecords, orderStatus, {
      keys: ["orderStatus"],
      threshold: matchSorter.rankings.CONTAINS
    });
  }

  if (pickupDate) {
    filteredRecords = matchSorter(
      filteredRecords,
      moment(pickupDate).format("YYYY-MM-DD"),
      {
        keys: ["pickupDate"],
        threshold: matchSorter.rankings.CONTAINS
      }
    );
  }

  if (deliveryDate) {
    filteredRecords = matchSorter(
      filteredRecords,
      moment(deliveryDate).format("YYYY-MM-DD"),
      {
        keys: ["deliveryDate"],
        threshold: matchSorter.rankings.CONTAINS
      }
    );
  }

  setTimeout(() => {
    dispatch(searchListComplete(filteredRecords));
  }, 300);
};

export { fetchList, deleteShipment, editShipment, addShipment, searchShipment };
