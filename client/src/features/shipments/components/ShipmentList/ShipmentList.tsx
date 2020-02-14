import React, { useEffect, useContext } from "react";
import { useDispatch } from "react-redux";

import { shipmentOperations } from "../../";
import ShipmentDetails from "../ShipmentDetails";
import DeleteShipment from "../DeleteShipment";
import EditShipment from "../EditShipment";
import ShipmentTable from "./ShipmentTable/ShipmentTable";
import { ShipmentShape } from "../../types";
import { IProps } from "./types";
import { AuthContext } from "../../../../context/AuthProvider";


export function ShipmentList({
  loading,
  didSearch,
  shipmentRecords,
  searchedRecords
}: IProps) {
  const dispatch = useDispatch();
  const { hasRole, user }: any = useContext(AuthContext);

  useEffect(() => {
    dispatch(shipmentOperations.fetchList({isAdmin: hasRole('ADMIN'), user}));
  }, [dispatch, hasRole, user]);

  const data: any = [];
  const shipmentStateRecords: any =
    shipmentRecords && !didSearch ? shipmentRecords : searchedRecords;

  if (
    shipmentStateRecords === null ||
    !Object.keys(shipmentStateRecords).length
  ) {
    return <></>;
  }

  shipmentStateRecords.forEach((shipmentRecord: ShipmentShape) => {
    const {
      _id,    
      name,
      origin,
      destination,
      orderStatus,
      assignee,
      pickupDate,
      deliveryDate
    } = shipmentRecord;
    
    const operation = (
      <>
        <ShipmentDetails data={shipmentRecord} />
        <EditShipment
          initialValues={{
            _id,
            name,
            origin,
            destination,
            orderStatus,
            assignee,
            pickupDate: pickupDate ? new Date(pickupDate) : null,
            deliveryDate: deliveryDate ? new Date(deliveryDate) : null,
          }}
        />
        <DeleteShipment data={shipmentRecord} />
      </>
    );

    data.push({
      ...shipmentRecord,
      operation
    });
  });

  return <ShipmentTable data={data} loading={loading} />;
}

export default ShipmentList;
