import React from "react";
import { useSelector } from "react-redux";

import Panel from "../Panel";
import SearchBar from "../SearchBar";
import ShipmentList from "../ShipmentList";
import { IShipmentP } from "./types";

const ShipmentsManagement = () => {
  const loading = useSelector(({ app }: IShipmentP) => app.loading);
  const shipmentRecords = useSelector(({ app }: IShipmentP) => app.shipments);
  const searchedRecords = useSelector(
    ({ app }: IShipmentP) => app.searchedRecords
  );
  const didSearch = useSelector(({ app }: IShipmentP) => app.didSearch);

  return (
    <>
      <Panel shipmentsCount={shipmentRecords ? shipmentRecords.length : 0} />
      <SearchBar loading={loading} shipmentRecords={shipmentRecords} />
      <ShipmentList
        loading={loading}
        shipmentRecords={shipmentRecords}
        searchedRecords={searchedRecords}
        didSearch={didSearch}
      />
    </>
  );
};

export default ShipmentsManagement;
