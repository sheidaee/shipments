import React from "react";
import ReactTable, { ReactTableDefaults } from "react-table";
import moment from "moment";
import { ITableProps } from "./types";
import { orderStatusCaptions } from '../../../../../utilities/constants';
import "react-table/react-table.css";

const columns = [
  {
    Header: "Name",
    id: "name",
    accessor: (d: any) => d.name
  },
  {
    Header: "Origin",
    id: "origin",
    accessor: (d: any) => d.origin
  },
  {
    Header: "Destination",
    id: "destination",
    accessor: (d: any) => d.destination,
    sortable: false
  },
  {
    Header: "Order Status",
    id: "orderStatus",
    accessor: (d: any) => orderStatusCaptions[d.orderStatus - 1 ],
  },  
  {
    Header: "Pickup Date",
    id: "pickupDate",
    accessor: (d: any) => d.pickupDate ? moment(d.pickupDate).format("YYYY/MM/DD HH:mm") : ''
  },
  {
    Header: "Delivery Date",
    id: "deliveryDate",
    accessor: (d: any) => d.deliveryDate ? moment(d.deliveryDate).format("YYYY/MM/DD HH:mm") : ''
  },
  {
    Header: "Operation",
    accessor: "operation",
    sortable: false
  }
];

const tdPropsHandler = (
  state: any,
  rowInfo: any,
  column: any,
  instance: any
) => {
  return {
    style: {
      textAlign:  "center"
    }
  };
};

const CustomerTable = ({ data, loading }: ITableProps) => {
  Object.assign(ReactTableDefaults, {
    data,
    columns,
    showPageSizeOptions: false,
    loading: loading,
    className: "-striped -highlight",
    getTdProps: tdPropsHandler,
    pageSize: 10
  });

  return <ReactTable {...ReactTableDefaults} />;
};

export default CustomerTable;
