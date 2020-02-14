import React, { useState } from "react";
import { useDispatch } from "../../../../hooks/react-redux.hooks";
import { Button, Card, Elevation } from "@blueprintjs/core";

import DateInputField from "../../../../components/DateInputField";
import TextField from "../../../../components/TextField";
import SelectField from '../../../../components/SelectField';
import { shipmentOperations } from "../../";
import SearchField from "./SearchField";
import { IProps, UseSearch } from "./types";
import { orderStatusItems } from '../../../../utilities/constants';

import Fieldset from "../../../../components/Fieldset";
import Styles from "./SearchBar.module.scss";

export function SearchBar({ loading, shipmentRecords }: IProps) {
  const dispatch = useDispatch();

  const [name, origin, destination, orderStatus, pickupDate, deliveryDate, handleChange] = useSearch();

  const searchHandler = () => {
    dispatch(
      shipmentOperations.searchShipment({
        shipmentRecords,
        name, origin, destination, orderStatus, pickupDate, deliveryDate
      })
    );
  };

  return (
    <Card elevation={Elevation.ONE} className={Styles.SearchBar}>
      <h5>Advanced Search</h5>
      <Fieldset disabled={loading} aria-busy={loading}>
        <div className={Styles.formRow}>
          <SearchField
            caption="Name:"
            Field={TextField}
            value={name}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange("name", e.target.value)
            }
          />
          <SearchField
            caption="Origin:"
            Field={TextField}
            value={origin}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange("origin", e.target.value)
            }
          />
          <SearchField
            caption="Destination:"
            Field={TextField}
            value={destination}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange("destination", e.target.value)
            }
          />
          <SearchField
            name="pickupDate"
            caption="Pickup Date:"
            Field={DateInputField}
            value={pickupDate}
            handleChange={(v: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(v, "pickupDate")
            }
            callback={handleChange}
          />          
          <SearchField
            name="deliveryDate"
            caption="Delivery Date:"
            Field={DateInputField}
            value={pickupDate}
            handleChange={(v: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(v, "pickupDate")
            }
            callback={handleChange}
          />
          <SearchField
            caption="Order Status:"
            Field={SelectField}
            value={orderStatus}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange("orderStatus", e.target.value)
            }
            items={orderStatusItems}            
          />
        </div>
        <div className={Styles.actionBar}>
          <Button onClick={searchHandler} disabled={loading}>
            Search
          </Button>
        </div>
      </Fieldset>
    </Card>
  );
}

function useSearch(): UseSearch {
  const initState = {
    name: '',
    origin: '',
    destination: '',
    orderStatus: '',
    pickupDate: null,
    deliveryDate: null
  }

  const [state, setState] = useState(initState);

  function handleSearch(fieldName: string, value: any,) {
    setState( prev => ({
      ...prev,
      [fieldName]: value
    }))
  }

  const {name, origin, destination, orderStatus, pickupDate, deliveryDate}: any = state;

  return [name, origin, destination, orderStatus, pickupDate, deliveryDate, handleSearch];
}

export default SearchBar;
